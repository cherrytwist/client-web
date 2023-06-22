import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from '@mui/material';
import { sortBy } from 'lodash';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../admin/layout/toplevel/AdminLayout';
import { AdminSection } from '../../admin/layout/toplevel/constants';
import RouterLink from '../../../../core/ui/link/RouterLink';
import InnovationHubForm, { InnovationHubFormValues } from './InnovationHubForm';
import {
  refetchAdminInnovationHubsListQuery,
  useCreateInnovationHubMutation,
  useOrganizationsListQuery,
} from '../../../../core/apollo/generated/apollo-hooks';
import { InnovationHubType, SpaceVisibility } from '../../../../core/apollo/generated/graphql-schema';
import PageContent from '../../../../core/ui/content/PageContent';
import PageContentColumn from '../../../../core/ui/content/PageContentColumn';

const AdminNewInnovationHubPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { data: organizationsList, loading: loadingOrganizations } = useOrganizationsListQuery();

  const organizations = useMemo(
    () =>
      sortBy(
        organizationsList?.organizations.map(e => ({ id: e.id, name: e.profile.displayName })) || [],
        org => org.name
      ),
    [organizationsList]
  );

  const [createInnovationHub, { loading: creating }] = useCreateInnovationHubMutation();

  const handleSubmit = async (formData: InnovationHubFormValues) => {
    console.log('handleSubmit new', formData);
    const { data } = await createInnovationHub({
      variables: {
        hubData: {
          nameID: formData.nameID,
          //providerID: formData.providerId, //!!TODO
          subdomain: formData.subdomain,
          profileData: {
            displayName: formData.profile.displayName,
            tagline: formData.profile.tagline,
            description: formData.profile.description,
          },
          type: InnovationHubType.List,
          spaceListFilter: [],
          spaceVisibilityFilter: SpaceVisibility.Active,
        },
      },
      refetchQueries: [refetchAdminInnovationHubsListQuery()],
    });
    if (data?.createInnovationHub.nameID) {
      navigate(`../${data.createInnovationHub.nameID}`);
    }
  };

  const isLoading = loadingOrganizations || creating;

  return (
    <AdminLayout currentTab={AdminSection.InnovationHubs}>
      <PageContent>
        <PageContentColumn columns={12}>
          <Button component={RouterLink} to="../" startIcon={<ArrowBackIcon />}>
            {t('pages.admin.innovationHubs.back')}
          </Button>
          <InnovationHubForm isNew organizations={organizations} onSubmit={handleSubmit} loading={isLoading} />
        </PageContentColumn>
      </PageContent>
    </AdminLayout>
  );
};

export default AdminNewInnovationHubPage;
