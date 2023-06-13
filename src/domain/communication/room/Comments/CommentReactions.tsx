import { Identifiable } from '../../../shared/types/Identifiable';
import { groupBy, sortBy } from 'lodash';
import React, { useMemo, useRef, useState } from 'react';
import ReactionView, { ReactionViewProps, ReactionViewReaction } from './ReactionView';
import { useUserContext } from '../../../community/contributor/user';
import { Box, IconButton } from '@mui/material';
import { AddReactionOutlined } from '@mui/icons-material';
import { CardText } from '../../../../core/ui/typography/components';
import EmojiSelector from '../../../../core/ui/forms/emoji/EmojiSelector';

interface CommentReactionsReaction extends Identifiable {
  emoji: string;
  sender?: Identifiable & {
    firstName: string;
    lastName: string;
  };
}

interface CommentReactionsProps {
  reactions: CommentReactionsReaction[];
  onAddReaction?: (emoji: string) => void;
  onRemoveReaction?: ReactionViewProps['onRemoveReaction'];
}

const CommentReactions = ({ reactions, onAddReaction, onRemoveReaction }: CommentReactionsProps) => {
  const { user } = useUserContext();

  const reactionsWithCount = useMemo<ReactionViewReaction[]>(() => {
    const sortedReactions = sortBy(reactions, r => r.emoji);

    return Object.entries(groupBy(sortedReactions, r => r.emoji)).map(([emoji, reactions]) => {
      const senders = reactions.map(r => r.sender!);

      const userId = user?.user.id;

      return {
        emoji,
        count: reactions.length,
        senders: reactions.map(r => r.sender!),
        ownReactionId: userId && senders.find(s => s.id === userId)?.id,
      };
    });
  }, [reactions]);

  const [isReactionDialogOpen, setIsReactionDialogOpen] = useState(false);

  const addEmojiButtonRef = useRef<HTMLButtonElement>(null);

  const handleEmojiClick = (emoji: string) => {
    setIsReactionDialogOpen(false);
    onAddReaction?.(emoji);
  };

  return (
    <>
      <Box display="flex" gap={0.5} alignItems="center">
        {reactionsWithCount.map(reaction => (
          <ReactionView key={reaction.emoji} reaction={reaction} onRemoveReaction={onRemoveReaction} />
        ))}
      </Box>
      <CardText>
        <IconButton ref={addEmojiButtonRef} size="small" onClick={() => setIsReactionDialogOpen(true)}>
          <AddReactionOutlined fontSize="inherit" />
        </IconButton>
      </CardText>
      <EmojiSelector
        anchorElement={addEmojiButtonRef.current}
        open={isReactionDialogOpen}
        onClose={() => setIsReactionDialogOpen(false)}
        onEmojiClick={handleEmojiClick}
      />
    </>
  );
};

export default CommentReactions;
