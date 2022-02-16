import { ApolloError } from '@apollo/client';
import React, { FC } from 'react';
import ApplicationButton from '../../components/composite/common/ApplicationButton/ApplicationButton';
import ContextSection from '../../components/composite/sections/ContextSection';
import ApplicationButtonContainer from '../../containers/application/ApplicationButtonContainer';
import {
  AspectCardFragment,
  Context,
  ContextTabFragment,
  ReferenceContextTabFragment,
  Tagset,
} from '../../models/graphql-schema';
import { ViewProps } from '../../models/view';
import { getVisualBanner } from '../../utils/visuals.utils';

interface EcoverseContextEntities {
  context?: ContextTabFragment;
  hubId?: string;
  hubNameId?: string;
  hubDisplayName?: string;
  hubTagSet?: Tagset;
  aspects?: AspectCardFragment[];
  references?: ReferenceContextTabFragment[];
}
interface EcoverseContextActions {}
interface EcoverseContextState {
  loading: boolean;
  error?: ApolloError;
}
interface EcoverseContextOptions {
  canReadAspects: boolean;
  canCreateAspects: boolean;
}

interface EcoverseContextViewProps
  extends ViewProps<EcoverseContextEntities, EcoverseContextActions, EcoverseContextState, EcoverseContextOptions> {}

export const EcoverseContextView: FC<EcoverseContextViewProps> = ({ entities, state, options }) => {
  const { canReadAspects, canCreateAspects } = options;
  const { loading } = state;
  const { context, hubId, hubNameId, hubDisplayName, hubTagSet } = entities;

  const {
    tagline = '',
    impact = '',
    background = '',
    vision = '',
    who = '',
    visuals = [],
    id = '',
  } = context || ({} as Context);
  const hubBanner = getVisualBanner(visuals);
  const aspects = entities?.aspects;
  const references = entities?.references;

  return (
    <ContextSection
      primaryAction={
        hubId && hubNameId && hubDisplayName ? (
          <ApplicationButtonContainer
            entities={{
              hubId: hubId,
              hubNameId: hubNameId,
              hubName: hubDisplayName,
            }}
          >
            {(e, s) => <ApplicationButton {...e?.applicationButtonProps} loading={s.loading} />}
          </ApplicationButtonContainer>
        ) : undefined
      }
      banner={hubBanner}
      background={background}
      displayName={hubDisplayName}
      keywords={hubTagSet?.tags}
      impact={impact}
      tagline={tagline}
      vision={vision}
      who={who}
      contextId={id}
      references={references}
      aspects={aspects}
      aspectsLoading={loading}
      canReadAspects={canReadAspects}
      canCreateAspects={canCreateAspects}
    />
  );
};
export default EcoverseContextView;
