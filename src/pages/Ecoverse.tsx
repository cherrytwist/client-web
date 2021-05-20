/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactComponent as CompassIcon } from 'bootstrap-icons/icons/compass.svg';
import { ReactComponent as ErrorIcon } from 'bootstrap-icons/icons/exclamation-octagon.svg';
import { ReactComponent as FileEarmarkIcon } from 'bootstrap-icons/icons/file-earmark.svg';
import React, { FC, useMemo } from 'react';
import { Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useHistory, useRouteMatch } from 'react-router-dom';
import ActivityCard, { ActivityCardItem } from '../components/ActivityPanel';
import CommunitySection from '../components/Community/CommunitySection';
import Button from '../components/core/Button';
import { CardContainer } from '../components/core/Container';
import Divider from '../components/core/Divider';
import Icon from '../components/core/Icon';
import { Image } from '../components/core/Image';
import Section, { Body, Header as SectionHeader, SubHeader } from '../components/core/Section';
import Typography from '../components/core/Typography';
import { ChallengeCard, SwitchCardComponent } from '../components/Ecoverse/Cards';
import AuthenticationBackdrop from '../components/layout/AuthenticationBackdrop';
import { useEcoverseHostReferencesQuery, useProjectsChainHistoryQuery, useProjectsQuery } from '../generated/graphql';
import { useAuthenticate } from '../hooks/useAuthenticate';
import { useUpdateNavigation } from '../hooks/useNavigation';
import { useUserContext } from '../hooks/useUserContext';
import { ChallengesQuery, EcoverseInfoQuery, User } from '../types/graphql-schema';
import { PageProps } from './common';
interface EcoversePageProps extends PageProps {
  ecoverse: EcoverseInfoQuery;
  challenges: {
    data: ChallengesQuery | undefined;
    error: any;
  };

  users: User[] | undefined;
}

const ErrorBlock: FC<{ blockName: string }> = ({ blockName }) => {
  const { t } = useTranslation();
  return (
    <div className={'d-flex align-items-lg-center justify-content-lg-center'}>
      <Icon component={ErrorIcon} size={'xl'} color={'neutralMedium'} />
      <Typography variant={'h5'} color={'neutralMedium'} className={'ml-3'}>
        {t('pages.ecoverse.errorblock.message', { blockName: blockName.toLocaleLowerCase() })}
      </Typography>
    </div>
  );
};

const EcoversePage: FC<EcoversePageProps> = ({
  paths,
  ecoverse,
  challenges: challengesQuery,
  users = [],
}): React.ReactElement => {
  const { t } = useTranslation();
  const { url } = useRouteMatch();
  const history = useHistory();
  const user = useUserContext();
  const { isAuthenticated } = useAuthenticate();

  const { data: _projects } = useProjectsQuery();
  const { data: _projectsNestHistory } = useProjectsChainHistoryQuery();
  const { data: hostData } = useEcoverseHostReferencesQuery();

  const challenges = challengesQuery?.data?.ecoverse?.challenges || [];
  const challengesError = challengesQuery?.error;
  const projects = _projects?.ecoverse?.projects || [];
  const projectsNestHistory = _projectsNestHistory?.ecoverse?.challenges || [];

  useUpdateNavigation({ currentPaths: paths });

  const { name, context = {}, activity } = ecoverse.ecoverse;
  const { tagline, impact, vision, background, references } = context;
  const ecoverseLogo = hostData?.ecoverse?.host?.profile?.references?.find(ref => ref.name === 'logo')?.uri;
  // need to create utils for these bits...

  /**
   * getting out all projects and adding url dependency based on project's parents names
   */
  const projectsWithParentData = useMemo(
    () =>
      projectsNestHistory
        ?.flatMap(c =>
          c?.opportunities?.map(x => ({
            challenge: c.name,
            url: `${paths[paths.length - 1].value}/challenges/${c.textID}/opportunities/${x.textID}`,
            ...x,
          }))
        )
        .flatMap(o =>
          o?.projects?.flatMap(p => ({
            caption: o?.challenge,
            url: `${o?.url}/projects/${p.textID}`,
            ...p,
          }))
        ),
    [_projectsNestHistory]
  );

  /**
   * creating suitable for project card data + 1 mock card at the end
   */
  const ecoverseProjects = useMemo(
    () => [
      ...projects.map(p => {
        const parentsData = projectsWithParentData?.find(ph => ph?.textID === p.textID);

        return {
          title: p?.name || '',
          description: p?.description,
          caption: parentsData?.caption,
          tag: { status: 'positive', text: p?.lifecycle2?.state || '' },
          type: 'display',
          onSelect: () => history.replace(parentsData?.url || ''),
        };
      }),
      {
        title: 'MORE PROJECTS STARTING SOON',
        type: 'more',
      },
    ],
    [projects]
  );

  const more = references?.find(x => x.name === 'website');

  const activitySummary = useMemo(() => {
    const initial = [
      {
        name: t('pages.ecoverse.cards.activity.challenges'),
        digit: Number(activity?.find(x => x.name === 'challenges')?.value) || 0,
        color: 'neutral',
      },
      {
        name: t('pages.ecoverse.cards.activity.opportunities'),
        digit: Number(activity?.find(x => x.name === 'opportunities')?.value) || 0,
        color: 'primary',
      },
      {
        name: t('pages.ecoverse.cards.activity.projects'),
        digit: Number(activity?.find(x => x.name === 'projects')?.value) || 0,
        color: 'positive',
      },
    ] as ActivityCardItem[];
    const withMembers = [
      ...initial,
      {
        name: t('pages.ecoverse.cards.activity.members'),
        digit: Number(activity?.find(x => x.name === 'members')?.value) || 0,
        color: 'neutralMedium',
      },
    ] as ActivityCardItem[];
    return isAuthenticated ? withMembers : initial;
  }, [activity]);

  return (
    <>
      <Section
        avatar={
          ecoverseLogo ? (
            <Image
              src={ecoverseLogo}
              alt={`${name} logo`}
              style={{ maxWidth: 320, height: 'initial', margin: '0 auto' }}
            />
          ) : (
            <div />
          )
        }
        details={<ActivityCard title={'ecoverse activity'} items={activitySummary} />}
      >
        <SectionHeader text={name} />
        <SubHeader text={tagline} />
        <Body text={`${vision}`}>
          {more && <Button text={t('buttons.learn-more')} as={'a'} href={`${more.uri}`} target="_blank" />}
        </Body>
      </Section>
      <Divider />
      <Section avatar={<Icon component={CompassIcon} color="primary" size="xl" />}>
        <SectionHeader text={t('pages.ecoverse.sections.challenges.header')} />
        <SubHeader text={background} />
        <Body text={impact} />
      </Section>
      {challengesError ? (
        <Col xs={12}>
          <ErrorBlock blockName={t('pages.ecoverse.sections.challenges.header')} />
        </Col>
      ) : (
        <CardContainer cardHeight={320} xs={12} md={6} lg={4} xl={3}>
          {challenges.map((challenge, i) => (
            <ChallengeCard
              key={i}
              {...(challenge as any)}
              context={{
                ...challenge.context,
                tag: user.user?.ofChallenge(challenge.id)
                  ? t('pages.ecoverse.cards.tags.you-are-in')
                  : (challenge.context as Record<string, any>)['tag'],
              }}
              url={`${url}/challenges/${challenge.textID}`}
            />
          ))}
        </CardContainer>
      )}

      <Divider />
      <AuthenticationBackdrop blockName={'community'}>
        <CommunitySection
          title={t('pages.ecoverse.sections.community.title')}
          subTitle={t('pages.ecoverse.sections.community.subtitle')}
          users={users}
          body={t('pages.ecoverse.sections.community.body')}
          shuffle={true}
          onExplore={() => history.push('/community')}
        />
      </AuthenticationBackdrop>
      <Divider />
      <AuthenticationBackdrop blockName={t('pages.ecoverse.sections.projects.header')}>
        {ecoverseProjects.length > 0 && (
          <>
            <Section avatar={<Icon component={FileEarmarkIcon} color="primary" size="xl" />}>
              <SectionHeader text={t('pages.ecoverse.sections.projects.header')} tagText={'Work in progress'} />
              <SubHeader text={t('pages.ecoverse.sections.projects.subheader', { ecoverse: name })} />
            </Section>
            {isAuthenticated && (
              <CardContainer cardHeight={380} xs={12} md={6} lg={4} xl={3}>
                {ecoverseProjects.map(({ type, ...rest }, i) => {
                  const Component = SwitchCardComponent({ type });
                  return <Component {...rest} key={i} />;
                })}
              </CardContainer>
            )}
            <Divider />
          </>
        )}
      </AuthenticationBackdrop>
    </>
  );
};

export { EcoversePage as Ecoverse };
