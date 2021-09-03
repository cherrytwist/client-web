import { ReactComponent as FileEarmarkIcon } from 'bootstrap-icons/icons/file-earmark.svg';
import { ReactComponent as GemIcon } from 'bootstrap-icons/icons/gem.svg';
import { ReactComponent as JournalBookmarkIcon } from 'bootstrap-icons/icons/journal-text.svg';
import { ReactComponent as Edit } from 'bootstrap-icons/icons/pencil-square.svg';
import clsx from 'clsx';
import React, { FC, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useHistory, useParams, useRouteMatch } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import ActivityCard from '../components/ActivityPanel/ActivityCard';
import ChallengeCommunitySection from '../components/Challenge/ChallengeCommunitySection';
import OpportunityCard from '../components/Challenge/OpportunityCard';
import ContextEdit from '../components/ContextEdit';
import Button from '../components/core/Button';
import { CardContainer } from '../components/core/CardContainer';
import Divider from '../components/core/Divider';
import Icon from '../components/core/Icon';
import Markdown from '../components/core/Markdown';
import Section, { Body, Header as SectionHeader, SubHeader } from '../components/core/Section';
import Typography from '../components/core/Typography';
import { SwitchCardComponent } from '../components/Ecoverse/Cards';
import BackdropWithMessage from '../components/BackdropWithMessage';
import OrganizationPopUp from '../components/Organizations/OrganizationPopUp';
import { useChallengeActivityQuery, useChallengeLifecycleQuery } from '../hooks/generated/graphql';
import { useAuthenticationContext } from '../hooks';
import { useUpdateNavigation } from '../hooks';
import { createStyles } from '../hooks/useTheme';
import { useUserContext } from '../hooks';
import { SEARCH_PAGE } from '../models/constants';
import { Challenge as ChallengeType, Context, Organisation } from '../models/graphql-schema';
import getActivityCount from '../utils/get-activity-count';
import hexToRGBA from '../utils/hexToRGBA';
import { PageProps } from './common';
import CardFilter from '../components/core/card-filter/CardFilter';
import { ActivityItem } from '../components/ActivityPanel/Activities';

const useOrganizationStyles = createStyles(theme => ({
  organizationWrapper: {
    display: 'flex',
    gap: `${theme.spacing(1)}px`,
    flexWrap: 'wrap',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  column: {
    flexDirection: 'column',
  },
  imgContainer: {
    display: 'flex',
    flex: '0 45%',
    width: '100%',
    margin: '0 auto',
  },
  img: {
    height: 'initial',
    maxWidth: '100%',
    maxHeight: 150,
    margin: '0 auto',
    objectFit: 'contain',
  },
  link: {
    marginTop: `${theme.spacing(2)}px`,
    marginRight: `${theme.spacing(4)}px`,
  },
}));

const OrganisationBanners: FC<{ organizations: Organisation[] }> = ({ organizations }) => {
  const { t } = useTranslation();
  const styles = useOrganizationStyles();
  const [modalId, setModalId] = useState<string | null>(null);

  return (
    <>
      <div className={clsx(styles.organizationWrapper, organizations.length === 2 && styles.column)}>
        {organizations.map((org, index) => {
          if (index > 4) return null;
          return (
            <Tooltip placement="bottom" id={`challenge-${org.id}-tooltip`} title={org.displayName} key={index}>
              <div className={styles.imgContainer} onClick={() => setModalId(org.id)}>
                <img src={org.profile?.avatar} alt={org.displayName} className={styles.img} />
              </div>
            </Tooltip>
          );
        })}
      </div>

      {!!modalId && <OrganizationPopUp id={modalId} onHide={() => setModalId(null)} />}

      {organizations.length > 4 && (
        <Tooltip
          placement="bottom"
          id="challenge-rest-tooltip"
          title={organizations.map(x => x.displayName).join(', ')}
        >
          <Box display={'flex'}>
            <Typography variant="h3">{t('pages.challenge.organizationBanner.load-more')}</Typography>
          </Box>
        </Tooltip>
      )}
    </>
  );
};

interface ChallengePageProps extends PageProps {
  challenge: ChallengeType;
}

const useChallengeStyles = createStyles(theme => ({
  edit: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
  buttonsWrapper: {
    display: 'flex',
    gap: theme.spacing(1),
  },
}));

interface Params {
  challengeId?: string;
  opportunityId?: string;
  ecoverseId?: string;
}

const Challenge: FC<ChallengePageProps> = ({ paths, challenge }): React.ReactElement => {
  const { t } = useTranslation();
  const { url } = useRouteMatch();
  const history = useHistory();
  const styles = useChallengeStyles();
  const { isAuthenticated } = useAuthenticationContext();
  const { user } = useUserContext();
  const { ecoverseId = '' } = useParams<Params>();

  const [isEditOpened, setIsEditOpened] = useState<boolean>(false);

  const opportunityRef = useRef<HTMLDivElement>(null);
  useUpdateNavigation({ currentPaths: paths });
  const { displayName: name, context, opportunities = [], leadOrganisations, id } = challenge;
  const { data: challengeLifecycleQuery } = useChallengeLifecycleQuery({ variables: { ecoverseId, challengeId: id } });
  const { references, background = '', tagline, who = '', visual, impact = '', vision = '' } = context || {};
  const bannerImg = visual?.banner;
  const video = references?.find(x => x.name === 'video');

  const { data: _activity } = useChallengeActivityQuery({ variables: { ecoverseId, challengeId: id } });
  const activity = _activity?.ecoverse?.challenge?.activity || [];

  const projects = useMemo(
    () =>
      opportunities.flatMap(o =>
        o?.projects?.flatMap(p => ({
          caption: o.displayName,
          url: `${url}/opportunities/${o.nameID}/projects/${p.nameID}`,
          ...p,
        }))
      ),
    [opportunities]
  );

  const challengeProjects = useMemo(
    () => [
      ...(projects || []).map(p => ({
        title: p?.displayName || '',
        description: p?.description,
        caption: p?.caption,
        tag: { status: 'positive', text: p?.lifecycle?.state || '' },
        type: 'display',
        onSelect: () => history.replace(p?.url || ''),
      })),
      {
        title: 'MORE PROJECTS STARTING SOON',
        type: 'more',
      },
    ],
    [projects]
  );

  const activitySummary: ActivityItem[] = useMemo(() => {
    return [
      {
        name: t('pages.activity.opportunities'),
        digit: getActivityCount(activity, 'opportunities') || 0,
        color: 'primary',
      },
      {
        name: t('pages.activity.projects'),
        digit: getActivityCount(activity, 'projects') || 0,
        color: 'positive',
      },
      {
        name: t('pages.activity.members'),
        digit: getActivityCount(activity, 'members') || 0,
        color: 'neutralMedium',
      },
    ];
  }, [activity]);

  const challengeRefs = (challenge?.context?.references || []).filter(r => r.uri).slice(0, 3);

  return (
    <>
      <Section
        details={
          <ActivityCard
            title={t('pages.activity.title', { blockName: t('pages.challenge.title') })}
            items={activitySummary}
            lifecycle={challengeLifecycleQuery?.ecoverse.challenge.lifecycle}
            classes={{ padding: theme => `${theme.spacing(4)}px` }}
          />
        }
        classes={{
          background: theme =>
            bannerImg ? `url("${bannerImg}") no-repeat center center / cover` : theme.palette.neutral.main,
          coverBackground: theme => hexToRGBA(theme.palette.neutral.main, 0.4),
        }}
        gutters={{
          root: true,
          content: true,
          details: false,
        }}
      >
        <Body>
          <Box display={'flex'} alignItems={'center'} flexGrow={1}>
            <SectionHeader
              text={name}
              className="flex-grow-1"
              classes={{ color: theme => theme.palette.neutralLight.main }}
            />
            {user?.isAdmin && (
              <>
                <Tooltip
                  placement={'bottom'}
                  id={'Edit challenge context'}
                  title={t('pages.challenge.sections.header.buttons.edit.tooltip') || ''}
                >
                  <Edit
                    color={'white'}
                    width={20}
                    height={20}
                    className={styles.edit}
                    onClick={() => setIsEditOpened(true)}
                  />
                </Tooltip>
                <ContextEdit
                  variant={'challenge'}
                  show={isEditOpened}
                  onHide={() => setIsEditOpened(false)}
                  data={challenge.context as Context}
                  id={id}
                />
              </>
            )}
          </Box>

          <Grid container spacing={1}>
            <Grid item>
              <Button
                inset
                variant="semiTransparent"
                text={t('common.opportunities')}
                onClick={() => opportunityRef.current?.scrollIntoView({ behavior: 'smooth' })}
              />
            </Grid>
            {challengeRefs?.map((l, i) => (
              <Grid item key={i}>
                <Button as="a" inset variant="semiTransparent" text={l.name} href={l.uri} target="_blank" />
              </Grid>
            ))}
          </Grid>
        </Body>
      </Section>
      <Section
        avatar={<Icon component={JournalBookmarkIcon} color="primary" size="xl" />}
        details={<OrganisationBanners organizations={leadOrganisations} />}
      >
        <SectionHeader text="Challenge details" />
        <SubHeader text={tagline} />
        <Body>
          <Markdown children={vision} />
          <div className={styles.buttonsWrapper}>
            {video && <Button text={t('buttons.see-more')} as={'a'} href={video.uri} target="_blank" />}
            {user?.ofChallenge(challenge?.id) ? (
              <></>
            ) : (
              <Button text={t('buttons.apply')} as={Link} to={`${url}/apply`} />
            )}
          </div>
        </Body>
      </Section>
      <Divider />
      <div ref={opportunityRef} />
      <Section avatar={<Icon component={GemIcon} color="primary" size="xl" />}>
        <SectionHeader text={t('pages.challenge.sections.opportunities.header')} />
        <SubHeader text={t('pages.challenge.sections.opportunities.subheader')}>
          <Markdown children={background} />
        </SubHeader>
        <Body>
          <Markdown children={impact} />
        </Body>
        {!opportunities ||
          (opportunities.length === 0 && <Body text={t('pages.challenge.sections.opportunities.body-missing')}></Body>)}
      </Section>
      <CardFilter data={opportunities}>
        {filteredData => (
          <CardContainer>
            {filteredData.map((opp, i) => (
              <OpportunityCard
                key={i}
                displayName={opp.displayName}
                activity={opp.activity || []}
                url={`${url}/opportunities/${opp.nameID}`}
                lifecycle={{ state: opp?.lifecycle?.state || '' }}
                context={{
                  tagline: opp?.context?.tagline || '',
                  visual: { background: opp?.context?.visual?.background || '' },
                }}
                tags={opp?.tagset?.tags || []}
              />
            ))}
          </CardContainer>
        )}
      </CardFilter>
      <Divider />
      <BackdropWithMessage
        message={t('components.backdrop.authentication', {
          blockName: t('pages.ecoverse.sections.community.header').toLocaleLowerCase(),
        })}
        show={!!user}
      >
        <ChallengeCommunitySection
          challengeId={challenge.id}
          ecoverseId={ecoverseId}
          title={t('pages.challenge.sections.community.header')}
          subTitle={t('pages.challenge.sections.community.subheader')}
          body={who}
          onExplore={() => history.push(SEARCH_PAGE)}
        />
      </BackdropWithMessage>
      <Divider />
      <BackdropWithMessage
        message={t('components.backdrop.authentication', { blockName: t('pages.ecoverse.sections.projects.header') })}
        show={!!user}
      >
        <Section avatar={<Icon component={FileEarmarkIcon} color="primary" size="xl" />}>
          <SectionHeader
            text={t('pages.challenge.sections.projects.header.text')}
            tagText={t('pages.challenge.sections.projects.header.tag')}
          />
          <SubHeader text={t('pages.challenge.sections.projects.subheader')} />
          <Body text={t('pages.challenge.sections.projects.body')} />
        </Section>
        {isAuthenticated && (
          <CardContainer cardHeight={380} xs={12} md={6} lg={4} xl={3}>
            {challengeProjects.map(({ type, ...rest }, i) => {
              const Component = SwitchCardComponent({ type });
              return <Component {...rest} key={i} />;
            })}
          </CardContainer>
        )}
      </BackdropWithMessage>
      <Divider />
    </>
  );
};

export { Challenge };
