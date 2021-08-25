import React, { useMemo } from 'react';
import Grid from '@material-ui/core/Grid';
import { CardContainer } from '../../components/core/CardContainer';
import Loading from '../../components/core/Loading/Loading';
import EcoverseCard from '../../components/Ecoverse/EcoverseCard';
import ErrorBlock from '../../components/core/ErrorBlock';
import { useEcoversesContext, useUserContext } from '../../hooks';
import { useUpdateNavigation } from '../../hooks';
import { useTranslation } from 'react-i18next';

const EcoversesSection = () => {
  const { t } = useTranslation();
  const { user } = useUserContext();
  const { ecoverses, loading, error } = useEcoversesContext();

  const currentPaths = useMemo(() => [], []);
  useUpdateNavigation({ currentPaths });

  return (
    <>
      {loading ? (
        <Loading text={t('loading.message', { blockName: t('common.ecoverses') })} />
      ) : error ? (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ErrorBlock blockName={t('common.ecoverse')} />
          </Grid>
        </Grid>
      ) : (
        <CardContainer>
          {ecoverses.map((ecoverse, i) => {
            const anonymousReadAccess = ecoverse?.authorization?.anonymousReadAccess;
            return (
              <EcoverseCard
                key={i}
                id={ecoverse.id}
                displayName={ecoverse.displayName}
                activity={ecoverse?.activity || []}
                context={{
                  tagline: ecoverse?.context?.tagline || '',
                  visual: {
                    background: ecoverse?.context?.visual?.background || '',
                  },
                }}
                authorization={{
                  anonymousReadAccess: anonymousReadAccess != null ? anonymousReadAccess : true,
                }}
                isMember={user?.ofEcoverse(ecoverse.id) || false}
                tags={ecoverse?.tagset?.tags || []}
                url={`/${ecoverse.nameID}`}
              />
            );
          })}
        </CardContainer>
      )}
    </>
  );
};

export default EcoversesSection;
