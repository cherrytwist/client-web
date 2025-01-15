import { useCallback, useMemo, useState } from 'react';
import {
  useCreateSpaceMutation,
  useCreateVirtualContributorOnAccountMutation,
  useNewVirtualContributorMySpacesQuery,
  usePlansTableQuery,
  useSpaceUrlLazyQuery,
  useSubspaceCommunityAndRoleSetIdLazyQuery,
  useAssignRoleToVirtualContributorMutation,
  refetchDashboardWithMembershipsQuery,
  useCreateLinkOnCalloutMutation,
  useAccountSpacesLazyQuery,
} from '@/core/apollo/generated/apollo-hooks';
import {
  AiPersonaBodyOfKnowledgeType,
  RoleName,
  CreateCalloutInput,
  CreateVirtualContributorOnAccountMutationVariables,
  LicensingCredentialBasedPlanType,
} from '@/core/apollo/generated/graphql-schema';
import CreateNewVirtualContributor, { VirtualContributorFromProps } from './CreateNewVirtualContributor';
import LoadingState from './LoadingState';
import AddContent from './AddContent/AddContent';
import {
  BoKCalloutsFormValues,
  DocumentValues,
  getDocumentCalloutRequestData,
  getPostCalloutRequestData,
} from './AddContent/AddContentProps';
import ExistingSpace, { SelectableKnowledgeSpace } from './ExistingSpace';
import { useTranslation } from 'react-i18next';
import { useNotification } from '@/core/ui/notifications/useNotification';
import { useUserContext } from '@/domain/community/user';
import DialogWithGrid from '@/core/ui/dialog/DialogWithGrid';
import useNavigate from '@/core/routing/useNavigate';
import { usePlanAvailability } from '@/domain/journey/space/createSpace/plansTable/usePlanAvailability';
import { addVCCreationCache } from './vcCreationUtil';
import SetupVCInfo from './SetupVCInfo';
import { info as logInfo } from '@/core/logging/sentry/log';
import InfoDialog from '@/core/ui/dialogs/InfoDialog';
import CreateExternalAIDialog, { ExternalVcFormValues } from './CreateExternalAIDialog';
import { useNewVirtualContributorWizardProvided, UserAccountProps } from './useNewVirtualContributorProps';
import { StorageConfigContextProvider } from '@/domain/storage/StorageBucket/StorageConfigContext';
import { getSpaceUrlFromSubSpace } from '@/main/routing/urlBuilders';

type Step =
  | 'initial'
  | 'createSpace'
  | 'addKnowledge'
  | 'existingKnowledge'
  | 'externalProvider'
  | 'loadingVCSetup'
  | 'insufficientPrivileges'; // not used ATM

export type SelectableSpace = {
  id: string;
  profile: {
    displayName: string;
    url: string;
  };
  community: {
    roleSet: {
      id: string;
    };
  };
  subspaces?: SelectableSpace[];
};

const useNewVirtualContributorWizard = (): useNewVirtualContributorWizardProvided => {
  const { t } = useTranslation();
  const { user } = useUserContext();
  const notify = useNotification();
  const navigate = useNavigate();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [step, setStep] = useState<Step>('initial');

  const [targetAccount, setTargetAccount] = useState<UserAccountProps>();
  const [accountName, setAccountName] = useState<string>();
  const [virtualContributorInput, setVirtualContributorInput] = useState<VirtualContributorFromProps>();

  const startWizard = (initAccount: UserAccountProps | undefined, accountName?: string) => {
    setTargetAccount(initAccount);
    setAccountName(accountName);
    setStep('initial');
    setDialogOpen(true);
  };

  const onStepSelection = (step: Step, values: VirtualContributorFromProps) => {
    setVirtualContributorInput(values);
    setStep(step);
  };

  const handleCloseWizard = () => {
    setDialogOpen(false);
    setStep('initial');
  };

  const { data, loading } = useNewVirtualContributorMySpacesQuery({
    skip: !dialogOpen || Boolean(targetAccount),
    fetchPolicy: 'cache-and-network',
  });

  const { selectedExistingSpaceId, myAccountId } = useMemo(() => {
    const account = targetAccount ?? data?.me.user?.account; // contextual or self by default
    const accountId = account?.id;
    const mySpace = account?.spaces?.[0]; // TODO: auto-selecting the first space, not ideal

    return {
      selectedExistingSpaceId: mySpace?.id,
      myAccountId: accountId,
    };
  }, [data, user, targetAccount]);

  const [getAccountSpaces, { loading: availableSpacesLoading }] = useAccountSpacesLazyQuery();
  const getSelectableSpaces = useCallback(
    async (accountId: string) => {
      const spaceData = await getAccountSpaces({
        variables: {
          accountId,
        },
      });

      return spaceData?.data?.lookup.account?.spaces ?? [];
    },
    [getAccountSpaces]
  );

  // get plans data in case there's no space under the account
  const { data: plansData } = usePlansTableQuery({ skip: Boolean(selectedExistingSpaceId) });
  const { isPlanAvailable } = usePlanAvailability({ skip: Boolean(selectedExistingSpaceId) });

  const plans = useMemo(
    () =>
      plansData?.platform.licensingFramework.plans
        .filter(plan => plan.enabled)
        .filter(plan => plan.type === LicensingCredentialBasedPlanType.SpacePlan)
        .filter(plan => isPlanAvailable(plan))
        .sort((a, b) => a.sortOrder - b.sortOrder) ?? [],
    [plansData, isPlanAvailable]
  );

  // TODO: review both the privileges and the space as it's preselected no matter the user selection
  // const hasPrivilegesOnSpaceAndCommunity = () => {
  //   // in case of clean creation, the user is an admin of the space
  //   // no way and need to check the privileges
  //   if (!selectedExistingSpaceId) {
  //     return true;
  //   }
  //
  //   const { myPrivileges: myPrivilegesOnCollaboration } = spacePrivileges.collaboration;
  //
  //   const hasRequiredPrivileges = myPrivilegesOnCollaboration?.includes(
  //     AuthorizationPrivilege.CommunityAddMemberVcFromAccount
  //   );
  //
  //   if (!hasRequiredPrivileges) {
  //     logInfo(
  //       `Insufficient privileges to create a VC, Collaboration Privileges: ${JSON.stringify(
  //         myPrivilegesOnCollaboration
  //       )}`,
  //       {
  //         category: TagCategoryValues.VC,
  //       }
  //     );
  //   }
  //
  //   return hasRequiredPrivileges;
  // };

  const [CreateNewSpace] = useCreateSpaceMutation({
    refetchQueries: ['MyAccount', 'AccountInformation', refetchDashboardWithMembershipsQuery()],
  });

  const executeCreateSpace = async () => {
    if (plans.length === 0) {
      logInfo(`No available plans for this account. User: ${user?.user.id}`);
      notify('No available plans for this account. Please, contact support@alkem.io.', 'error');
      return;
    }

    // loading
    setStep('createSpace');

    const { data: newSpace } = await CreateNewSpace({
      variables: {
        spaceData: {
          accountID: myAccountId!,
          profileData: {
            displayName: `${accountName || user?.user.profile.displayName} - ${t('common.space')}`,
          },
          collaborationData: {
            calloutsSetData: {},
          },
        },
      },
    });

    const newlyCreatedSpaceId = newSpace?.createSpace.id;

    if (newlyCreatedSpaceId) {
      return newlyCreatedSpaceId;
    }

    // in case of failure
    setStep('addKnowledge');
  };

  const [createVirtualContributor] = useCreateVirtualContributorOnAccountMutation({
    refetchQueries: ['MyAccount', 'AccountInformation'],
  });

  const executeVcCreation = async ({
    values,
    accountId,
    vcBoKId,
    callouts,
  }: {
    values: VirtualContributorFromProps;
    accountId: string;
    vcBoKId?: string;
    callouts?: Array<CreateCalloutInput>;
  }) => {
    try {
      const variables: CreateVirtualContributorOnAccountMutationVariables = {
        virtualContributorData: {
          accountID: accountId,
          profileData: {
            displayName: values.name,
            tagline: values.tagline,
            description:
              values.description ?? t('createVirtualContributorWizard.createdVirtualContributor.description'),
          },
          aiPersona: {
            aiPersonaService: {
              engine: values.engine,
              bodyOfKnowledgeType: values.bodyOfKnowledgeType,
              bodyOfKnowledgeID: vcBoKId,
            },
          },
          knowledgeBaseData: {
            calloutsSetData: {
              calloutsData: callouts,
            },
            profile: {
              displayName: values.name,
            },
          },
        },
      };

      if (values.externalConfig) {
        variables.virtualContributorData.aiPersona.aiPersonaService!.externalConfig = values.externalConfig;
      }
      const { data } = await createVirtualContributor({
        variables,
      });

      if (data?.createVirtualContributor?.id) {
        notify(
          t('createVirtualContributorWizard.createdVirtualContributor.successMessage', { name: values.name }),
          'success'
        );
      }

      return data?.createVirtualContributor;
    } catch (error) {
      return;
    }
  };

  // Add To Community
  const [getSpaceCommunity] = useSubspaceCommunityAndRoleSetIdLazyQuery();

  const [addVirtualContributorToRole] = useAssignRoleToVirtualContributorMutation();

  const addVCToCommunity = async (
    virtualContributorId: string,
    parentRoleSetIds: string[] = [],
    spaceId: string | undefined
  ) => {
    if (!spaceId) {
      return false;
    }

    if (parentRoleSetIds.length > 0) {
      // the VC cannot be added to the BoK community
      // if it's not part of the parent communities
      for (const roleSetId of parentRoleSetIds) {
        await addVirtualContributorToRole({
          variables: {
            roleSetId,
            contributorId: virtualContributorId,
            role: RoleName.Member,
          },
        });
      }
    }

    const communityData = await getSpaceCommunity({
      variables: {
        spaceId,
      },
    });

    const roleSetId = communityData.data?.lookup.space?.community.roleSet.id;
    if (!roleSetId) {
      return false;
    }

    const addToCommunityResult = await addVirtualContributorToRole({
      variables: {
        roleSetId,
        contributorId: virtualContributorId,
        role: RoleName.Member,
      },
    });

    return Boolean(addToCommunityResult.data?.assignRoleToVirtualContributor?.id);
  };

  const notifyErrorOnAddToCommunity = () => {
    // No need to spam the user with error messages, the VC was created successfully
    console.log('Try your VC flow was skipped. Unable to add to community.');
  };

  // post creation navigation
  const [getNewSpaceUrl] = useSpaceUrlLazyQuery();
  const navigateToTryYourVC = async (url: string | undefined, spaceId: string | undefined) => {
    if (url) {
      navigate(url);
    } else {
      if (spaceId) {
        const { data } = await getNewSpaceUrl({
          variables: {
            spaceNameId: spaceId,
          },
        });
        const spaceUrl = data?.space?.profile.url;

        if (spaceUrl) {
          navigate(spaceUrl);
        }
      }
    }

    handleCloseWizard();
  };

  // ###STEP 'addKnowledge' - Add Content
  const handleCreateKnowledge = async (values: VirtualContributorFromProps) => {
    setVirtualContributorInput(values);
    setStep('addKnowledge');
  };

  const [createLinkOnCallout] = useCreateLinkOnCalloutMutation();
  const onCreateLink = async (document: DocumentValues, calloutId: string) => {
    await createLinkOnCallout({
      variables: {
        input: {
          calloutID: calloutId,
          link: {
            uri: document.url,
            profile: {
              displayName: document.name,
            },
          },
        },
      },
    });
  };

  const addDocumentLinksToCallout = async (documents: DocumentValues[], calloutId: string | undefined) => {
    if (calloutId) {
      for (const doc of documents) {
        await onCreateLink(doc, calloutId);
      }
    }
  };

  const onCreateVcWithKnowledge = async (values: BoKCalloutsFormValues) => {
    const callouts: Array<CreateCalloutInput> = [];
    const documents: Array<DocumentValues> = [];
    const documentsLinkCollectionName = t('createVirtualContributorWizard.addContent.documents.initialDocuments');
    const hasDocuments = values?.documents && values?.documents.length > 0;

    if (!virtualContributorInput || !myAccountId) {
      return;
    }

    // create collection of posts
    if (values?.posts && values?.posts.length > 0) {
      const postsArray = values?.posts ?? [];

      for (const post of postsArray) {
        callouts.push(getPostCalloutRequestData(post.title, post.description));
      }
    }

    // create collection of docs & links
    if (hasDocuments) {
      callouts.push(getDocumentCalloutRequestData(documentsLinkCollectionName));

      const documentsArray = values?.documents ?? [];

      for (const doc of documentsArray) {
        documents.push(doc);
      }
    }

    // create the VC
    const createdVC = await executeVcCreation({
      values: virtualContributorInput,
      accountId: myAccountId,
      callouts,
    });

    if (!createdVC?.id) {
      return;
    }

    if (hasDocuments) {
      const createdLinkCollection = createdVC.knowledgeBase?.calloutsSet?.callouts?.find(
        c => c.framing.profile.displayName === documentsLinkCollectionName
      );
      await addDocumentLinksToCallout(documents, createdLinkCollection?.id);
    }

    // TODO: after the VC creation:
    // 1. reingest the VC in case of documents?
    // 2. New Step - do you want ot add your VC to community? (instead of auto-adding)

    // create a space if no space is available under the account
    let spaceId: string | undefined = selectedExistingSpaceId;
    if (!selectedExistingSpaceId) {
      spaceId = await executeCreateSpace();

      if (!spaceId) {
        return;
      }
    }

    const addToCommunity = await addVCToCommunity(createdVC?.id, undefined, spaceId);

    if (addToCommunity) {
      addVCCreationCache(createdVC?.nameID);
      await navigateToTryYourVC(undefined, spaceId);
    } else {
      notifyErrorOnAddToCommunity();
      handleCloseWizard();
    }
  };

  // ###STEP 'existingKnowledge' - Existing Knowledge
  const handleCreateVCWithExistingKnowledge = async (selectedKnowledge: SelectableKnowledgeSpace) => {
    if (selectedKnowledge && virtualContributorInput && myAccountId) {
      const values = { ...virtualContributorInput, bodyOfKnowledgeType: AiPersonaBodyOfKnowledgeType.AlkemioSpace };

      const createdVC = await executeVcCreation({
        values,
        accountId: myAccountId,
        vcBoKId: selectedKnowledge.id,
      });

      if (!createdVC?.id) {
        return;
      }

      const addToCommunity = await addVCToCommunity(
        createdVC?.id,
        selectedKnowledge.parentRoleSetIds,
        selectedKnowledge.id
      );

      if (addToCommunity) {
        addVCCreationCache(createdVC?.nameID);
        await navigateToTryYourVC(getSpaceUrlFromSubSpace(selectedKnowledge.url ?? ''), undefined);
      } else {
        notifyErrorOnAddToCommunity();
        handleCloseWizard();
      }
    }
  };

  // ###STEP 'externalProvider' - External VC
  const handleCreateExternal = async (externalVcValues: ExternalVcFormValues) => {
    if (virtualContributorInput && myAccountId) {
      virtualContributorInput.engine = externalVcValues.engine;

      virtualContributorInput.externalConfig = {
        apiKey: externalVcValues.apiKey,
      };
      if (externalVcValues.assistantId) {
        virtualContributorInput.externalConfig.assistantId = externalVcValues.assistantId;
      }

      virtualContributorInput.bodyOfKnowledgeType = AiPersonaBodyOfKnowledgeType.None;

      const createdVc = await executeVcCreation({
        values: virtualContributorInput,
        accountId: myAccountId,
      });

      // navigate to VC page
      if (createdVc) {
        navigate(createdVc.profile.url);
      }
    }
  };

  const NewVirtualContributorWizard = useCallback(() => {
    if (!myAccountId) {
      return null;
    }

    return (
      <DialogWithGrid open={dialogOpen} columns={6}>
        {/* TODO: StorageConfig, instead of user here should be account */}
        <StorageConfigContextProvider userId={user?.user.id ?? ''} locationType="user">
          {step === 'initial' && (
            <CreateNewVirtualContributor
              onClose={handleCloseWizard}
              loading={loading}
              onCreateKnowledge={handleCreateKnowledge}
              onUseExistingKnowledge={values => onStepSelection('existingKnowledge', values)}
              onUseExternal={values => onStepSelection('externalProvider', values)}
            />
          )}
          {step === 'createSpace' && <LoadingState onClose={handleCloseWizard} />}
          {step === 'addKnowledge' && virtualContributorInput && (
            <AddContent
              onClose={handleCloseWizard}
              onCreateVC={onCreateVcWithKnowledge}
              spaceId={selectedExistingSpaceId ?? ''}
            />
          )}
          {step === 'existingKnowledge' && myAccountId && (
            <ExistingSpace
              onClose={handleCloseWizard}
              onBack={() => setStep('initial')}
              onSubmit={handleCreateVCWithExistingKnowledge}
              accountId={myAccountId}
              getSpaces={getSelectableSpaces}
              loading={loading || availableSpacesLoading}
            />
          )}
          {step === 'externalProvider' && (
            <CreateExternalAIDialog onCreateExternal={handleCreateExternal} onClose={handleCloseWizard} />
          )}
          {step === 'loadingVCSetup' && <SetupVCInfo />}
          {step === 'insufficientPrivileges' && (
            <InfoDialog
              entities={{
                title: t('createVirtualContributorWizard.insufficientPrivileges.title'),
                content: t('createVirtualContributorWizard.insufficientPrivileges.description'),
                buttonCaption: t('buttons.ok'),
              }}
              actions={{ onButtonClick: handleCloseWizard }}
              options={{ show: true }}
            />
          )}
        </StorageConfigContextProvider>
      </DialogWithGrid>
    );
  }, [dialogOpen, step, loading, selectedExistingSpaceId, myAccountId, getSelectableSpaces]);

  return {
    startWizard,
    NewVirtualContributorWizard,
  };
};

export default useNewVirtualContributorWizard;
