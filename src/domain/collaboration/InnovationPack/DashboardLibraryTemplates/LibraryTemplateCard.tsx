import { ContributeCardProps } from '../../../../core/ui/card/ContributeCard';
import { Identifiable } from '../../../shared/types/Identifiable';
import PostTemplateCard, { PostTemplate } from '../../aspect/PostTemplateCard/PostTemplateCard';
import { WhiteboardTemplate } from '../../canvas/WhiteboardTemplateCard/WhiteboardTemplate';
import WhiteboardTemplateCard from '../../canvas/WhiteboardTemplateCard/WhiteboardTemplateCard';
import { InnovationFlowTemplate } from '../../templates/InnovationFlowTemplateCard/InnovationFlowTemplate';
import InnovationFlowTemplateCard from '../../templates/InnovationFlowTemplateCard/InnovationFlowTemplateCard';
import { TemplateType } from '../InnovationPackProfilePage/InnovationPackProfilePage';

export type LibraryTemplateCardProps = Identifiable &
  (
    | (PostTemplate & { templateType: TemplateType.PostTemplate })
    | (WhiteboardTemplate & { templateType: TemplateType.WhiteboardTemplate })
    | (InnovationFlowTemplate & { templateType: TemplateType.InnovationFlowTemplate })
  ) & { onClick?: ContributeCardProps['onClick'] };

const LibraryTemplateCard = (props: LibraryTemplateCardProps) => {
  switch (props.templateType) {
    case TemplateType.PostTemplate: {
      const { onClick, templateType, ...template } = props;
      return <PostTemplateCard onClick={onClick} template={template} />;
    }
    case TemplateType.WhiteboardTemplate: {
      const { onClick, templateType, ...template } = props;
      return <WhiteboardTemplateCard onClick={onClick} template={template} />;
    }
    case TemplateType.InnovationFlowTemplate: {
      const { onClick, templateType, ...template } = props;
      return <InnovationFlowTemplateCard onClick={onClick} template={template} />;
    }
  }
};

export default LibraryTemplateCard;
