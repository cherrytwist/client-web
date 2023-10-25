import { ComponentType } from 'react';
import { ProfileType } from '../../../core/apollo/generated/graphql-schema';
import { SvgIconProps } from '@mui/material';
import { CalendarIcon } from '../../timeline/calendar/icons/CalendarIcon';
import { ChallengeIcon } from '../../journey/challenge/icon/ChallengeIcon';
import { OpportunityIcon } from '../../journey/opportunity/icon/OpportunityIcon';
import { InnovationFlowIcon } from '../../platform/admin/templates/InnovationTemplates/InnovationFlow/InnovationFlowIcon';
import { CalloutIcon } from '../../collaboration/callout/icon/CalloutIcon';
import {
  Campaign,
  ChatBubbleOutline,
  CorporateFareOutlined,
  HubOutlined,
  InventoryOutlined,
  PeopleAltOutlined,
  PersonOutline,
  SvgIconComponent,
} from '@mui/icons-material';
import calloutIcons from '../../collaboration/callout/utils/calloutIcons';
import { SpaceIcon } from '../../journey/space/icon/SpaceIcon';

export const profileIcon = (profileType: ProfileType): ComponentType<SvgIconProps> => {
  switch (profileType) {
    case ProfileType.CalendarEvent:
      return CalendarIcon;
    case ProfileType.CalloutFraming:
      return CalloutIcon;
    case ProfileType.CalloutTemplate:
      return Campaign;
    case ProfileType.Challenge:
      return ChallengeIcon;
    case ProfileType.Discussion:
      return ChatBubbleOutline;
    case ProfileType.InnovationFlow:
      return InnovationFlowIcon as SvgIconComponent;
    case ProfileType.InnovationFlowTemplate:
      return InnovationFlowIcon as SvgIconComponent;
    case ProfileType.InnovationHub:
      return HubOutlined;
    case ProfileType.InnovationPack:
      return InventoryOutlined;
    case ProfileType.Opportunity:
      return OpportunityIcon;
    case ProfileType.Organization:
      return CorporateFareOutlined;
    case ProfileType.Post:
      return calloutIcons.POST;
    case ProfileType.PostTemplate:
      return calloutIcons.POST_COLLECTION;
    case ProfileType.Space:
      return SpaceIcon;
    case ProfileType.User:
      return PersonOutline;
    case ProfileType.UserGroup:
      return PeopleAltOutlined;
    case ProfileType.Whiteboard:
      return calloutIcons.WHITEBOARD;
    case ProfileType.WhiteboardRt:
      return calloutIcons.WHITEBOARD_RT;
    case ProfileType.WhiteboardTemplate:
      return calloutIcons.WHITEBOARD_COLLECTION;
  }
};
