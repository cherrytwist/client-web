import React, { FC, useCallback, useMemo, useState } from 'react';
import { Avatar, styled, AvatarProps, Tooltip, Link } from '@mui/material';
import UserCard from '../../../../common/components/composite/common/cards/user-card/UserCard';
import { Author } from './models/author';
import { DirectMessageDialog } from '../../../communication/messaging/DirectMessaging/DirectMessageDialog';
import { useSendMessageToUserMutation } from '../../../../core/apollo/generated/apollo-hooks';
import { useTranslation } from 'react-i18next';

const UserAvatar = styled(props => <Avatar {...props} />)<AvatarProps>(({ theme }) => ({
  height: theme.avatarSizeXs,
  width: theme.avatarSizeXs,
}));

export interface AuthorAvatarProps {
  author: Author | undefined;
}

export const AuthorAvatar: FC<AuthorAvatarProps> = ({ author }) => {
  const { t } = useTranslation();
  const [sendMessageToUser] = useSendMessageToUserMutation();
  const [isContactDialogVisible, setContactDialogVisible] = useState(false);
  const handleSendMessage = useCallback(
    async (messageText: string) => {
      if (!author || !author.id) {
        return;
      }

      await sendMessageToUser({
        variables: {
          messageData: {
            message: messageText,
            receiverIds: [author.id],
          },
        },
      });
    },
    [sendMessageToUser]
  );

  const TooltipElement = useMemo(
    () =>
      ({ children }) =>
        author ? (
          <Tooltip
            arrow
            title={
              <UserCard
                displayName={author.displayName}
                avatarSrc={author.avatarUrl}
                tags={author.tags || []}
                city={author.city}
                country={author.country}
                url={author.url}
                onContact={event => {
                  event.preventDefault();
                  setContactDialogVisible(true);
                }}
              />
            }
            PopperProps={{
              sx: { '& > .MuiTooltip-tooltip': { background: 'transparent' } },
            }}
          >
            {children}
          </Tooltip>
        ) : (
          <>{children}</>
        ),
    [author, setContactDialogVisible]
  );

  return (
    <>
      <TooltipElement>
        <Link href={author?.url}>
          <UserAvatar src={author?.avatarUrl}>{author?.displayName[0]}</UserAvatar>
        </Link>
      </TooltipElement>
      <DirectMessageDialog
        title={t('send-message-dialog.direct-message-title')}
        open={isContactDialogVisible}
        onClose={() => setContactDialogVisible(false)}
        onSendMessage={handleSendMessage}
        messageReceivers={[
          {
            id: author?.id,
            title: author?.displayName,
            avatarUri: author?.avatarUrl,
            city: author?.city,
            country: author?.country,
          },
        ]}
      />
    </>
  );
};

export default AuthorAvatar;
