import React, { FC, useMemo } from 'react';
import { PageProps } from '../common';
import { useUpdateNavigation, useUrlParams } from '../../hooks';
import { useResolvedPath } from 'react-router-dom';
import AspectDashboardView from '../../views/aspect/AspectDashboardView';
import AspectDashboardContainer from '../../containers/aspect/AspectDashboardContainer';
import { getVisualBanner } from '../../utils/visuals.utils';

export interface AspectDashboardPageProps extends PageProps {}

const AspectDashboardPage: FC<AspectDashboardPageProps> = ({ paths: _paths }) => {
  const { ecoverseNameId = '', challengeNameId, opportunityNameId, aspectNameId = '' } = useUrlParams();
  const resolved = useResolvedPath('.');
  const currentPaths = useMemo(() => [..._paths, { value: '', name: 'Dashboard', real: false }], [_paths, resolved]);
  useUpdateNavigation({ currentPaths });

  return (
    <AspectDashboardContainer
      hubNameId={ecoverseNameId}
      aspectNameId={aspectNameId}
      challengeNameId={challengeNameId}
      opportunityNameId={opportunityNameId}
    >
      {(entities, state, actions) => (
        <AspectDashboardView
          entities={{
            banner: getVisualBanner(entities.aspect?.banner),
            displayName: entities.aspect?.displayName,
            description: entities.aspect?.description,
            tags: entities.aspect?.tagset?.tags,
            references: entities.aspect?.references,
            messages: entities.messages,
            commentId: entities.commentId,
          }}
          state={{
            loading: state.loading,
            error: state.error,
          }}
          actions={{
            handlePostComment: actions.handlePostComment,
            handleDeleteComment: actions.handleDeleteComment,
          }}
          options={{
            canReadComments: entities.permissions.canReadComments,
            canPostComments: entities.permissions.canPostComments,
            canDeleteComments: entities.permissions.canDeleteComments,
          }}
        />
      )}
    </AspectDashboardContainer>
  );
};
export default AspectDashboardPage;
