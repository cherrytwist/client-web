import { ReactComponent as CupStrawIcon } from 'bootstrap-icons/icons/cup-straw.svg';
import { ReactComponent as InfoSquareIcon } from 'bootstrap-icons/icons/info-square.svg';
import { ReactComponent as MinecartLoadedIcon } from 'bootstrap-icons/icons/minecart-loaded.svg';
import { ReactComponent as PatchQuestionIcon } from 'bootstrap-icons/icons/patch-question.svg';
import React, { FC, useState } from 'react';
import { Theme } from '../../context/ThemeProvider';
import { createStyles } from '../../hooks/useTheme';
import Card from '../core/Card';
import Icon from '../core/Icon';
import Typography from '../core/Typography';
import ActorEdit from './ActorEdit';
import { useUserContext } from '../../hooks/useUserContext';

const useCardStyles = createStyles(theme => ({
  item: {
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: theme.shape.spacing(2),
  },
  description: {
    flexGrow: 1,
    display: 'flex',
    minWidth: 0,

    '& > span': {
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
    },
  },
  border: {
    border: `1px solid ${theme.palette.neutralMedium}`,
  },
  mdSpacer: {
    marginTop: theme.shape.spacing(2),
  },
  lgSpacer: {
    marginTop: theme.shape.spacing(4),
  },
  iconWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

export const Spacer: FC<{ variant?: 'lg' | 'md' }> = ({ variant = 'md' }) => {
  const styles = useCardStyles();

  return <div className={styles[`${variant}Spacer`]} />;
};

interface RelationCardProps {
  actorName: string;
  actorRole?: string;
  actorType?: string;
  description?: string;
  type: string;
}

export const RelationCard: FC<RelationCardProps> = ({ actorName, actorRole, description, type }) => {
  const styles = useCardStyles();

  return (
    <Card
      className={styles.border}
      bodyProps={{
        classes: {
          background: (theme: Theme) => theme.palette.neutralLight,
        },
      }}
      primaryTextProps={{ text: actorName }}
      tagProps={{
        text: `${actorRole}`,
        color: type === 'incoming' ? 'positive' : 'neutralMedium',
      }}
    >
      {description !== '""' && ( // remove empty quotes check when it is fixed on server
        <>
          <Typography as="h3" variant="caption" color="neutralMedium" weight="bold" className={styles.iconWrapper}>
            {'REASON FOR COLLABORATION'}
          </Typography>
          <Typography as="h3" variant="body">
            {description}
          </Typography>
        </>
      )}
    </Card>
  );
};

interface ActorCardProps {
  id: string;
  name: string;
  description?: string;
  value?: string;
  impact?: string;
  type?: 'stakeholder' | 'key user' | string;
  opportunityId: string;
}

export const ActorCard: FC<ActorCardProps> = ({
  id,
  name,
  description,
  value,
  impact,
  type = 'stakeholder',
  opportunityId,
}) => {
  const styles = useCardStyles();
  const [isEditOpened, setEditOpened] = useState<boolean>(false);
  const { user } = useUserContext();

  return (
    <>
      <Card
        className={styles.border}
        bodyProps={{
          classes: {
            background: (theme: Theme) =>
              type === 'stakeholder' ? theme.palette.background : theme.palette.neutralLight,
          },
        }}
        primaryTextProps={{ text: name, tooltip: true }}
        tagProps={{
          text: type,
          color: type === 'stakeholder' ? 'neutral' : 'positive',
        }}
        onClick={user?.roles.includes('global-admins') ? () => setEditOpened(true) : undefined}
      >
        <Spacer />
        <Typography as="h3" variant="caption" color="neutralMedium" weight="bold" className={styles.iconWrapper}>
          {'wins how? (juice)'}
          <Icon component={CupStrawIcon} size="sm" color="neutral" />
        </Typography>
        <Typography as="h3" variant="body">
          {value}
        </Typography>
        <Spacer variant="lg" />

        <Typography as="h3" variant="caption" color="neutralMedium" weight="bold" className={styles.iconWrapper}>
          {'required effort for pilot'}
          <Icon component={MinecartLoadedIcon} size="sm" color="neutral" />
        </Typography>
        <Typography as="h3" variant="body">
          {`${description} ${impact}`}
        </Typography>
      </Card>
      <ActorEdit
        show={isEditOpened}
        onHide={() => setEditOpened(false)}
        data={{ name, description, value, impact }}
        opportunityId={opportunityId}
        id={id}
      />
    </>
  );
};

interface AspectCardProps {
  title: string;
  framing?: string;
  explanation?: string;
}

export const AspectCard: FC<AspectCardProps> = ({ title, framing, explanation }) => {
  const styles = useCardStyles();

  return (
    <Card
      className={styles.border}
      bodyProps={{
        classes: {
          background: (theme: Theme) => theme.palette.background,
        },
      }}
      primaryTextProps={{ text: title }}
    >
      <Spacer />
      <Typography as="h3" variant="caption" color="neutralMedium" weight="bold" className={styles.iconWrapper}>
        {'explanation'}
        <Icon component={InfoSquareIcon} size="sm" color="neutral" />
      </Typography>
      <Typography as="h3" variant="body">
        {explanation}
      </Typography>
      <Spacer variant="lg" />
      <Typography as="h3" variant="caption" color="neutralMedium" weight="bold" className={styles.iconWrapper}>
        {'where we need help'}
        <Icon component={PatchQuestionIcon} size="sm" color="neutral" />
      </Typography>
      <Typography as="h3" variant="body">
        {framing}
      </Typography>
    </Card>
  );
};
