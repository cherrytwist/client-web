import clsx from 'clsx';
import React, { FC, useMemo } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import { Box } from '@material-ui/core';
import Card from '../../../core/Card';
import hexToRGBA from '../../../../utils/hexToRGBA';
import TagContainer from '../../../core/TagContainer';
import Tag from '../../../core/Tag';
import Typography from '../../../core/Typography';
import ConditionalLink from '../../../core/ConditionalLink';

const useStyles = makeStyles(theme => ({
  relative: {
    position: 'relative',
  },
  card: {
    transition: 'box-shadow 0.15s ease-in-out',
    border: `1px solid ${theme.palette.neutralMedium.main}`,

    '&:hover': {
      boxShadow: `5px 5px 10px ${hexToRGBA(theme.palette.neutral.main, 0.15)}`,
    },
    overflow: 'hidden',
  },
  section: {
    padding: `${theme.spacing(1)}px ${theme.spacing(3)}px`,
  },
  content: {
    height: '270px',
    background: theme.palette.background.paper,
    padding: theme.spacing(2),
  },
  tagline: {
    flexGrow: 1,
    display: 'flex',
    minWidth: 0,
  },
}));

interface Props {
  title?: string;
  avatar?: string;
  description?: string;
  tags?: string[];
  url?: string;
}

const UserGroupCard: FC<Props> = ({ title, description, tags = [], url = '' }) => {
  const styles = useStyles();

  const truncatedTags = useMemo(() => tags.slice(0, 3), [tags]);

  return (
    <div className={styles.relative}>
      <ConditionalLink to={url} condition={!!url}>
        <Card
          className={clsx(url ? styles.card : undefined)}
          bodyProps={{
            classes: {
              background: theme => hexToRGBA(theme.palette.neutral.main, 0.4),
            },
          }}
          primaryTextProps={{
            text: title,
            classes: {
              color: theme => theme.palette.neutralLight.main,
            },
          }}
          sectionProps={{
            children: (
              <Box display={'flex'} flexDirection={'column'}>
                <TagContainer>
                  {truncatedTags.map((t, i) => (
                    // with maxWidth limit long tags to 2 per line. so no more than 2 lines of tags.
                    // 45% was the break point.
                    <Box key={i} overflow={'hidden'} maxWidth={'45%'}>
                      <Tag key={i} text={t} color="neutralMedium" />
                    </Box>
                  ))}
                  {tags.length > 3 && (
                    <Tooltip placement="right" title={tags.slice(3).join(', ')} id="more-tags" arrow>
                      <span>
                        <Tag text={<>{`+ ${tags.length - truncatedTags.length} more`}</>} color="neutralMedium" />
                      </span>
                    </Tooltip>
                  )}
                </TagContainer>
              </Box>
            ),
            className: styles.content,
          }}
        >
          {description && (
            <Typography color="neutralLight" className={styles.tagline} clamp={2}>
              <span>{description}</span>
            </Typography>
          )}
        </Card>
      </ConditionalLink>
    </div>
  );
};
export default UserGroupCard;
