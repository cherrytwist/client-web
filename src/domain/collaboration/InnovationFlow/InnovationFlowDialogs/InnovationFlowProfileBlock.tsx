import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { DialogActions, DialogContent, IconButton } from '@mui/material';
import { cloneElement, FC, ReactElement, useState } from 'react';
import { Reference, TagsetType, UpdateProfileInput, Visual } from '../../../../core/apollo/generated/graphql-schema';
import PageContentBlock from '../../../../core/ui/content/PageContentBlock';
import InnovationFlowProfileForm, { InnovationFlowProfileFormValues } from './InnovationFlowProfileForm';
import InnovationFlowProfileView from './InnovationFlowProfileView';
import { useTranslation } from 'react-i18next';
import DialogWithGrid, { DialogFooter } from '../../../../core/ui/dialog/DialogWithGrid';
import { useInView } from 'react-intersection-observer';
import PageContentBlockHeader from '../../../../core/ui/content/PageContentBlockHeader';
import DialogHeader from '../../../../core/ui/dialog/DialogHeader';

export interface InnovationFlowProfile {
  id: string;
  displayName: string;
  description?: string;
  bannerNarrow?: Visual;
  tags?: {
    tags: string[];
  };
  tagsets?: {
    id: string;
    name: string;
    tags: string[];
    allowedValues: string[];
    type: TagsetType;
  }[];
  references?: Reference[];
}

export interface InnovationFlowProfileBlockProps {
  innovationFlow?: {
    id: string;
    profile: InnovationFlowProfile;
  };
  canEdit?: boolean;
  onUpdate?: (innovationFlowId: string, profileData: UpdateProfileInput) => Promise<unknown> | void;
  loading?: boolean;
}

const FormActionsRenderer = ({ children }: { children: ReactElement }) => {
  const { ref, inView } = useInView();

  return (
    <>
      {cloneElement(children, { ref })}
      <DialogFooter>{!inView && <DialogActions>{children}</DialogActions>}</DialogFooter>
    </>
  );
};

const InnovationFlowProfileBlock: FC<InnovationFlowProfileBlockProps> = ({
  canEdit = false,
  onUpdate,
  innovationFlow,
  children,
}) => {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdateProfile = async (profileData: InnovationFlowProfileFormValues) => {
    if (!innovationFlow) {
      return;
    }
    await onUpdate?.(innovationFlow.id, {
      displayName: profileData.displayName,
      description: profileData.description,
      // TODO: Pending Tags
    });
    setIsEditing(false);
  };

  return (
    <>
      <PageContentBlock disableGap>
        <PageContentBlockHeader title={innovationFlow?.profile.displayName}>
          {canEdit && (
            <IconButton size="small" onClick={() => setIsEditing(true)} aria-label={t('buttons.edit')}>
              <EditOutlinedIcon />
            </IconButton>
          )}
        </PageContentBlockHeader>
        <InnovationFlowProfileView innovationFlow={innovationFlow} />
        {children}
      </PageContentBlock>
      <DialogWithGrid open={isEditing} fullWidth>
        <DialogHeader
          title={t('components.innovationFlowSettings.editProfileDialog.title')}
          onClose={() => setIsEditing(false)}
        />
        <DialogContent>
          <InnovationFlowProfileForm
            profile={innovationFlow?.profile}
            onSubmit={handleUpdateProfile}
            onCancel={() => setIsEditing(false)}
            actionsRenderer={FormActionsRenderer}
          />
        </DialogContent>
      </DialogWithGrid>
    </>
  );
};

export default InnovationFlowProfileBlock;
