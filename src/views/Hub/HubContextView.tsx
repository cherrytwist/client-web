import { ApolloError } from '@apollo/client';
import React, { FC } from 'react';
import ApplicationButton from '../../components/composite/common/ApplicationButton/ApplicationButton';
import ContextSection from '../../components/composite/sections/ContextSection';
import ApplicationButtonContainer from '../../containers/application/ApplicationButtonContainer';
import { Context, ContextTabFragment, ReferenceContextTabFragment, Tagset } from '../../models/graphql-schema';
import { ViewProps } from '../../models/view';

interface HubContextEntities {
  context?: ContextTabFragment;
  hubId?: string;
  hubNameId?: string;
  hubDisplayName?: string;
  hubTagSet?: Tagset;
  references?: ReferenceContextTabFragment[];
}
interface HubContextActions {}
interface HubContextState {
  loading: boolean;
  error?: ApolloError;
}
interface HubContextOptions {}

interface HubContextViewProps
  extends ViewProps<HubContextEntities, HubContextActions, HubContextState, HubContextOptions> {}

export const HubContextView: FC<HubContextViewProps> = ({ entities, state }) => {
  const { loading } = state;
  const { context, hubId, hubNameId, hubDisplayName, hubTagSet } = entities;

  const {
    tagline = '',
    impact = '',
    background = '',
    location = undefined,
    vision = '',
    who = '',
    id = '',
  } = context || ({} as Context);
  const references = entities?.references;

  return (
    <ContextSection
      primaryAction={
        hubId && hubNameId && hubDisplayName ? (
          <ApplicationButtonContainer>
            {(e, s) => <ApplicationButton {...e?.applicationButtonProps} loading={s.loading} />}
          </ApplicationButtonContainer>
        ) : undefined
      }
      background={background}
      displayName={hubDisplayName}
      keywords={hubTagSet?.tags}
      impact={impact}
      tagline={tagline}
      location={location}
      vision={vision}
      who={who}
      contextId={id}
      references={references}
      loading={loading}
    />
  );
};
export default HubContextView;
