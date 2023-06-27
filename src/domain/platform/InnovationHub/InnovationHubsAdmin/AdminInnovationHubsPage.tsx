import { FC, useMemo, useState } from 'react';
import { useResolvedPath } from 'react-router-dom';
import { sortBy } from 'lodash';
import AdminLayout from '../../admin/layout/toplevel/AdminLayout';
import SearchableListLayout from '../../../shared/components/SearchableListLayout';
import SimpleSearchableList from '../../../shared/components/SimpleSearchableList';
import { AdminSection } from '../../admin/layout/toplevel/constants';
import {
  refetchAdminInnovationHubsListQuery,
  useAdminInnovationHubsListQuery,
  useDeleteInnovationHubMutation,
} from '../../../../core/apollo/generated/apollo-hooks';

interface AdminInnovationHubsPageProps {}

const AdminInnovationHubsPage: FC<AdminInnovationHubsPageProps> = () => {
  const { pathname } = useResolvedPath('.');
  const { data, loading } = useAdminInnovationHubsListQuery();
  const [deleteInnovationHub] = useDeleteInnovationHubMutation({
    refetchQueries: [refetchAdminInnovationHubsListQuery()],
  });

  const [searchTerm, setSearchTerm] = useState('');

  const handleDelete = async (innovationHubId: string) =>
    await deleteInnovationHub({
      variables: {
        innovationHubId,
      },
    });

  const innovationHubs = useMemo(
    () =>
      sortBy(
        data?.platform.innovationHubs
          .map(pack => ({
            value: pack.profile.displayName,
            url: pack.nameID,
            ...pack,
          }))
          .filter(ip => !searchTerm || ip.profile.displayName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1),
        ip => ip.profile.displayName.toLowerCase() // sortBy
      ),
    [data, searchTerm]
  );

  return (
    <AdminLayout currentTab={AdminSection.InnovationHubs}>
      <SearchableListLayout newLink={`${pathname}/new`}>
        <SimpleSearchableList
          data={innovationHubs}
          onDelete={item => handleDelete(item.id)}
          loading={loading}
          fetchMore={() => Promise.resolve()}
          pageSize={data?.platform.innovationHubs.length ?? 0}
          searchTerm={searchTerm}
          onSearchTermChange={setSearchTerm}
          hasMore={false}
        />
      </SearchableListLayout>
    </AdminLayout>
  );
};

export default AdminInnovationHubsPage;
