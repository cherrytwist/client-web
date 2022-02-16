import { useMemo } from 'react';
import { useUrlParams } from '../../hooks';
import {
  useChallengeApplicationQuery,
  useChallengeApplicationTemplateQuery,
  useEcoverseApplicationQuery,
  useEcoverseApplicationTemplateQuery,
} from '../../hooks/generated/graphql';
import { ApplicationTypeEnum } from '../../models/enums/application-type';
import { buildChallengeUrl, buildEcoverseUrl } from '../../utils/urlBuilders';
import { getVisualAvatar } from '../../utils/visuals.utils';

export const useApplicationCommunityQuery = (type: ApplicationTypeEnum) => {
  const { hubNameId = '', challengeNameId = '' } = useUrlParams();

  const {
    data: challengeData,
    loading: isChallengeCommunityLoading,
    error: challengeCommunityError,
  } = useChallengeApplicationQuery({
    variables: {
      hubId: hubNameId,
      challengeId: challengeNameId,
    },
    errorPolicy: 'all',
    skip: type !== ApplicationTypeEnum.challenge,
  });

  const {
    data: challengeTemplateData,
    loading: isChallengeTemplateLoading,
    error: challengeTemplateError,
  } = useChallengeApplicationTemplateQuery({
    skip: type !== ApplicationTypeEnum.challenge,
  });

  const {
    data: hubData,
    loading: isEcoverseCommunityLoading,
    error: hubCommunityError,
  } = useEcoverseApplicationQuery({
    variables: {
      hubId: hubNameId,
    },
    errorPolicy: 'all',
    skip: type !== ApplicationTypeEnum.hub,
  });

  const {
    data: hubTemplateData,
    loading: isEcoverseTemplateLoading,
    error: hubTemplateError,
  } = useEcoverseApplicationTemplateQuery({
    skip: type !== ApplicationTypeEnum.hub,
  });

  const result = useMemo(() => {
    if (type === ApplicationTypeEnum.hub) {
      return {
        communityId: hubData?.hub.community?.id || '',
        displayName: hubData?.hub.displayName || '',
        avatar: getVisualAvatar(hubData?.hub.context?.visuals),
        tagline: hubData?.hub.context?.tagline || '',
        questions: hubTemplateData?.configuration.template.hubs[0].applications?.[0].questions || [],
        backUrl: buildEcoverseUrl(hubNameId),
      };
    }
    if (type === ApplicationTypeEnum.challenge) {
      return {
        communityId: challengeData?.hub.challenge.community?.id || '',
        displayName: challengeData?.hub.challenge.displayName || '',
        avatar: getVisualAvatar(challengeData?.hub.challenge.context?.visuals),
        tagline: challengeData?.hub.challenge.context?.tagline || '',
        questions: challengeTemplateData?.configuration.template.challenges[0].applications?.[0].questions || [],
        backUrl: buildChallengeUrl(hubNameId, challengeNameId),
      };
    }
  }, [type, challengeData, challengeTemplateData, hubData, hubTemplateData]);

  return {
    data: result,
    error: challengeCommunityError || challengeTemplateError || hubCommunityError || hubTemplateError,
    loading:
      isChallengeCommunityLoading ||
      isChallengeTemplateLoading ||
      isEcoverseCommunityLoading ||
      isEcoverseTemplateLoading,
  };
};
