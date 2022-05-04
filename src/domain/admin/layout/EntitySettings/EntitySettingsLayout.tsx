import React, { FC, useCallback } from 'react';
import { SettingsSection } from './constants';
import PageTabs, { TabDefinition } from '../../../../components/core/PageTabs/PageTabs';
import AdminLayoutEntityTitle from '../AdminLayoutEntityTitle';
import { useTranslation } from 'react-i18next';
import { EntityLinkComponentProps } from '../../../../components/Admin/EntityLinkComponent';
import PageLayout from '../../../shared/layout/PageLayout';

type EntityTypeName = 'hub' | 'challenge' | 'opportunity' | 'organization';

type EntitySettingsLayoutProps = EntityLinkComponentProps & {
  entityTypeName: EntityTypeName;
  tabs: TabDefinition<SettingsSection>[];
  currentTab: SettingsSection;
  tabRoutePrefix?: string;
};

const EntitySettingsLayout: FC<EntitySettingsLayoutProps> = ({
  entityTypeName,
  tabs,
  currentTab,
  tabRoutePrefix = '../',
  children,
  ...entityTitleProps
}) => {
  const { t } = useTranslation();

  const getTabLabel = useCallback((section: SettingsSection) => t(`common.${section}` as const), [t]);

  return (
    <>
      <AdminLayoutEntityTitle {...entityTitleProps} />
      <PageTabs
        tabs={tabs}
        currentTab={currentTab}
        aria-label={`${entityTypeName} Settings tabs`}
        routePrefix={tabRoutePrefix}
        getTabLabel={getTabLabel}
      />
      <PageLayout currentSection={currentTab} entityTypeName={entityTypeName} tabDescriptionNs="pages.admin">
        {children}
      </PageLayout>
    </>
  );
};

export default EntitySettingsLayout;
