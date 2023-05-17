import {
  DataGrid,
  GridColDef,
  GridFilterModel,
  GridLinkOperator,
  GridRenderCellParams,
  GridValueGetterParams,
} from '@mui/x-data-grid';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import PageContentBlock from '../../../../../core/ui/content/PageContentBlock';
import { SettingsSection } from '../../layout/EntitySettingsLayout/constants';
import { SettingsPageProps } from '../../layout/EntitySettingsLayout/types';
import HubSettingsLayout from '../HubSettingsLayout';
import { Box, IconButton, LinearProgress, Link, Skeleton, TextField, styled } from '@mui/material';
import { gutters } from '../../../../../core/ui/grid/utils';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useDeleteDocumentMutation, useHubStorageAdminQuery } from '../../../../../core/apollo/generated/apollo-hooks';
import { AuthorizationPrivilege, DocumentDataFragment } from '../../../../../core/apollo/generated/graphql-schema';
import { computeStorageUsage, formatFileSize } from '../../../../../core/utils/Storage';
import RouterLink from '../../../../../core/ui/link/RouterLink';
import { buildDocumentUrl, buildUserProfileUrl } from '../../../../../common/utils/urlBuilders';
import ConfirmationDialog from '../../../../../core/ui/dialogs/ConfirmationDialog';
import { Caption } from '../../../../../core/ui/typography';
import GridItem from '../../../../../core/ui/grid/GridItem';
import GridProvider from '../../../../../core/ui/grid/GridProvider';

//TODOs:
// - this thing under this comment, MAX_STORAGE_CAPACITY maybe should come from the server
// - uploaded date doesn't come from the server
// - uploaded location (parent journey) challenge, opp, is not comming from the server
// - Link to contact Alkemio for increased storage capacity
// - Grid is not fully working

// TODO: Read this from somewhere else
const MAX_STORAGE_CAPACITY = 104857600; // 100MB;

interface HubStorageAdminPageProps extends SettingsPageProps {
  hubId: string | undefined;
}

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  '.MuiDataGrid-columnHeaders': {
    color: theme.palette.primary.contrastText,
    background: theme.palette.primary.main,
    fontWeight: 'bold',
    '.MuiIconButton-root': {
      color: theme.palette.primary.contrastText,
    },
  },
  '.MuiDataGrid-row:nth-child(odd)': {
    background: theme.palette.background.default,
  },
  '.MuiDataGrid-row:nth-child(even)': {
    background: theme.palette.background.paper,
  },
  '.MuiDataGrid-columnSeparator': {
    color: 'transparent',
  },
}));

const EmptyFilter = { items: [], linkOperator: GridLinkOperator.Or };

const HubStorageAdminPage: FC<HubStorageAdminPageProps> = ({ hubId, routePrefix = '../' }) => {
  const { t } = useTranslation();

  const [filterString, setFilterString] = useState('');
  const [filterModel, setFilterModel] = useState<GridFilterModel>(EmptyFilter);
  const handleTopFilterChange = (terms: string) => {
    setFilterString(terms);
    if (terms) {
      setFilterModel({
        items: [
          {
            id: 1,
            columnField: 'displayName',
            operatorValue: 'contains',
            value: terms,
          },
        ],
        linkOperator: GridLinkOperator.And,
      });
    } else {
      setFilterModel(EmptyFilter);
    }
  };

  const [deletingDocument, setDeletingDocument] = useState<DocumentDataFragment>();
  const [deleteDocument, { loading: isDeleting }] = useDeleteDocumentMutation();
  const handleDeleteDocument = async () => {
    if (!deletingDocument) {
      return;
    }
    await deleteDocument({
      variables: { documentId: deletingDocument.id },
    });
    await refetchDocuments();
    setDeletingDocument(undefined);
  };

  const {
    data,
    loading,
    refetch: refetchDocuments,
  } = useHubStorageAdminQuery({
    variables: {
      hubId: hubId!,
    },
    skip: !hubId,
  });
  const rows = data?.hub.storageBucket?.documents;

  const columns: GridColDef[] = [
    {
      field: 'displayName',
      headerName: t('pages.admin.generic.sections.storage.grid.title'),
      width: 400,
      renderCell: ({ row }: GridRenderCellParams<string, DocumentDataFragment>) => (
        <Link href={buildDocumentUrl(row.id)} target="_blank">
          {row.displayName}
        </Link>
      ),
    },
    {
      field: 'mimeType',
      headerName: t('pages.admin.generic.sections.storage.grid.mimeType'),
      width: 120,
      renderCell: ({ row }: GridRenderCellParams<string, DocumentDataFragment>) => row.mimeType,
    },
    {
      field: 'size',
      headerName: t('pages.admin.generic.sections.storage.grid.size'),
      type: 'number',
      width: 120,
      renderCell: ({ row }: GridRenderCellParams<string, DocumentDataFragment>) => formatFileSize(row.size),
    },
    {
      field: 'createdBy',
      headerName: t('pages.admin.generic.sections.storage.grid.uploadedBy'),
      width: 150,
      renderCell: ({ row }: GridRenderCellParams<string, DocumentDataFragment>) =>
        row.createdBy ? (
          <RouterLink to={buildUserProfileUrl(row.createdBy.nameID)}>{row.createdBy.profile.displayName}</RouterLink>
        ) : undefined,
      valueGetter: ({ row }: GridValueGetterParams<string, DocumentDataFragment>) => row.createdBy?.profile.displayName,
    },
    // TODO: Pending....
    { field: 'uploadedAt', headerName: t('pages.admin.generic.sections.storage.grid.uploadedAt'), width: 150 },
    {
      field: 'location',
      headerName: t('pages.admin.generic.sections.storage.grid.location'),
      width: 150,
      renderCell: (_params: GridRenderCellParams<string, DocumentDataFragment>) => <></>,
      /*row.parentJourney ? (
          <RouterLink to={buildUserProfileUrl(row.createdBy.nameID)}>{row.createdBy.profile.displayName}</RouterLink>
        ) : undefined,*/
    },
    {
      field: 'viewFile',
      width: 30,
      headerName: '',
      sortable: false,
      filterable: false,
      hideable: false,
      disableColumnMenu: true,
      renderCell: ({ row }: GridRenderCellParams<string, DocumentDataFragment>) => (
        <IconButton component={Link} href={buildDocumentUrl(row.id)} target="_blank">
          <VisibilityOutlinedIcon color="primary" />
        </IconButton>
      ),
    },
    {
      field: 'deleteFile',
      width: 30,
      headerName: '',
      sortable: false,
      filterable: false,
      hideable: false,
      disableColumnMenu: true,
      renderCell: ({ row }: GridRenderCellParams<string, DocumentDataFragment>) =>
        row.authorization?.myPrivileges?.includes(AuthorizationPrivilege.Delete) ? (
          <IconButton onClick={() => setDeletingDocument(row)}>
            <DeleteOutlineIcon color="error" />
          </IconButton>
        ) : undefined,
    },
  ];

  const percentUsed = computeStorageUsage(data?.hub.storageBucket?.size, MAX_STORAGE_CAPACITY);
  return (
    <HubSettingsLayout currentTab={SettingsSection.Storage} tabRoutePrefix={routePrefix}>
      <PageContentBlock>
        <GridProvider columns={12}>
          <GridItem columns={5}>
            <TextField
              value={filterString}
              onChange={event => handleTopFilterChange(event.target.value)}
              label={t('common.search')}
              placeholder={t('common.search')}
            />
          </GridItem>
          <GridItem columns={5}>
            <Box>
              <LinearProgress variant="determinate" value={percentUsed} />
              <Caption>
                {t('pages.admin.generic.sections.storage.capacity', {
                  entity: t('common.hub'),
                  used: `${percentUsed}%`,
                  capacity: formatFileSize(MAX_STORAGE_CAPACITY),
                })}
              </Caption>
              <Caption component={RouterLink} to="// TODO">
                {t('pages.admin.generic.sections.storage.contact')}
              </Caption>
            </Box>
          </GridItem>
        </GridProvider>
        <Box height={gutters(20)}>
          {loading ? (
            <Skeleton />
          ) : (
            <StyledDataGrid
              isRowSelectable={() => false}
              rows={rows ?? []}
              columns={columns}
              filterModel={filterModel}
              onFilterModelChange={setFilterModel}
              initialState={{
                pagination: {
                  page: 0,
                  pageSize: 5,
                },
              }}
              pageSize={5}
            />
          )}
        </Box>
      </PageContentBlock>
      <ConfirmationDialog
        actions={{
          onConfirm: handleDeleteDocument,
          onCancel: () => setDeletingDocument(undefined),
        }}
        options={{
          show: Boolean(deletingDocument),
        }}
        entities={{
          titleId: 'pages.admin.generic.sections.storage.delete.title',
          content: t('pages.admin.generic.sections.storage.delete.content', {
            fileName: deletingDocument?.displayName,
          }),
          confirmButtonTextId: 'buttons.delete',
        }}
        state={{
          isLoading: isDeleting,
        }}
      />
    </HubSettingsLayout>
  );
};

export default HubStorageAdminPage;
