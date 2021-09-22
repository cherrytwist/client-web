import React, { FC } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useEcoverseApplicationQuery, useEcoverseApplicationTemplateQuery } from '../../hooks/generated/graphql';
import { PageProps } from '../../pages';
import ApplyRoute from './ApplyRoute';
import { useUrlParams } from '../../hooks';

interface Props extends PageProps {}

export const EcoverseApplyRoute: FC<Props> = ({ paths }) => {
  const { path } = useRouteMatch();
  const { ecoverseNameId } = useUrlParams();
  const backUrl = `/${ecoverseNameId}`;

  const {
    data: ecoverseInfoData,
    loading: isCommunityLoading,
    error: communityError,
  } = useEcoverseApplicationQuery({
    variables: {
      ecoverseId: ecoverseNameId,
    },
    errorPolicy: 'all',
  });
  const communityId = ecoverseInfoData?.ecoverse.community?.id || '';
  const ecoverseName = ecoverseInfoData?.ecoverse.displayName || '';
  const avatar = ecoverseInfoData?.ecoverse.context?.visual?.avatar || '';
  const tagline = ecoverseInfoData?.ecoverse.context?.tagline || '';

  const {
    data: templateData,
    loading: isTemplateLoading,
    error: templateError,
  } = useEcoverseApplicationTemplateQuery();
  /* todo: get applications by ecoverse and application name */
  const questions = templateData?.configuration.template.ecoverses[0].applications?.[0].questions || [];

  return (
    <ApplyRoute
      loading={isCommunityLoading || isTemplateLoading}
      error={!!(communityError || templateError)}
      paths={paths}
      path={path}
      communityId={communityId}
      communityName={ecoverseName}
      tagline={tagline}
      avatar={avatar}
      questions={questions}
      backUrl={backUrl}
      type={'ecoverse'}
    />
  );
};
