import { useCallback } from 'react';
import useNavigate from '@/core/routing/useNavigate';
import { useTranslation } from 'react-i18next';
import { JourneyCreationDialog } from '@/domain/shared/components/JourneyCreationDialog/JourneyCreationDialog';
import { JourneyFormValues } from '@/domain/shared/components/JourneyCreationDialog/JourneyCreationForm';
import {
  refetchSubspacesInSpaceQuery,
  refetchDashboardWithMembershipsQuery,
} from '@/core/apollo/generated/apollo-hooks';
import { CreateSubspaceForm } from '../../forms/CreateSubspaceForm';
import { useSubspaceCreation } from '@/domain/shared/utils/useSubspaceCreation/useSubspaceCreation';
import SubspaceIcon2 from '@/main/ui/icons/SubspaceIcon2';
import { RECENT_SPACES_LIST } from '@/domain/journey/common/journeyDashboard/constants';

export interface CreateJourneyProps {
  isVisible: boolean;
  onClose: () => void;
  parentSpaceId: string | undefined;
}

export const CreateJourney = ({ isVisible = false, onClose, parentSpaceId = '' }: CreateJourneyProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { createSubspace } = useSubspaceCreation({
    refetchQueries: [
      refetchSubspacesInSpaceQuery({ spaceId: parentSpaceId }),
      refetchDashboardWithMembershipsQuery({
        limit: RECENT_SPACES_LIST,
      }),
    ],
  });

  const handleCreate = useCallback(
    async (value: JourneyFormValues) => {
      const result = await createSubspace({
        spaceID: parentSpaceId,
        displayName: value.displayName,
        tagline: value.tagline,
        background: value.background ?? '',
        vision: value.vision,
        tags: value.tags,
        addTutorialCallouts: value.addTutorialCallouts,
        collaborationTemplateId: value.collaborationTemplateId,
        visuals: value.visuals,
      });

      if (!result) {
        return;
      }
      navigate(result.profile.url);
      onClose();
    },
    [navigate, createSubspace, parentSpaceId]
  );

  return (
    <JourneyCreationDialog
      icon={<SubspaceIcon2 fill="primary" />}
      open={isVisible}
      journeyName={t('common.subspace')}
      onClose={onClose}
      onCreate={handleCreate}
      formComponent={CreateSubspaceForm}
    />
  );
};

export default CreateJourney;
