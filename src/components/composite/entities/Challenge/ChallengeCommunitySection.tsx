import React, { FC, useCallback, useMemo } from 'react';
import {
  CommunityUpdatesDataContainer,
  CommunityUpdatesDataEntities,
} from '../../../../containers/community-updates/CommunityUpdates';
import { useConfig } from '../../../../hooks';
import { ChallengeCommunityMessagesDocument, useChallengeUserIdsQuery } from '../../../../hooks/generated/graphql';
import { FEATURE_COMMUNICATIONS } from '../../../../models/constants';
import {
  ChallengeCommunityMessagesQuery,
  ChallengeCommunityMessagesQueryVariables,
  User,
} from '../../../../models/graphql-schema';
import CommunitySection, { CommunitySectionPropsExt } from '../../../../views/CommunitySection/CommunitySectionView';
import { Loading } from '../../../core';
import { useDiscussionsContext } from '../../../../context/Discussions/DiscussionsProvider';

interface ChallengeCommunitySectionProps extends CommunitySectionPropsExt {
  ecoverseId: string;
  challengeId: string;
}

export const ChallengeCommunitySection: FC<ChallengeCommunitySectionProps> = ({ ecoverseId, challengeId, ...rest }) => {
  const { data: usersQuery, loading: usersLoading } = useChallengeUserIdsQuery({
    variables: {
      ecoverseId,
      challengeId,
    },
    errorPolicy: 'all',
  });
  const { isFeatureEnabled } = useConfig();
  const { discussionList } = useDiscussionsContext();

  const addCommunityUpdatesContainer = useCallback(
    (children: (entities?: CommunityUpdatesDataEntities) => React.ReactElement) => {
      if (isFeatureEnabled(FEATURE_COMMUNICATIONS) && ecoverseId && challengeId) {
        return (
          <CommunityUpdatesDataContainer<ChallengeCommunityMessagesQuery, ChallengeCommunityMessagesQueryVariables>
            entities={{
              document: ChallengeCommunityMessagesDocument,
              variables: {
                ecoverseId,
                challengeId,
              },
              messageSelector: data => data?.ecoverse.challenge.community?.communication?.updates?.messages || [],
              roomIdSelector: data => data?.ecoverse.challenge.community?.communication?.updates?.id || '',
            }}
          >
            {(entities, { retrievingUpdateMessages }) =>
              retrievingUpdateMessages ? <Loading text={'Loading community data'} /> : children(entities)
            }
          </CommunityUpdatesDataContainer>
        );
      } else {
        return children(undefined);
      }
    },
    [isFeatureEnabled, ecoverseId, challengeId]
  );

  const memoizedNode = useMemo(
    () =>
      addCommunityUpdatesContainer(entities => (
        <CommunitySection
          users={(usersQuery?.ecoverse.challenge.community?.members as User[]) || []}
          updates={entities?.messages}
          updateSenders={entities?.senders}
          discussions={discussionList}
          {...rest}
        />
      )),
    [addCommunityUpdatesContainer, usersQuery, discussionList]
  );

  if (usersLoading) return <Loading text={'Loading community data'} />;

  return memoizedNode;
};

export default ChallengeCommunitySection;
