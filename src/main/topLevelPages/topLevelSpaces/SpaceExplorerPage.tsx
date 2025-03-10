import { useTranslation } from 'react-i18next';
import SpaceExplorerContainer from './SpaceExplorerContainer';
import { SpaceExplorerView } from './SpaceExplorerView';
import TopLevelPageLayout from '@/main/ui/layout/topLevelPageLayout/TopLevelPageLayout';
import useInnovationHubOutsideRibbon from '@/domain/innovationHub/InnovationHubOutsideRibbon/useInnovationHubOutsideRibbon';
import { SpaceIcon } from '@/domain/journey/space/icon/SpaceIcon';
import BreadcrumbsItem from '@/core/ui/navigation/BreadcrumbsItem';
import TopLevelPageBreadcrumbs from '../topLevelPageBreadcrumbs/TopLevelPageBreadcrumbs';

const SpaceExplorerPage = () => {
  const { t } = useTranslation();

  const ribbon = useInnovationHubOutsideRibbon({ label: 'innovationHub.outsideOfSpace.subspaces' });

  return (
    <TopLevelPageLayout
      iconComponent={SpaceIcon}
      title={t('pages.exploreSpaces.fullName')}
      subtitle={t('pages.exploreSpaces.subtitle')}
      ribbon={ribbon}
      breadcrumbs={
        <TopLevelPageBreadcrumbs>
          <BreadcrumbsItem iconComponent={SpaceIcon}>{t('pages.exploreSpaces.shortName')}</BreadcrumbsItem>
        </TopLevelPageBreadcrumbs>
      }
    >
      <SpaceExplorerContainer>
        {provided => {
          return <SpaceExplorerView {...provided} />;
        }}
      </SpaceExplorerContainer>
    </TopLevelPageLayout>
  );
};

export default SpaceExplorerPage;
