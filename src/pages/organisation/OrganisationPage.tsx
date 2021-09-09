import { ReactComponent as Globe } from 'bootstrap-icons/icons/globe2.svg';
import { ReactComponent as CompassIcon } from 'bootstrap-icons/icons/compass.svg';
import CardTravelOutlinedIcon from '@material-ui/icons/CardTravelOutlined';
import SupervisorAccountOutlinedIcon from '@material-ui/icons/SupervisorAccountOutlined';
import PeopleOutlineOutlinedIcon from '@material-ui/icons/PeopleOutlineOutlined';
import React, { FC, useMemo } from 'react';
import { useRouteMatch } from 'react-router';
import { useTranslation } from 'react-i18next';
import { PageProps } from '../common';
import { createStyles, useOrganisation, useUpdateNavigation } from '../../hooks';
import Section, { Body, Header as SectionHeader, SubHeader } from '../../components/core/Section';
import { Image } from '../../components/core/Image';
import Divider from '../../components/core/Divider';
import { useMembershipOrganisationQuery } from '../../hooks/generated/graphql';
import { Loading } from '../../components/core';
import Icon from '../../components/core/Icon';
import MembershipSection from './MembershipSection';
import { AuthorizationCredential } from '../../models/graphql-schema';
import InfoSection from './InfoSection';
import HostedEcoverseCard from './HostedEcoverseCard';
import LeadingChallengeCard from './LeadingChallengeCard';
import UserSection from './UserSection';

const useStyles = createStyles(() => ({
  banner: {
    maxWidth: 320,
    height: 'initial',
    margin: '0 auto',
  },
}));

const OrganisationPage: FC<PageProps> = ({ paths }) => {
  const styles = useStyles();
  const { t } = useTranslation();
  const { url } = useRouteMatch();
  const { organisation, organisationId, loading: orgLoading } = useOrganisation();
  const currentPaths = useMemo(
    () => (organisation ? [...paths, { value: url, name: organisation.displayName, real: true }] : paths),
    [paths, organisation]
  );
  useUpdateNavigation({ currentPaths });

  const { profile, displayName } = organisation || {};
  const { avatar, description } = profile || {};

  const { data, loading: orgMembershipLoading } = useMembershipOrganisationQuery({
    variables: {
      input: {
        organisationID: organisationId,
      },
    },
    skip: !organisation,
  });
  const { ecoversesHosting = [], challengesLeading = [] } = data?.membershipOrganisation || {};

  if (orgLoading || orgMembershipLoading) {
    return <Loading />;
  }

  return (
    <>
      <Section avatar={avatar ? <Image src={avatar} alt={`${displayName} logo`} className={styles.banner} /> : <div />}>
        <SectionHeader text={displayName} />
        <SubHeader text={description} />
        <Body>
          <InfoSection organisation={organisation} />
        </Body>
      </Section>
      <Divider />
      <MembershipSection
        entities={ecoversesHosting}
        icon={<Icon component={Globe} color="primary" size="xl" />}
        cardComponent={HostedEcoverseCard}
        cardHeight={520}
        title={t('pages.organisation.ecoverses.title')}
        subtitle={t('pages.organisation.ecoverses.subtitle')}
        noDataText={t('pages.organisation.ecoverses.no-data')}
      />
      <Divider />
      <MembershipSection
        entities={challengesLeading}
        icon={<Icon component={CompassIcon} color="primary" size="xl" />}
        cardComponent={LeadingChallengeCard}
        title={t('pages.organisation.challenges.title')}
        subtitle={t('pages.organisation.challenges.subtitle')}
        noDataText={t('pages.organisation.challenges.no-data')}
      />
      <Divider />
      <UserSection
        organisationId={organisation?.id}
        credential={AuthorizationCredential.OrganisationOwner}
        icon={<CardTravelOutlinedIcon color={'primary'} fontSize={'large'} />}
        title={t('pages.organisation.users.owners.title')}
        subtitle={t('pages.organisation.users.owners.subtitle')}
        noDataText={t('pages.organisation.users.owners.no-data')}
      />
      <Divider />
      <UserSection
        organisationId={organisation?.id}
        credential={AuthorizationCredential.OrganisationAdmin}
        icon={<SupervisorAccountOutlinedIcon color={'primary'} fontSize={'large'} />}
        title={t('pages.organisation.users.admins.title')}
        subtitle={t('pages.organisation.users.admins.subtitle')}
        noDataText={t('pages.organisation.users.admins.no-data')}
      />
      <Divider />
      <UserSection
        organisationId={organisation?.id}
        credential={AuthorizationCredential.OrganisationMember}
        icon={<PeopleOutlineOutlinedIcon color={'primary'} fontSize={'large'} />}
        title={t('pages.organisation.users.members.title')}
        subtitle={t('pages.organisation.users.members.subtitle')}
        noDataText={t('pages.organisation.users.members.no-data')}
      />
      <Divider />
    </>
  );
};

export default OrganisationPage;
