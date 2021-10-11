import { ApolloError } from '@apollo/client';
import React, { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { ActivityItem } from '../../components/composite/common/ActivityPanel/Activities';
import { useChallenge, useUserContext } from '../../hooks';
import { useChallengeProfileQuery } from '../../hooks/generated/graphql';
import { Container } from '../../models/container';
import { ChallengeProfileFragment } from '../../models/graphql-schema';
import { Project } from '../../models/Project';
import getActivityCount from '../../utils/get-activity-count';
import { buildProjectUrl } from '../../utils/urlBuilders';

export interface ChallengeContainerEntities {
  challenge?: ChallengeProfileFragment;
  activity: ActivityItem[];
  projects: Project[];
  permissions: {
    canEdit: boolean;
  };
  isAuthenticated: boolean;
  isMember: boolean;
}

export interface ChallengeContainerActions {}

export interface ChallengeContainerState {
  loading: boolean;
  error?: ApolloError;
}

export interface ChallengePageContainerProps
  extends Container<ChallengeContainerEntities, ChallengeContainerActions, ChallengeContainerState> {}

export const ChallengePageContainer: FC<ChallengePageContainerProps> = ({ children }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const { user, isAuthenticated } = useUserContext();
  const { ecoverseId, ecoverseNameId, challengeId, challengeNameId, loading } = useChallenge();

  const { data: _challenge, loading: loadingProfile } = useChallengeProfileQuery({
    variables: {
      ecoverseId: ecoverseNameId,
      challengeId: challengeNameId,
    },
    errorPolicy: 'all',
  });

  const permissions = {
    canEdit: user?.isChallengeAdmin(ecoverseId, challengeId) || false,
  };

  const activity: ActivityItem[] = useMemo(() => {
    const _activity = _challenge?.ecoverse.challenge.activity || [];
    return [
      {
        name: t('pages.activity.opportunities'),
        digit: getActivityCount(_activity, 'opportunities') || 0,
        color: 'primary',
      },
      {
        name: t('pages.activity.projects'),
        digit: getActivityCount(_activity, 'projects') || 0,
        color: 'positive',
      },
      {
        name: t('pages.activity.members'),
        digit: getActivityCount(_activity, 'members') || 0,
        color: 'neutralMedium',
      },
    ];
  }, [_challenge]);

  const _opportunities = _challenge?.ecoverse.challenge.opportunities || [];

  const projects = useMemo(() => {
    const result =
      _opportunities?.flatMap(
        o =>
          o.projects?.map(
            p =>
              ({
                title: p.displayName || '',
                description: p.description || '',
                caption: o.displayName || '',
                tag: { status: 'positive', text: p?.lifecycle?.state || '' },
                type: 'display',
                onSelect: () => history.replace(buildProjectUrl(ecoverseNameId, challengeNameId, o.nameID, p.nameID)),
              } as Project)
          ) || []
      ) || [];

    return [
      ...result,
      {
        title: t('pages.opportunity.sections.projects.more-projects'),
        type: 'more',
      } as Project,
    ];
  }, [_opportunities]);

  return (
    <>
      {children(
        {
          challenge: _challenge?.ecoverse.challenge,
          activity,
          permissions,
          isAuthenticated,
          isMember: user?.ofChallenge(challengeId) || false,
          projects,
        },
        { loading: loading || loadingProfile },
        {}
      )}
    </>
  );
};
export default ChallengePageContainer;
