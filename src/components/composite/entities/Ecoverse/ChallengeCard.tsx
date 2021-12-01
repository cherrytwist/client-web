import Tooltip from '@mui/material/Tooltip';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { Nvp } from '../../../../models/graphql-schema';
import getActivityCount from '../../../../utils/get-activity-count';
import hexToRGBA from '../../../../utils/hexToRGBA';
import { Activities } from '../../common/ActivityPanel/Activities';
import CardTags from '../../common/CardTags/CardTags';
import Button from '../../../core/Button';
import Card from '../../../core/Card';
import Typography from '../../../core/Typography';

const useCardStyles = makeStyles(theme => ({
  relative: {
    position: 'relative',
    flexGrow: 1,
    display: 'flex',
  },
  card: {
    marginTop: 0,
    border: `1px solid ${theme.palette.neutralMedium.main}`,
    height: 400,
  },
  content: {
    height: '225px',
    background: theme.palette.background.paper,
    padding: theme.spacing(2),
  },
  footer: {
    background: theme.palette.neutralLight.main,
    padding: theme.spacing(2),
  },
  tagline: {
    flexGrow: 1,
    display: 'flex',
    minWidth: 0,
  },
}));

// todo: unify in one card props
interface ChallengeCardProps {
  id: string | number;
  displayName?: string;
  context?: {
    tagline: string;
    visual?: {
      background: string;
    };
  };
  isMember: boolean;
  activity: Pick<Nvp, 'name' | 'value'>[];
  tags: string[];
  url: string;
}

const ChallengeCard: FC<ChallengeCardProps> = ({ displayName, context = {}, url, activity, tags, isMember }) => {
  const { t } = useTranslation();
  const styles = useCardStyles();
  const { tagline, visual } = context;

  const cardTags = isMember ? { text: t('components.card.member') } : undefined;

  const backgroundImg = visual?.background;

  return (
    <div className={styles.relative}>
      <Card
        className={styles.card}
        classes={{
          background: theme =>
            backgroundImg ? `url("${backgroundImg}") no-repeat center center / cover` : theme.palette.neutral.main,
        }}
        bodyProps={{
          classes: {
            background: theme => hexToRGBA(theme.palette.neutral.main, 0.4),
          },
        }}
        primaryTextProps={{
          text: displayName || '',
          tooltip: true,
          classes: {
            color: theme => theme.palette.neutralLight.main,
          },
        }}
        sectionProps={{
          children: (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Activities
                items={[
                  { name: 'Opportunities', digit: getActivityCount(activity, 'opportunities') || 0, color: 'primary' },
                  { name: 'Members', digit: getActivityCount(activity, 'members') || 0, color: 'positive' },
                ]}
              />
              <CardTags tags={tags} />
            </div>
          ),
          className: styles.content,
        }}
        footerProps={{
          className: styles.footer,
          children: (
            <div>
              <Button text={t('buttons.explore')} as={Link} to={url} />
            </div>
          ),
        }}
        tagProps={cardTags}
      >
        {tagline && (
          <Tooltip placement="right" title={tagline || ''} arrow>
            <div>
              <Typography color="neutralLight" className={styles.tagline} clamp={2}>
                <span>{tagline}</span>
              </Typography>
            </div>
          </Tooltip>
        )}
      </Card>
    </div>
  );
};

export default ChallengeCard;
