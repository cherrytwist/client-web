import { Box, Button, IconButton, Link, TextField } from '@mui/material';
import {
  GridColDef,
  GridFilterModel,
  GridInitialState,
  GridLinkOperator,
  GridRenderCellParams,
  GridValueGetterParams,
} from '@mui/x-data-grid';
import { useTranslation } from 'react-i18next';
import { FC, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { buildUserProfileUrl } from '../../../../common/utils/urlBuilders';
import { CommunityMemberUserFragment } from '../../../../core/apollo/generated/graphql-schema';
import { gutters } from '../../../../core/ui/grid/utils';
import DataGridSkeleton from '../../../../core/ui/table/DataGridSkeleton';
import DataGridTable from '../../../../core/ui/table/DataGridTable';
import { BlockTitle } from '../../../../core/ui/typography';
import CommunityMemberSettingsDialog from './CommunityMemberSettingsDialog';

export interface CommunityMemberUserFragmentWithRoles extends CommunityMemberUserFragment {
  isMember: boolean;
  isLead: boolean;
  isAdmin: boolean;
}

type RenderParams = GridRenderCellParams<string, CommunityMemberUserFragmentWithRoles>;
type GetterParams = GridValueGetterParams<string, CommunityMemberUserFragmentWithRoles>;

const EmptyFilter = { items: [], linkOperator: GridLinkOperator.Or };

const initialState: GridInitialState = {
  pagination: {
    page: 0,
    pageSize: 10,
  },
  sorting: {
    sortModel: [
      {
        field: 'isLead',
        sort: 'desc',
      },
    ],
  },
};

interface CommunityUsersProps {
  users: CommunityMemberUserFragmentWithRoles[] | undefined;
  onUserLeadChange: (userId, newValue) => Promise<unknown> | void;
  onUserAuthorizationChange: (userId, newValue) => Promise<unknown> | void;
  onRemoveMember: (userId) => Promise<unknown> | void;
  loading?: boolean;
}

const CommunityUsers: FC<CommunityUsersProps> = ({
  users = [],
  onUserLeadChange,
  onUserAuthorizationChange,
  onRemoveMember,
  loading,
}) => {
  const { t } = useTranslation();

  const usersColumns: GridColDef[] = [
    {
      field: 'profile.displayName',
      headerName: t('common.name'),
      renderHeader: () => <>{t('common.name')}</>,
      renderCell: ({ row }: RenderParams) => (
        <Link href={buildUserProfileUrl(row.nameID)} target="_blank">
          {row.profile.displayName}
        </Link>
      ),
      valueGetter: ({ row }: GetterParams) => row.profile.displayName,
      flex: 1,
      resizable: true,
    },
    {
      field: 'email',
      headerName: t('common.email'),
      renderHeader: () => <>{t('common.email')}</>,
      flex: 1,
      resizable: true,
    },
    {
      field: 'isLead',
      headerName: t('common.role'),
      renderHeader: () => <>{t('common.role')}</>,
      renderCell: ({ row }: RenderParams) => <>{row.isLead ? t('common.lead') : t('common.member')}</>,
    },
    {
      field: 'isAdmin',
      headerName: t('common.authorization'),
      renderHeader: () => <>{t('common.authorization')}</>,
      renderCell: ({ row }: RenderParams) => <>{row.isAdmin ? t('common.admin') : ''}</>,
    },
  ];

  const [filterString, setFilterString] = useState('');
  const [filterModel, setFilterModel] = useState<GridFilterModel>(EmptyFilter);
  const handleTopFilterChange = (terms: string) => {
    setFilterString(terms);
    if (terms) {
      setFilterModel({
        items: [
          {
            id: 1,
            columnField: 'profile.displayName',
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

  const [editingUser, setEditingUser] = useState<CommunityMemberUserFragmentWithRoles>();

  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <BlockTitle>{t('community.memberUsers', { count: users.length })}</BlockTitle>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => {}}>
          {t('common.add')}
        </Button>
      </Box>
      <TextField
        value={filterString}
        onChange={event => handleTopFilterChange(event.target.value)}
        label={t('common.search')}
        placeholder={t('common.search')}
        size="small"
        fullWidth
      />
      <Box minHeight={gutters(25)}>
        {loading ? (
          <DataGridSkeleton />
        ) : (
          <DataGridTable
            rows={users}
            columns={usersColumns}
            actions={[
              {
                name: 'edit',
                render: ({ row }) => (
                  <IconButton onClick={() => setEditingUser(row)}>
                    <EditIcon color="primary" />
                  </IconButton>
                ),
              },
            ]}
            flex={{
              displayName: 1,
            }}
            initialState={initialState}
            filterModel={filterModel}
            pageSize={10}
            disableDelete={() => true}
          />
        )}
      </Box>
      {editingUser && (
        <CommunityMemberSettingsDialog
          user={editingUser}
          onLeadChange={onUserLeadChange}
          onAdminChange={onUserAuthorizationChange}
          onRemoveMember={onRemoveMember}
          onClose={() => setEditingUser(undefined)}
        />
      )}
    </>
  );
};

export default CommunityUsers;
