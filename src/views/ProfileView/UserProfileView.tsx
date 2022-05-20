import { Avatar, Box, Card, CardContent, CardHeader, Grid, Typography as MUITypography } from '@mui/material';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import React, { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SettingsButton } from '../../components/composite';
import ProfileDetail from '../../components/composite/common/ProfileDetail/ProfileDetail';
import SocialLinks, { isSocialLink } from '../../components/composite/common/SocialLinks/SocialLinks';
import TagsComponent from '../../components/composite/common/TagsComponent/TagsComponent';
import Typography from '../../components/core/Typography';
import { UserMetadata } from '../../hooks';
import { isSocialNetworkSupported, toSocialNetworkEnum } from '../../models/enums/SocialNetworks';
import References from '../../components/composite/common/References/References';
import LocationView from '../../domain/location/LocationView';
import { formatLocation } from '../../domain/location/LocationUtils';
import { styled } from '@mui/styles';

export interface UserProfileViewProps {
  entities: {
    userMetadata: UserMetadata;
    verified: boolean;
  };
  options: {
    isCurrentUser: boolean;
  };
}

const PADDING_LEFT = 4;
const PADDING_RIGHT = 4;

const useStyles = makeStyles(theme =>
  createStyles({
    card: {
      background: theme.palette.neutralLight.main,
    },
    cardHeader: {
      padding: theme.spacing(1),
    },
    cardHeaderAction: {
      margin: 0,
      paddingRight: theme.spacing(3),
    },
    media: {
      background: theme.palette.neutralMedium.main,
      height: 140,
    },
    content: {
      paddingLeft: theme.spacing(PADDING_LEFT),
      paddingRight: theme.spacing(PADDING_RIGHT),
    },
    avatar: {
      width: theme.spacing(20.5),
      height: theme.spacing(20.5),
    },
    header: {
      alignItems: 'flex-start',
      paddingTop: theme.spacing(4),
      paddingLeft: theme.spacing(PADDING_LEFT),
      paddingRight: theme.spacing(PADDING_RIGHT),
    },
    headerTitle: {
      display: 'flex',
    },
    headerAvatar: {
      flexDirection: 'column',
    },
    headerAction: {},
  })
);

const TagsWithOffset = styled(TagsComponent)({
  marginTop: 5,
});

export const UserProfileView: FC<UserProfileViewProps> = ({ entities: { userMetadata }, options }) => {
  const { t } = useTranslation();
  const { user, keywords, skills } = userMetadata;
  const styles = useStyles();
  const references = user.profile?.references;
  const bio = user.profile?.description;
  const { displayName, profile, phone } = user;

  const { isCurrentUser } = options;

  const socialLinks = useMemo(() => {
    return references
      ?.map(s => ({
        type: toSocialNetworkEnum(s.name),
        url: s.uri,
      }))
      .filter(isSocialLink);
  }, [references]);

  const nonSocialReferences = useMemo(() => {
    return references?.filter(x => !isSocialNetworkSupported(x.name));
  }, [references]);

  return (
    <Card className={styles.card} square elevation={0} variant="outlined">
      <CardHeader
        classes={{
          action: styles.headerAction,
          title: styles.headerTitle,
          avatar: styles.headerAvatar,
        }}
        avatar={
          <Box display="flex" flexDirection="column">
            <Avatar variant="square" src={user.profile?.avatar?.uri} className={styles.avatar} aria-label="user-avatar">
              {user.firstName[0]}
            </Avatar>
            <Box paddingTop={1}>
              <SocialLinks title="" items={socialLinks} />
            </Box>
          </Box>
        }
        className={styles.header}
        action={
          isCurrentUser && (
            <SettingsButton
              color={'primary'}
              to={'settings/profile'}
              tooltip={t('pages.user-profile.tooltips.settings')}
            />
          )
        }
        title={
          <Grid container spacing={1} direction="column">
            <Grid item>
              <MUITypography variant="h2">{displayName}</MUITypography>
            </Grid>
            <Grid item>
              <LocationView location={formatLocation(profile?.location)} />
            </Grid>
            <Grid item>
              <ProfileDetail title={t('components.profile.fields.work.title')} value={''} aria-label="work" />
            </Grid>
            <Grid item>
              <ProfileDetail title={t('components.profile.fields.telephone.title')} value={phone} aria-label="phone" />
            </Grid>
          </Grid>
        }
      />

      <CardContent className={styles.content}>
        <Grid container spacing={2} direction="column">
          <Grid item>
            <ProfileDetail title={t('components.profile.fields.bio.title')} value={bio} aria-label="bio" />
          </Grid>

          <Grid item>
            <Typography color="primary" weight="boldLight" aria-label="keywords">
              {t('components.profile.fields.keywords.title')}
            </Typography>
            <TagsWithOffset tags={keywords} />
          </Grid>

          <Grid item>
            <Typography color="primary" weight="boldLight" aria-label="skills">
              {t('components.profile.fields.skills.title')}
            </Typography>
            <TagsWithOffset tags={skills} />
          </Grid>

          <Grid item container direction="column">
            <Typography color="primary" weight="boldLight" aria-label="links">
              {t('components.profile.fields.links.title')}
            </Typography>
            <References
              references={nonSocialReferences}
              noItemsView={
                <MUITypography color="neutral.main" variant="subtitle2">
                  {t('common.no-references')}
                </MUITypography>
              }
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
export default UserProfileView;
