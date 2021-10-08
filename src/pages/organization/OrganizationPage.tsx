import { ReactComponent as Globe } from 'bootstrap-icons/icons/globe2.svg';
import { ReactComponent as CompassIcon } from 'bootstrap-icons/icons/compass.svg';
import { ReactComponent as PeopleIcon } from 'bootstrap-icons/icons/people.svg';
import React, { FC, useMemo } from 'react';
import { useRouteMatch } from 'react-router';
import { useTranslation } from 'react-i18next';
import { PageProps } from '../common';
import { createStyles, useOrganization, useUpdateNavigation, useUserContext } from '../../hooks';
import Section, { Body, Header as SectionHeader, SubHeader } from '../../components/core/Section';
import { Image } from '../../components/core/Image';
import Divider from '../../components/core/Divider';
import { useMembershipOrganizationQuery } from '../../hooks/generated/graphql';
import { Loading } from '../../components/core';
import Icon from '../../components/core/Icon';
import MembershipSection from './MembershipSection';
import { Agent, User } from '../../models/graphql-schema';
import InfoSection from './InfoSection';
import HostedEcoverseCard from './HostedEcoverseCard';
import LeadingChallengeCard from './LeadingChallengeCard';
import { SettingsButton } from '../../components/composite';
import { buildAdminOrganizationUrl, buildUserProfileUrl } from '../../utils/urlBuilders';
import AuthenticationBackdrop from '../../components/AuthenticationBackdrop';
import {
  userTagsValueGetter,
  userValueGetter,
} from '../../components/core/card-filter/value-getters/user-value-getter';
import { CardContainer } from '../../components/core/CardContainer';
import UserCard, { USER_CARD_HEIGHT } from '../../components/composite/common/cards/user-card/UserCard';
import CardFilter from '../../components/core/card-filter/CardFilter';

const useStyles = createStyles(() => ({
  banner: {
    maxWidth: 320,
    height: 'initial',
    margin: '0 auto',
  },
}));

interface OrganizationPageProps extends PageProps {
  permissions: {
    edit: boolean;
  };
}

const OrganizationPage: FC<OrganizationPageProps> = ({ paths, permissions }) => {
  const styles = useStyles();
  const { t } = useTranslation();
  const { url } = useRouteMatch();

  const { user: _user } = useUserContext();
  const user = _user?.user;

  const { organization, organizationId, loading: orgLoading } = useOrganization();
  const currentPaths = useMemo(
    () => (organization ? [...paths, { value: url, name: organization.displayName, real: true }] : paths),
    [paths, organization]
  );
  useUpdateNavigation({ currentPaths });
  const members = organization?.members;

  const { profile, displayName } = organization || {};
  const { avatar, description } = profile || {};

  const { data, loading: orgMembershipLoading } = useMembershipOrganizationQuery({
    variables: {
      input: {
        organizationID: organizationId,
      },
    },
    skip: !organization,
  });
  const { ecoversesHosting = [], challengesLeading = [] } = data?.membershipOrganization || {};

  if (orgLoading || orgMembershipLoading) {
    return <Loading />;
  }

  return (
    <>
      <Section avatar={avatar ? <Image src={avatar} alt={`${displayName} logo`} className={styles.banner} /> : <div />}>
        <SectionHeader
          text={displayName}
          editComponent={
            permissions.edit && (
              <SettingsButton
                color={'primary'}
                to={buildAdminOrganizationUrl(organization?.id || '')}
                tooltip={t('components.settingsButton.tooltip')}
              />
            )
          }
        />
        <SubHeader text={description} />
        <Body>
          <InfoSection organization={organization} />
        </Body>
      </Section>
      <Divider />
      <MembershipSection
        entities={ecoversesHosting}
        icon={<Icon component={Globe} color="primary" size="xl" />}
        cardComponent={HostedEcoverseCard}
        cardHeight={520}
        title={t('pages.organization.ecoverses.title')}
        subtitle={t('pages.organization.ecoverses.subtitle')}
        noDataText={t('pages.organization.ecoverses.no-data')}
      />
      <Divider />
      <MembershipSection
        entities={challengesLeading}
        icon={<Icon component={CompassIcon} color="primary" size="xl" />}
        cardComponent={LeadingChallengeCard}
        title={t('pages.organization.challenges.title')}
        subtitle={t('pages.organization.challenges.subtitle')}
        noDataText={t('pages.organization.challenges.no-data')}
      />
      <Divider />
      <AuthenticationBackdrop show={user != null} blockName={t('common.users')}>
        <Section avatar={<Icon component={PeopleIcon} color="primary" size="xl" />}>
          <SectionHeader text={t('common.users')} />
        </Section>
        {orgLoading && <Loading text="" />}
        {members && (
          <CardFilter data={members as User[]} valueGetter={userValueGetter} tagsValueGetter={userTagsValueGetter}>
            {filteredData => (
              <CardContainer cardHeight={USER_CARD_HEIGHT}>
                {filteredData.map(({ displayName, agent, nameID, profile, city, country }, i) => (
                  /* todo add roleTitle, jobTitle */
                  <UserCard
                    key={i}
                    userAgent={agent as Agent}
                    resourceId={organizationId}
                    avatarSrc={profile?.avatar || ''}
                    displayName={displayName}
                    city={city}
                    country={country}
                    tags={(profile?.tagsets || []).flatMap(x => x.tags)}
                    url={buildUserProfileUrl(nameID)}
                  />
                ))}
              </CardContainer>
            )}
          </CardFilter>
        )}
      </AuthenticationBackdrop>
      <Divider />
    </>
  );
};

export default OrganizationPage;
