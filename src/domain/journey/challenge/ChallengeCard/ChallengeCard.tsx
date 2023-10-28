import React, { ReactNode } from 'react';
import SpaceChildJourneyCard, {
  SpaceChildJourneyCardProps,
} from '../../common/SpaceChildJourneyCard/SpaceChildJourneyCard';
import { ChallengeIcon } from '../icon/ChallengeIcon';
import CardParentJourneySegment from '../../common/SpaceChildJourneyCard/CardParentJourneySegment';
import { SpaceIcon } from '../../space/icon/SpaceIcon';
import CardActions from '../../../../core/ui/card/CardActions';
import JourneyCardGoToButton from '../../common/JourneyCard/JourneyCardGoToButton';
import JourneyCardJoinButton from '../../common/JourneyCard/JourneyCardJoinButton';
import { SpaceVisibility } from '../../../../core/apollo/generated/graphql-schema';
import CardRibbon from '../../../../core/ui/card/CardRibbon';
import { useTranslation } from 'react-i18next';

interface ChallengeCardProps
  extends Omit<SpaceChildJourneyCardProps, 'iconComponent' | 'journeyTypeName' | 'parentSegment'> {
  tagline: string;
  challengeId?: string;
  challengeNameId?: string;
  spaceUri?: string;
  spaceDisplayName?: ReactNode;
  spaceLicense?: SpaceVisibility;
  innovationFlowState?: string;
  private?: boolean;
  privateParent?: boolean;
  hideJoin?: boolean;
  journeyUri: string;
}

const ChallengeCard = ({
  challengeId,
  challengeNameId,
  spaceDisplayName,
  spaceUri,
  spaceLicense,
  hideJoin = false,
  ...props
}: ChallengeCardProps) => {
  const { t } = useTranslation();

  const ribbon =
    spaceLicense === SpaceVisibility.Archived ? (
      <CardRibbon text={t(`common.enums.space-visibility.${spaceLicense}` as const)} />
    ) : undefined;

  return (
    <SpaceChildJourneyCard
      iconComponent={ChallengeIcon}
      parentSegment={
        spaceUri &&
        spaceDisplayName && (
          <CardParentJourneySegment iconComponent={SpaceIcon} parentJourneyUri={spaceUri}>
            {spaceDisplayName}
          </CardParentJourneySegment>
        )
      }
      expansionActions={
        <CardActions>
          <JourneyCardGoToButton journeyUri={props.journeyUri} journeyTypeName="challenge" />
          {!hideJoin && challengeId && challengeNameId && (
            <JourneyCardJoinButton
              challengeId={challengeId}
              challengeNameId={challengeNameId}
              challengeName={props.displayName}
            />
          )}
        </CardActions>
      }
      ribbon={ribbon}
      {...props}
    />
  );
};

export default ChallengeCard;
