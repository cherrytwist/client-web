import {
  useCalloutPostStorageConfigQuery,
  useCalloutStorageConfigQuery,
  useInnovationHubStorageConfigQuery,
  useInnovationPackStorageConfigQuery,
  useJourneyStorageConfigQuery,
  useOrganizationStorageConfigQuery,
  usePlatformStorageConfigQuery,
  useSpaceGuidelinesTemplateStorageConfigQuery,
  useUserStorageConfigQuery,
} from '../../../core/apollo/generated/apollo-hooks';
import { useMemo } from 'react';
import { AuthorizationPrivilege } from '../../../core/apollo/generated/graphql-schema';

export interface StorageConfig {
  storageBucketId: string;
  allowedMimeTypes: string[];
  maxFileSize: number;
  canUpload: boolean;
}

type StorageConfigLocation =
  | 'journey'
  | 'user'
  | 'organization'
  | 'callout'
  | 'post'
  | 'guidelinesTemplate'
  | 'innovationPack'
  | 'innovationHub'
  | 'platform';

interface UseStorageConfigOptionsBase {
  locationType: StorageConfigLocation;
  skip?: boolean;
}

interface UseStorageConfigOptionsSpace extends UseStorageConfigOptionsBase {
  spaceId: string | undefined;
  locationType: 'journey';
}

interface UseStorageConfigOptionsCallout extends UseStorageConfigOptionsBase {
  calloutId: string;
  locationType: 'callout';
}

interface UseStorageConfigOptionsPost extends UseStorageConfigOptionsBase {
  postId: string | undefined;
  calloutId: string | undefined;
  locationType: 'post';
}

interface UseStorageConfigOptionsGuidelinesTemplate extends UseStorageConfigOptionsBase {
  spaceId: string | undefined;
  guidelinesTemplateId: string | undefined;
  locationType: 'guidelinesTemplate';
}

interface UseStorageConfigOptionsUser extends UseStorageConfigOptionsBase {
  userId: string;
  locationType: 'user';
}

interface UseStorageConfigOptionsOrganization extends UseStorageConfigOptionsBase {
  organizationId: string | undefined;
  locationType: 'organization';
}

interface UseStorageConfigOptionsInnovationPack extends UseStorageConfigOptionsBase {
  innovationPackId: string | undefined;
  locationType: 'innovationPack';
}

interface UseStorageConfigOptionsInnovationHub extends UseStorageConfigOptionsBase {
  innovationHubId: string | undefined;
  locationType: 'innovationHub';
}

interface UseStorageConfigOptionsPlatform extends UseStorageConfigOptionsBase {
  locationType: 'platform';
}

export type StorageConfigOptions =
  | UseStorageConfigOptionsSpace
  | UseStorageConfigOptionsUser
  | UseStorageConfigOptionsOrganization
  | UseStorageConfigOptionsCallout
  | UseStorageConfigOptionsPost
  | UseStorageConfigOptionsGuidelinesTemplate
  | UseStorageConfigOptionsInnovationPack
  | UseStorageConfigOptionsInnovationHub
  | UseStorageConfigOptionsPlatform;

export interface StorageConfigProvided {
  storageConfig: StorageConfig | undefined;
}

const useStorageConfig = ({ locationType, skip, ...options }: StorageConfigOptions): StorageConfigProvided => {
  const journeyOptions = options as UseStorageConfigOptionsSpace;
  const { data: journeyStorageConfigData } = useJourneyStorageConfigQuery({
    variables: {
      spaceId: journeyOptions.spaceId!,
    },
    skip: skip || locationType !== 'journey' || !journeyOptions.spaceId,
  });

  const calloutOptions = options as UseStorageConfigOptionsCallout;
  const { data: calloutStorageConfigData } = useCalloutStorageConfigQuery({
    variables: {
      calloutId: calloutOptions.calloutId,
    },
    skip: skip || locationType !== 'callout',
  });

  const postOptions = options as UseStorageConfigOptionsPost;
  const { data: postStorageConfigData } = useCalloutPostStorageConfigQuery({
    variables: {
      postId: postOptions.postId!, // ensured by skip
      calloutId: postOptions.calloutId!, // ensured by skip
    },
    skip: skip || locationType !== 'post' || !postOptions.postId || !postOptions.calloutId,
  });

  const guidelinesTemplateOptions = options as UseStorageConfigOptionsGuidelinesTemplate;
  const { data: guidelinesTemplateStorageConfigData } = useSpaceGuidelinesTemplateStorageConfigQuery({
    variables: {
      spaceId: guidelinesTemplateOptions.spaceId!,
      includeTemplate: !!guidelinesTemplateOptions.guidelinesTemplateId,
      templateId: guidelinesTemplateOptions.guidelinesTemplateId,
    },
    skip: skip || locationType !== 'guidelinesTemplate' || !guidelinesTemplateOptions.spaceId,
  });

  const userOptions = options as UseStorageConfigOptionsUser;
  const { data: userStorageConfigData } = useUserStorageConfigQuery({
    variables: userOptions,
    skip: skip || locationType !== 'user',
  });

  const organizationOptions = options as UseStorageConfigOptionsOrganization;
  const { data: organizationStorageConfigData } = useOrganizationStorageConfigQuery({
    variables: {
      organizationId: organizationOptions.organizationId!, // presence ensured by skip
    },
    skip: skip || locationType !== 'organization' || !organizationOptions.organizationId,
  });

  const innovationPackOptions = options as UseStorageConfigOptionsInnovationPack;
  const { data: innovationPackStorageConfigData } = useInnovationPackStorageConfigQuery({
    variables: {
      innovationPackId: innovationPackOptions.innovationPackId!, // presence ensured by skip
    },
    skip: skip || locationType !== 'innovationPack' || !innovationPackOptions.innovationPackId,
  });

  const innovationHubOptions = options as UseStorageConfigOptionsInnovationHub;
  const { data: innovationHubStorageConfigData } = useInnovationHubStorageConfigQuery({
    variables: {
      innovationHubId: innovationHubOptions.innovationHubId!, // presence ensured by skip
    },
    skip: skip || locationType !== 'innovationHub' || !innovationHubOptions.innovationHubId,
  });

  const { data: platformStorageConfigData } = usePlatformStorageConfigQuery({
    skip: skip || locationType !== 'platform',
  });

  const journey = journeyStorageConfigData?.lookup.space;

  const callout = calloutStorageConfigData?.lookup.callout;

  const [contribution] = postStorageConfigData?.lookup.callout?.contributions ?? [];

  const { profile } =
    journey ??
    callout?.framing ??
    contribution?.post ??
    guidelinesTemplateStorageConfigData?.space ??
    guidelinesTemplateStorageConfigData?.spaceAccount.account?.library?.communityGuidelinesTemplate ??
    userStorageConfigData?.user ??
    organizationStorageConfigData?.organization ??
    innovationPackStorageConfigData?.platform.library.innovationPack ??
    innovationHubStorageConfigData?.platform.innovationHub ??
    {};

  const storageConfig =
    profile?.storageBucket ?? platformStorageConfigData?.platform.storageAggregator.directStorageBucket;

  return useMemo(
    () => ({
      storageConfig: storageConfig
        ? {
            storageBucketId: storageConfig.id,
            allowedMimeTypes: storageConfig.allowedMimeTypes,
            maxFileSize: storageConfig.maxFileSize,
            canUpload: (storageConfig?.authorization?.myPrivileges ?? []).includes(AuthorizationPrivilege.FileUpload),
          }
        : undefined,
    }),
    [storageConfig]
  );
};

export default useStorageConfig;
