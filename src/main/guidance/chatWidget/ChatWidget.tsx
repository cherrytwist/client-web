import { cloneElement, ReactElement, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Box, IconButton, IconButtonProps, Paper, SvgIconProps, Theme, Tooltip, useMediaQuery } from '@mui/material';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import { addResponseMessage, renderCustomComponent, Widget } from 'react-chat-widget';
import {
  useAskChatGuidanceQuestionQuery,
  useUpdateAnswerRelevanceMutation,
} from '../../../core/apollo/generated/apollo-hooks';
import logoSrc from '../../ui/logo/logoSmall.svg';
import { useTranslation } from 'react-i18next';
import 'react-chat-widget/lib/styles.css';
import formatChatGuidanceResponseAsMarkdown from './formatChatGuidanceResponseAsMarkdown';
import ChatWidgetStyles from './ChatWidgetStyles';
import ChatWidgetTitle from './ChatWidgetTitle';
import ChatWidgetSubtitle from './ChatWidgetSubtitle';
import ChatWidgetHelpDialog from './ChatWidgetHelpDialog';
import { createPortal } from 'react-dom';
import ChatWidgetFooter from './ChatWidgetFooter';
import Gutters from '../../../core/ui/grid/Gutters';
import { gutters } from '../../../core/ui/grid/utils';
import { Caption } from '../../../core/ui/typography';
import { InfoOutlined } from '@mui/icons-material';
import { PLATFORM_NAVIGATION_MENU_Z_INDEX } from '../../ui/platformNavigation/constants';

type FeedbackType = 'positive' | 'negative';

interface FeedbackButtonProps {
  type: FeedbackType;
  selectedType?: FeedbackType;
  onSelect?: (type: FeedbackType) => void;
  children: ReactElement<SvgIconProps>;
}

const ButtonColor: Record<FeedbackType, (theme: Theme) => string> = {
  positive: theme => theme.palette.primary.main,
  negative: theme => theme.palette.negative.main,
};

const FeedbackButton = ({
  type,
  selectedType,
  onSelect,
  children,
  ...props
}: Omit<IconButtonProps, 'type' | 'onSelect'> & FeedbackButtonProps) => {
  const getSelectedStyle = () => {
    if (!selectedType) {
      return {
        fontSize: gutters(),
      };
    }
    const isSelected = selectedType === type;
    return {
      fontSize: gutters(isSelected ? 1.2 : 0.75),
      padding: isSelected ? 0.3 : 0.75,
    };
  };

  return (
    <IconButton
      size="small"
      sx={{
        color: theme => theme.palette.background.paper,
        '&, &:hover': {
          backgroundColor: ButtonColor[type],
        },
        ...getSelectedStyle(),
      }}
      onClick={() => onSelect?.(type)}
      {...props}
    >
      {cloneElement(children, { fontSize: 'inherit' })}
    </IconButton>
  );
};

interface FeedbackProps {
  answerId: string;
}

const Feedback = ({ answerId }: FeedbackProps) => {
  const [updateAnswerRelevance, { loading }] = useUpdateAnswerRelevanceMutation();

  const [lastFeedbackType, setLastFeedbackType] = useState<FeedbackType | undefined>(undefined);

  const updateHandler = async (feedbackType: FeedbackType) => {
    if (feedbackType === lastFeedbackType) {
      return;
    }
    setLastFeedbackType(feedbackType);
    try {
      await updateAnswerRelevance({
        variables: {
          input: {
            id: answerId,
            relevant: feedbackType === 'positive',
          },
        },
      });
    } catch (error) {
      setLastFeedbackType(lastFeedbackType);
    }
  };

  const { t } = useTranslation();

  return (
    <Gutters
      row
      gap={gutters(0.5)}
      disablePadding
      marginTop={gutters(-1)}
      justifyContent="right"
      alignItems="center"
      flexGrow={1}
    >
      <Tooltip
        title={<Caption>{t('chatbot.feedback.tooltip')}</Caption>}
        PopperProps={{ sx: { zIndex: PLATFORM_NAVIGATION_MENU_Z_INDEX + 1 } }}
      >
        <Box
          component={Paper}
          elevation={0}
          sx={{ backgroundColor: theme => theme.palette.divider }}
          display="flex"
          gap={gutters(0.5)}
          paddingX={gutters(0.5)}
          paddingY={gutters(0.25)}
        >
          <Caption>{t('chatbot.feedback.message')}</Caption>
          <InfoOutlined fontSize="small" />
        </Box>
      </Tooltip>
      <FeedbackButton type="positive" disabled={loading} selectedType={lastFeedbackType} onSelect={updateHandler}>
        <ThumbUpOffAltIcon />
      </FeedbackButton>
      <FeedbackButton type="negative" disabled={loading} selectedType={lastFeedbackType} onSelect={updateHandler}>
        <ThumbDownOffAltIcon />
      </FeedbackButton>
    </Gutters>
  );
};

const ChatWidget = () => {
  const [newMessage, setNewMessage] = useState(null);
  const { t, i18n } = useTranslation();
  const { data, loading } = useAskChatGuidanceQuestionQuery({
    variables: { chatData: { question: newMessage!, language: i18n.language.toUpperCase() } },
    skip: !newMessage,
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    addResponseMessage(t('chatbot.intro'));
  }, []);

  useEffect(() => {
    if (data && !loading) {
      const responseMessageMarkdown = formatChatGuidanceResponseAsMarkdown(data.askChatGuidanceQuestion, t);
      addResponseMessage(responseMessageMarkdown);
      renderCustomComponent(Feedback, { answerId: data.askChatGuidanceQuestion.id });
    }
  }, [data, loading]);

  const handleNewUserMessage = message => {
    setNewMessage(message);
  };

  const [isHelpDialogOpen, setIsHelpDialogOpen] = useState(false);

  const [chatToggleTime, setChatToggleTime] = useState(Date.now());

  const wrapperRef = useRef<HTMLDivElement>(null);

  const [footerContainer, setFooterContainer] = useState<HTMLDivElement | null>(null);

  const getConversationContainer = () => {
    const conversationContainer = wrapperRef.current?.querySelector('.rcw-conversation-container');
    if (!conversationContainer) {
      setFooterContainer(null);
      return;
    }
    let footerContainer = conversationContainer.querySelector('.footer-container') as HTMLDivElement | null;
    if (!footerContainer) {
      footerContainer = document.createElement('div');
      footerContainer.classList.add('footer-container');
      conversationContainer.appendChild(footerContainer);
    }
    setFooterContainer(footerContainer);
  };

  useLayoutEffect(getConversationContainer, [chatToggleTime]);

  const isMobile = useMediaQuery('(orientation: portrait)');

  return (
    <>
      <ChatWidgetStyles ref={wrapperRef}>
        <Widget
          profileAvatar={logoSrc}
          title={<ChatWidgetTitle mobile={isMobile} onClickInfo={() => setIsHelpDialogOpen(true)} />}
          subtitle={<ChatWidgetSubtitle />}
          handleNewUserMessage={handleNewUserMessage}
          handleToggle={() => setChatToggleTime(Date.now())}
        />
      </ChatWidgetStyles>
      <ChatWidgetHelpDialog open={isHelpDialogOpen} onClose={() => setIsHelpDialogOpen(false)} />
      {footerContainer && createPortal(<ChatWidgetFooter />, footerContainer)}
    </>
  );
};

export default ChatWidget;
