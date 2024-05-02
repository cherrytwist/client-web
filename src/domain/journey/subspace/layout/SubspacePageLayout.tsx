import React, {
  Children,
  createContext,
  PropsWithChildren,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import ChildJourneyPageBanner from '../../common/childJourneyPageBanner/ChildJourneyPageBanner';
import JourneyUnauthorizedDialog from '../../common/JourneyUnauthorizedDialog/JourneyUnauthorizedDialog';
import JourneyUnauthorizedDialogContainer from '../../common/JourneyUnauthorizedDialog/JourneyUnauthorizedDialogContainer';
import JourneyBreadcrumbs from '../../common/journeyBreadcrumbs/JourneyBreadcrumbs';
import PageContent from '../../../../core/ui/content/PageContent';
import { JourneyLevel, JourneyPath } from '../../../../main/routing/resolvers/RouteResolver';
import PageContentColumnBase from '../../../../core/ui/content/PageContentColumnBase';
import { useTranslation } from 'react-i18next';
import { KeyboardTab, Menu } from '@mui/icons-material';
import FullWidthButton from '../../../../core/ui/button/FullWidthButton';
import InfoColumn from './InfoColumn';
import TopLevelLayout from '../../../../main/ui/layout/TopLevelLayout';
import { Error404 } from '../../../../core/pages/Errors/Error404';
import FloatingActionButtons from '../../../../core/ui/button/FloatingActionButtons';
import { gutters } from '../../../../core/ui/grid/utils';
import PlatformHelpButton from '../../../../main/ui/helpButton/PlatformHelpButton';
import { NotFoundErrorBoundary } from '../../../../core/notFound/NotFoundErrorBoundary';
import { Box, Drawer, IconButton, Paper, Theme, useMediaQuery } from '@mui/material';
import GridProvider from '../../../../core/ui/grid/GridProvider';
import { GRID_COLUMNS_MOBILE } from '../../../../core/ui/grid/constants';
import SwapColors from '../../../../core/ui/palette/SwapColors';
import PageContentBlockSeamless from '../../../../core/ui/content/PageContentBlockSeamless';
import DialogActionsMenu from './DialogActionsMenu';
import Gutters from '../../../../core/ui/grid/Gutters';
import createLayoutHolder from '../../../../core/ui/layout/layoutHolder/LayoutHolder';
import PoweredBy from '../../../../main/ui/poweredBy/PoweredBy';
import DialogActionButtons from './DialogActionButtons';
import unwrapFragment from '../../../../core/ui/utils/unwrapFragment';
import { SubspaceDialog } from './SubspaceDialog';
import { DialogDefinitionProps, isDialogDef } from './DialogDefinition';
import produce from 'immer';
import WelcomeBlock from './WelcomeBlock';
import { UrlBaseProvider } from '../../../../core/ui/link/UrlBase';
import ButtonWithTooltip from '../../../../core/ui/button/ButtonWithTooltip';
import { theme } from '../../../../core/ui/themes/default/Theme';
import ApplicationButton from '../../../community/application/applicationButton/ApplicationButton';
import ApplicationButtonContainer from '../../../community/application/containers/ApplicationButtonContainer';
import PageContentColumn from '../../../../core/ui/content/PageContentColumn';
import { StorageConfigContextProvider } from '../../../storage/StorageBucket/StorageConfigContext';
import { SpaceReadAccess } from '../../common/authorization/useCanReadSpace';

export interface SubspacePageLayoutProps {
  journeyId: string | undefined;
  spaceReadAccess: SpaceReadAccess;
  journeyPath: JourneyPath;
  journeyUrl?: string | undefined; // TODO make required
  loading?: boolean;
  unauthorizedDialogDisabled?: boolean;
  welcome?: ReactNode;
  actions?: ReactNode;
  profile?: {
    // TODO make required
    displayName: string;
  };
  infoColumnChildren?: ReactNode;
}

const {
  LayoutHolder: InnovationFlowHolder,
  RenderPoint: InnovationFlowRenderPoint,
  createLayout,
} = createLayoutHolder();

export const SubspaceInnovationFlow = createLayout(({ children }: PropsWithChildren<{}>) => {
  return <>{children}</>;
});

/**
 * The rationale for this context is to allow actions to be consumed by individual components,
 * and not rendered in the action list (menu or buttons).
 * Rather that handling a set of rules whether the action should be rendered in the menu or not,
 * we let the child components decide.
 */
interface ActionsProvider {
  consume(action: SubspaceDialog): DialogDefinitionProps | undefined;
  dispose(action: SubspaceDialog): void;
}

const DialogActionsContext = createContext<ActionsProvider>({
  consume: () => undefined,
  dispose: () => {},
});

export const useConsumeAction = (action: SubspaceDialog | undefined | null | false) => {
  const { consume, dispose } = useContext(DialogActionsContext);
  const actionDef = action ? consume(action) : undefined;
  useEffect(() => (action ? () => dispose(action) : undefined), [action]);
  return actionDef;
};

const SubspacePageLayout = ({
  journeyId,
  spaceReadAccess,
  journeyPath,
  journeyUrl,
  loading = false,
  unauthorizedDialogDisabled = false,
  welcome,
  actions,
  profile,
  children,
  infoColumnChildren,
}: PropsWithChildren<SubspacePageLayoutProps>) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const { t } = useTranslation();

  const isMobile = useMediaQuery<Theme>(theme => theme.breakpoints.down('sm'));

  const [isInfoDrawerOpen, setIsInfoDrawerOpen] = useState(false);

  const actionsList = Children.toArray(unwrapFragment(actions));

  // Some actions are handled/consumed by individual components, in that case they aren't rendered in the action list (menu or buttons)
  const [consumedActions, setConsumedActions] = useState<Partial<Record<SubspaceDialog, true>>>({});

  const actionsProvider = useMemo<ActionsProvider>(() => {
    const actionDefinitions = actionsList.filter(isDialogDef);

    const consume = (type: SubspaceDialog) => {
      const actionDef = actionDefinitions.find(action => action.props.dialogType === type)?.props;
      if (!actionDef) {
        return;
      }
      setConsumedActions(consumed =>
        produce(consumed, record => {
          record[type] = true;
        })
      );
      return actionDef;
    };

    const restore = (type: SubspaceDialog) => {
      setConsumedActions(consumed =>
        produce(consumed, record => {
          delete record[type];
        })
      );
    };

    return { consume, dispose: restore };
  }, [actionsList, setConsumedActions]);

  const unconsumedActions = actionsList.filter(action => {
    return !isDialogDef(action) || !consumedActions[action.props.dialogType];
  });

  const hasExtendedApplicationButton = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));

  return (
    <StorageConfigContextProvider locationType="journey" spaceId={journeyId}>
      <NotFoundErrorBoundary
        errorComponent={
          <TopLevelLayout>
            <Error404 />
          </TopLevelLayout>
        }
      >
        <UrlBaseProvider url={journeyUrl}>
          <DialogActionsContext.Provider value={actionsProvider}>
            <InnovationFlowHolder>
              <TopLevelLayout
                breadcrumbs={<JourneyBreadcrumbs journeyPath={journeyPath} loading={loading} />}
                header={<ChildJourneyPageBanner journeyId={journeyId} />}
                floatingActions={
                  <FloatingActionButtons
                    visible
                    floatingActions={<PlatformHelpButton />}
                    bottom={isMobile ? gutters(2) : 0}
                  />
                }
              >
                <PageContent>
                  <InfoColumn collapsed={isExpanded}>
                    {!isExpanded && <WelcomeBlock about={!isMobile}>{welcome}</WelcomeBlock>}
                    {!isExpanded && (
                      <FullWidthButton
                        startIcon={<KeyboardTab />}
                        variant="contained"
                        onClick={() => setIsExpanded(true)}
                        sx={{ '.MuiSvgIcon-root': { transform: 'rotate(180deg)' } }}
                      >
                        {t('buttons.collapse')}
                      </FullWidthButton>
                    )}
                    <DialogActionButtons column={isExpanded}>
                      {unconsumedActions}
                      {isExpanded && (
                        <ButtonWithTooltip
                          tooltip={t('buttons.expand')}
                          tooltipPlacement="right"
                          iconButton
                          onClick={() => setIsExpanded(false)}
                        >
                          <KeyboardTab />
                        </ButtonWithTooltip>
                      )}
                    </DialogActionButtons>
                    {infoColumnChildren}
                  </InfoColumn>
                  <PageContentColumnBase
                    columns={isExpanded ? 12 : 9}
                    flexBasis={0}
                    flexGrow={1}
                    flexShrink={1}
                    minWidth={0}
                  >
                    <ApplicationButtonContainer>
                      {({ applicationButtonProps }, { loading }) => {
                        if (loading || applicationButtonProps.isMember) {
                          return null;
                        }
                        return (
                          <PageContentColumn columns={9}>
                            <ApplicationButton
                              {...applicationButtonProps}
                              loading={loading}
                              component={FullWidthButton}
                              extended={hasExtendedApplicationButton}
                              journeyId={journeyId}
                              journeyLevel={(journeyPath.length - 1) as JourneyLevel}
                            />
                          </PageContentColumn>
                        );
                      }}
                    </ApplicationButtonContainer>

                    {!isMobile && (
                      <Box
                        sx={{
                          position: 'sticky',
                          top: 0,
                          marginTop: gutters(-1),
                          paddingY: gutters(1),
                          background: theme.palette.background.default,
                          width: '100%',
                          zIndex: 1,
                          boxShadow: theme => `0 6px 5px 2px ${theme.palette.background.default}`,
                        }}
                      >
                        <InnovationFlowRenderPoint />
                      </Box>
                    )}
                    {children}
                  </PageContentColumnBase>
                </PageContent>
                {isMobile && (
                  <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1 }} elevation={3} square>
                    <Gutters row padding={1} paddingBottom={0} justifyContent="space-between">
                      <IconButton onClick={() => setIsInfoDrawerOpen(true)}>
                        <Menu />
                      </IconButton>
                      <InnovationFlowRenderPoint />
                      <Box width={gutters(2)} />
                    </Gutters>
                    <PoweredBy compact />
                  </Paper>
                )}
              </TopLevelLayout>
              <JourneyUnauthorizedDialogContainer {...spaceReadAccess} journeyId={journeyId}>
                {({ vision, ...props }) => (
                  <JourneyUnauthorizedDialog
                    subspaceId={journeyId}
                    subspaceName={profile?.displayName}
                    description={vision}
                    disabled={unauthorizedDialogDisabled}
                    journeyLevel={(journeyPath.length - 1) as JourneyLevel}
                    {...props}
                  />
                )}
              </JourneyUnauthorizedDialogContainer>
              {isMobile && (
                <SwapColors>
                  <GridProvider columns={GRID_COLUMNS_MOBILE}>
                    <Drawer
                      open={isInfoDrawerOpen}
                      onClose={() => setIsInfoDrawerOpen(false)}
                      sx={{ '.MuiDrawer-paper': { width: '60vw' } }}
                    >
                      <PageContentBlockSeamless>{welcome}</PageContentBlockSeamless>
                      <DialogActionsMenu onClose={() => setIsInfoDrawerOpen(false)}>
                        {unconsumedActions}
                      </DialogActionsMenu>
                    </Drawer>
                  </GridProvider>
                </SwapColors>
              )}
              {isMobile && <Box height={gutters(3)} />}
            </InnovationFlowHolder>
          </DialogActionsContext.Provider>
        </UrlBaseProvider>
      </NotFoundErrorBoundary>
    </StorageConfigContextProvider>
  );
};

export default SubspacePageLayout;
