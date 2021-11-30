import { Avatar, CardHeader, Grid, Typography } from '@mui/material';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import { Skeleton } from '@mui/material';
import React, { FC } from 'react';
import CircleTag from '../../../../core/CircleTag';
import LinkCard from '../../../../core/LinkCard/LinkCard';
import VerifiedStatus from '../../VerifiedStatus/VerifiedStatus';

export interface AssociatedOrganizationCardProps {
  name: string;
  avatar?: string;
  information?: string;
  role?: string;
  members: number;
  verified: boolean;
  loading: boolean;
  url: string;
}

const useStyles = makeStyles(theme =>
  createStyles({
    cardHeader: {
      padding: theme.spacing(1),
      alignItems: 'flex-start',
    },
    cardHeaderAction: {
      margin: 0,
      paddingRight: theme.spacing(3),
    },
  })
);

const AssociatedOrganizationCard: FC<AssociatedOrganizationCardProps> = ({
  name,
  avatar,
  information,
  role,
  members,
  verified,
  loading,
  url,
}) => {
  const styles = useStyles();

  return (
    <LinkCard to={url} aria-label="associated-organization-card">
      <CardHeader
        className={styles.cardHeader}
        classes={{
          action: styles.cardHeaderAction,
        }}
        title={
          loading ? (
            <Skeleton animation="wave" width="80%" style={{ marginBottom: 2 }} />
          ) : (
            <Typography variant="h4" color="primary">
              {name}
            </Typography>
          )
        }
        subheader={
          <>
            <>
              {loading ? (
                <Skeleton animation="wave" width="80%" style={{ marginBottom: 2 }} />
              ) : (
                <Typography variant="body2">{information}</Typography>
              )}
            </>
            <>
              {loading ? (
                <Skeleton animation="wave" width="80%" style={{ marginBottom: 2 }} />
              ) : (
                <Typography variant="body2" color="primary">
                  {role}
                </Typography>
              )}
            </>
          </>
        }
        avatar={
          loading ? (
            <Skeleton animation="wave" variant="rectangular" width={64} height={64} />
          ) : (
            <Avatar variant="square" src={avatar} style={{ width: '64px', height: '64px' }}>
              {name[0]}
            </Avatar>
          )
        }
        action={
          !loading && (
            <Grid container direction="column" spacing={1}>
              <Grid item container spacing={2} alignItems="center">
                <Grid item>
                  <Typography>Members</Typography>
                </Grid>
                <Grid item>
                  <CircleTag text={`${members}`} color="primary" size="small" />
                </Grid>
              </Grid>
              <Grid item>
                <VerifiedStatus verified={verified} />
              </Grid>
            </Grid>
          )
        }
      />
    </LinkCard>
  );
};
export default AssociatedOrganizationCard;
