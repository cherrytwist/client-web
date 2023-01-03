import React, { PropsWithChildren, ReactNode, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Box, IconButton, Menu, MenuItem, styled } from '@mui/material';
import {
  Authorization,
  AuthorizationPrivilege,
  CalloutState,
  CalloutType,
  CalloutVisibility,
} from '../../../core/apollo/generated/graphql-schema';
import WrapperMarkdown from '../../../common/components/core/WrapperMarkdown';
import Heading from '../../shared/components/Heading';
import { CalloutSummary } from '../callout/CalloutSummary';
import CalloutVisibilityChangeDialog from '../callout/edit/visibility-change-dialog/CalloutVisibilityChangeDialog';
import CalloutEditDialog from '../callout/edit/edit-dialog/CalloutEditDialog';
import { CalloutEditType } from '../callout/edit/CalloutEditType';
import ShareButton from '../../shared/components/ShareDialog/ShareButton';
import { CalloutCardTemplate } from '../callout/creation-dialog/CalloutCreationDialog';
import CalloutBlockMarginal from '../callout/Contribute/CalloutBlockMarginal';
import { gutters } from '../../../core/ui/grid/utils';
import { BlockTitle, Caption } from '../../../core/ui/typography';
import { CalloutLayoutEvents } from '../callout/Types';
import Gutters from '../../../core/ui/grid/Gutters';
import { useAspectTemplatesFromHubLazyQuery } from '../../../core/apollo/generated/apollo-hooks';
import { useHub } from '../../challenge/hub/HubContext/useHub';

export interface CalloutLayoutProps extends CalloutLayoutEvents {
  callout: {
    id: string;
    displayName: string;
    description: string;
    type: CalloutType;
    state: CalloutState;
    draft: boolean;
    editable?: boolean;
    authorization?: Authorization;
    url: string;
    cardTemplate?: CalloutCardTemplate;
    authorName?: string;
    authorAvatarUri?: string;
    publishedAt?: string;
  };
  calloutNames: string[];
  contributionsCount: number;
  actions?: ReactNode;
}

const CalloutActionsBar = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexFlow: 'row-reverse',
  marginBottom: gutters(-0.5)(theme),
  paddingLeft: gutters(0.25)(theme),
  paddingRight: gutters(0.5)(theme),
}));

const CalloutDetailsBar = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  height: gutters(2)(theme),
  alignItems: 'end',
  flexShrink: 0,
}));

const CalloutDetails = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
}));

const CalloutMisc = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexGrow: 1,
  justifyContent: 'space-between',
  paddingLeft: gutters()(theme),
}));

const CalloutDate = ({ date }: { date: Date | string }) => <Caption>{date}</Caption>;

const CalloutLayout = ({
  callout,
  actions,
  children,
  onVisibilityChange,
  onCalloutEdit,
  onCalloutDelete,
  calloutNames,
  contributionsCount,
}: PropsWithChildren<CalloutLayoutProps>) => {
  const { t } = useTranslation();

  const { hubNameId } = useHub();
  const [fetchCardTemplates, { data: cardTemplatesData }] = useAspectTemplatesFromHubLazyQuery();
  const getCardTemplates = useCallback(() => {
    fetchCardTemplates({ variables: { hubId: hubNameId } });
  }, [hubNameId, fetchCardTemplates]);

  const templates = cardTemplatesData?.hub.templates?.aspectTemplates ?? [];

  const [settingsAnchorEl, setSettingsAnchorEl] = useState<null | HTMLElement>(null);
  const settingsOpened = Boolean(settingsAnchorEl);
  const handleSettingsOpened = (event: React.MouseEvent<HTMLElement>) => setSettingsAnchorEl(event.currentTarget);
  const handleSettingsClose = () => setSettingsAnchorEl(null);

  const [visDialogOpen, setVisDialogOpen] = useState(false);
  const handleVisDialogOpen = () => {
    setVisDialogOpen(true);
    setSettingsAnchorEl(null);
  };
  const handleVisDialogClose = () => setVisDialogOpen(false);
  const visDialogTitle = useMemo(
    () => `${t(`buttons.${callout.draft ? '' : 'un'}publish` as const)} ${t('common.callout')}`,
    [callout.draft, t]
  );
  const handleVisibilityChange = async (visibility: CalloutVisibility) => {
    await onVisibilityChange(callout.id, visibility);
    setVisDialogOpen(false);
  };
  const [editDialogOpened, setEditDialogOpened] = useState(false);
  const handleEditDialogOpen = () => {
    getCardTemplates();
    setSettingsAnchorEl(null);
    setEditDialogOpened(true);
  };
  const handleEditDialogClosed = () => setEditDialogOpened(false);
  const handleCalloutEdit = useCallback(
    async (newCallout: CalloutEditType) => {
      await onCalloutEdit(newCallout);
      setEditDialogOpened(false);
    },
    [onCalloutEdit, setEditDialogOpened]
  );

  const calloutNotOpenStateName = useMemo(() => {
    const state = callout?.state;

    if (!state || state === CalloutState.Open) {
      return undefined;
    }

    return t(`common.enums.callout-state.${state}` as const);
  }, [callout?.state, t]);

  const dontShow = callout.draft && !callout?.authorization?.myPrivileges?.includes(AuthorizationPrivilege.Update);

  if (dontShow) {
    return null;
  }

  const hasCalloutDetails = callout.authorName && callout.publishedAt;

  return (
    <>
      {callout.draft && (
        <Box padding={1.5} sx={{ color: 'neutralLight.main', backgroundColor: 'primary.main' }}>
          <Heading textAlign="center">{t('callout.draftNotice')}</Heading>
        </Box>
      )}
      <CalloutDetailsBar>
        {hasCalloutDetails && (
          <CalloutMisc>
            <CalloutDetails>
              <Box component="img" src={callout.authorAvatarUri} sx={{ background: 'grey', height: 20, width: 20 }} />
              <Caption>
                {`${callout.authorName} • ${t('callout.contributions', {
                  count: contributionsCount,
                })}`}
              </Caption>
            </CalloutDetails>
            <CalloutDate date={callout.publishedAt!} />
          </CalloutMisc>
        )}
        {!hasCalloutDetails && (
          <BlockTitle paddingX={gutters()} noWrap>
            {callout.displayName}
          </BlockTitle>
        )}
        <CalloutActionsBar>
          {actions}
          {callout.editable && (
            <IconButton
              id="callout-settings-button"
              aria-haspopup="true"
              aria-controls={settingsOpened ? 'callout-settings-menu' : undefined}
              aria-expanded={settingsOpened ? 'true' : undefined}
              onClick={handleSettingsOpened}
            >
              <SettingsOutlinedIcon />
            </IconButton>
          )}
          <ShareButton url={callout.url} entityTypeName="callout" />
        </CalloutActionsBar>
      </CalloutDetailsBar>
      <Gutters minHeight={0}>
        {hasCalloutDetails && <BlockTitle>{callout.displayName}</BlockTitle>}
        <WrapperMarkdown>{callout.description ?? ''}</WrapperMarkdown>
        {children}
      </Gutters>
      {calloutNotOpenStateName && (
        <CalloutBlockMarginal variant="footer">{calloutNotOpenStateName}</CalloutBlockMarginal>
      )}
      <Menu
        id="callout-settings-menu"
        aria-labelledby="callout-settings-button"
        anchorEl={settingsAnchorEl}
        open={settingsOpened}
        onClose={handleSettingsClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={handleEditDialogOpen}>{t('buttons.edit').toLocaleUpperCase()}</MenuItem>
        <MenuItem onClick={handleVisDialogOpen}>
          {t(`buttons.${callout.draft ? '' : 'un'}publish` as const).toLocaleUpperCase()}
        </MenuItem>
      </Menu>
      <CalloutVisibilityChangeDialog
        open={visDialogOpen}
        onClose={handleVisDialogClose}
        title={visDialogTitle}
        draft={callout.draft}
        onVisibilityChanged={handleVisibilityChange}
      >
        <CalloutSummary callout={callout} />
      </CalloutVisibilityChangeDialog>
      <CalloutEditDialog
        open={editDialogOpened}
        onClose={handleEditDialogClosed}
        callout={callout}
        title={`${t('buttons.edit')} ${t('common.callout')}`}
        onCalloutEdit={handleCalloutEdit}
        onDelete={onCalloutDelete}
        calloutNames={calloutNames}
        cardTemplates={templates}
      />
    </>
  );
};

export default CalloutLayout;
