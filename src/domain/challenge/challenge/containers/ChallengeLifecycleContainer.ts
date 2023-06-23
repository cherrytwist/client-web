import { FC } from 'react';
import {
  useChallengeLifecycleQuery,
  useEventOnChallengeMutation,
} from '../../../../core/apollo/generated/apollo-hooks';
import { Lifecycle } from '../../../../core/apollo/generated/graphql-schema';
import {
  ComponentOrChildrenFn,
  renderComponentOrChildrenFn,
} from '../../../../common/utils/containers/ComponentOrChildrenFn';

interface ChallengeLifecycleContainerProvided {
  lifecycle: Lifecycle | undefined;
  loading: boolean;
  onSetNewState: (id: string, newState: string) => void;
}

type ChallengeLifecycleContainerProps = ComponentOrChildrenFn<ChallengeLifecycleContainerProvided> & {
  spaceNameId: string;
  challengeNameId: string;
};

const ChallengeLifecycleContainer: FC<ChallengeLifecycleContainerProps> = ({
  spaceNameId,
  challengeNameId,
  ...rendered
}) => {
  const { data, loading } = useChallengeLifecycleQuery({
    variables: { spaceId: spaceNameId, challengeId: challengeNameId },
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
  });

  const lifecycle = data?.space.challenge?.lifecycle;

  const [updateChallengeLifecycle] = useEventOnChallengeMutation({});

  const setNextState = (id: string, nextState: string) =>
    updateChallengeLifecycle({
      variables: {
        input: {
          ID: id,
          eventName: nextState,
        },
      },
    });

  return renderComponentOrChildrenFn(rendered, {
    lifecycle,
    loading,
    onSetNewState: setNextState,
  });
};

export default ChallengeLifecycleContainer;
