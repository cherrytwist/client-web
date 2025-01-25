import { useState } from 'react';
import SubspaceHomeView from './SubspaceHomeView';
import SubspaceHomeContainer from './SubspaceHomeContainer';
import { useRouteResolver } from '@/main/routing/resolvers/RouteResolver';
import useDirectMessageDialog from '@/domain/communication/messaging/DirectMessaging/useDirectMessageDialog';
import { useTranslation } from 'react-i18next';
import { SubspacePageLayout } from '@/domain/journey/common/EntityPageLayout';
import JourneyDashboardWelcomeBlock from '@/domain/journey/common/journeyDashboardWelcomeBlock/JourneyDashboardWelcomeBlock';
import { AuthorizationPrivilege, CommunityMembershipStatus } from '@/core/apollo/generated/graphql-schema';
import { DialogDef } from '../layout/DialogDefinition';
import { SubspaceDialog } from '../layout/SubspaceDialog';
import {
  AccountTreeOutlined,
  CalendarMonthOutlined,
  GroupsOutlined,
  HistoryOutlined,
  InfoOutlined,
  ListOutlined,
  SegmentOutlined,
  SettingsOutlined,
  ShareOutlined,
} from '@mui/icons-material';
import { InnovationFlowIcon } from '@/domain/collaboration/InnovationFlow/InnovationFlowIcon/InnovationFlowIcon';
import SubspaceDialogs from './dialogs/SubspaceDialogs';
import { useSpace } from '@/domain/journey/space/SpaceContext/useSpace';
import useSpaceDashboardNavigation from '@/domain/journey/space/spaceDashboardNavigation/useSpaceDashboardNavigation';
import DashboardNavigation, {
  DashboardNavigationProps,
} from '@/domain/journey/dashboardNavigation/DashboardNavigation';
import { useConsumeAction } from '../layout/SubspacePageLayout';
import { useColumns } from '@/core/ui/grid/GridContext';
import CreateJourney from './dialogs/CreateJourney';
import DashboardUpdatesSection from '@/domain/shared/components/DashboardSections/DashboardUpdatesSection';
import { buildUpdatesUrl } from '@/main/routing/urlBuilders';

const Outline = (props: DashboardNavigationProps) => {
  useConsumeAction(SubspaceDialog.Outline);
  const columns = useColumns();
  return <DashboardNavigation compact={columns === 0} {...props} />;
};

const SubspaceHomePage = ({ dialog }: { dialog?: SubspaceDialog }) => {
  const { t } = useTranslation();

  const { journeyId, journeyTypeName, journeyPath, parentSpaceId, loading } = useRouteResolver();

  const { sendMessage, directMessageDialog } = useDirectMessageDialog({
    dialogTitle: t('send-message-dialog.direct-message-title'),
  });

  const { spaceId } = useSpace();

  const dashboardNavigation = useSpaceDashboardNavigation({
    spaceId,
    skip: !spaceId,
  });

  const [createSpaceState, setCreateSpaceState] = useState<
    | {
        isDialogVisible: true;
        parentSpaceId: string;
      }
    | {
        isDialogVisible: false;
        parentSpaceId?: never;
      }
  >({
    isDialogVisible: false,
  });

  const openCreateSubspace = ({ id }) => {
    setCreateSpaceState({
      isDialogVisible: true,
      parentSpaceId: id,
    });
  };

  const onCreateJourneyClose = () => {
    setCreateSpaceState({
      isDialogVisible: false,
    });
  };

  return (
    <SubspaceHomeContainer spaceId={journeyId} journeyTypeName={journeyTypeName}>
      {({ innovationFlow, callouts, subspace, spaceReadAccess, communityReadAccess, communityId, roleSet }) => {
        const { collaboration, community, profile } = subspace ?? {};

        return (
          <>
            <SubspacePageLayout
              spaceReadAccess={spaceReadAccess}
              journeyId={journeyId}
              journeyPath={journeyPath}
              journeyUrl={profile?.url}
              parentSpaceId={parentSpaceId}
              loading={loading}
              welcome={
                <JourneyDashboardWelcomeBlock
                  vision={subspace?.context?.vision ?? ''}
                  leadUsers={roleSet.leadUsers}
                  onContactLeadUser={receiver => sendMessage('user', receiver)}
                  leadOrganizations={roleSet.leadOrganizations}
                  onContactLeadOrganization={receiver => sendMessage('organization', receiver)}
                  journeyTypeName="subspace"
                  member={community?.roleSet?.myMembershipStatus === CommunityMembershipStatus.Member}
                />
              }
              actions={
                <>
                  <DialogDef
                    dialogType={SubspaceDialog.About}
                    label={t(`spaceDialog.${SubspaceDialog.About}` as const)}
                    icon={InfoOutlined}
                  />
                  <DialogDef
                    dialogType={SubspaceDialog.Outline}
                    label={t(`spaceDialog.${SubspaceDialog.Outline}` as const)}
                    icon={AccountTreeOutlined}
                  />
                  <DialogDef
                    dialogType={SubspaceDialog.Index}
                    label={t(`spaceDialog.${SubspaceDialog.Index}` as const)}
                    icon={ListOutlined}
                  />
                  <DialogDef
                    dialogType={SubspaceDialog.Subspaces}
                    label={t(`spaceDialog.${SubspaceDialog.Subspaces}` as const)}
                    icon={SegmentOutlined}
                  />
                  <DialogDef
                    dialogType={SubspaceDialog.Contributors}
                    label={t(`spaceDialog.${SubspaceDialog.Contributors}` as const)}
                    icon={GroupsOutlined}
                  />
                  <DialogDef
                    dialogType={SubspaceDialog.Activity}
                    label={t(`spaceDialog.${SubspaceDialog.Activity}` as const)}
                    icon={HistoryOutlined}
                  />
                  <DialogDef
                    dialogType={SubspaceDialog.Timeline}
                    label={t('spaceDialog.events')}
                    icon={CalendarMonthOutlined}
                  />
                  <DialogDef
                    dialogType={SubspaceDialog.Share}
                    label={t(`spaceDialog.${SubspaceDialog.Share}` as const)}
                    icon={ShareOutlined}
                  />
                  {innovationFlow.canEditInnovationFlow && (
                    <DialogDef
                      dialogType={SubspaceDialog.ManageFlow}
                      label={t(`spaceDialog.${SubspaceDialog.ManageFlow}` as const)}
                      icon={InnovationFlowIcon}
                    />
                  )}
                  {subspace?.authorization?.myPrivileges?.includes(AuthorizationPrivilege.Update) && (
                    <DialogDef
                      dialogType={SubspaceDialog.Settings}
                      label={t(`spaceDialog.${SubspaceDialog.Settings}` as const)}
                      icon={SettingsOutlined}
                    />
                  )}
                </>
              }
              infoColumnChildren={
                <>
                  <Outline
                    currentItemId={journeyId}
                    dashboardNavigation={dashboardNavigation.dashboardNavigation}
                    onCreateSubspace={openCreateSubspace}
                    onCurrentItemNotFound={dashboardNavigation.refetch}
                  />
                  {communityReadAccess && communityId && (
                    <DashboardUpdatesSection communityId={communityId} shareUrl={buildUpdatesUrl(profile?.url ?? '')} />
                  )}
                </>
              }
            >
              <SubspaceHomeView
                collaborationId={collaboration?.id}
                calloutsSetId={collaboration?.calloutsSet.id}
                templatesSetId={subspace?.templatesManager?.templatesSet?.id}
                journeyTypeName={journeyTypeName}
                {...innovationFlow}
                {...callouts}
              />
            </SubspacePageLayout>
            {directMessageDialog}
            <CreateJourney
              isVisible={createSpaceState.isDialogVisible}
              onClose={onCreateJourneyClose}
              parentSpaceId={createSpaceState.parentSpaceId}
            />
            <SubspaceDialogs
              parentSpaceId={parentSpaceId}
              dialogOpen={dialog}
              callouts={callouts}
              journeyId={journeyId}
              journeyUrl={profile?.url}
              dashboardNavigation={dashboardNavigation}
              communityId={community?.id}
              collaborationId={collaboration?.id}
            />
          </>
        );
      }}
    </SubspaceHomeContainer>
  );
};

export default SubspaceHomePage;
