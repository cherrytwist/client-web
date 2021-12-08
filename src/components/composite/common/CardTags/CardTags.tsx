import { Box, Tooltip } from '@mui/material';
import React, { FC, useMemo } from 'react';
import Tag from '../../../core/Tag';
import TagContainer from '../../../core/TagContainer';

interface CardTagsProps {
  tags: string[];
  limit?: number;
}

export const CardTags: FC<CardTagsProps> = ({ tags, limit = 3 }) => {
  const truncatedTags = useMemo(() => tags.slice(0, limit), [tags]);

  return (
    <Tooltip placement="right" title={tags.join(', ')} id="more-tags" arrow>
      <div>
        <TagContainer>
          {truncatedTags.map((t, i) => (
            // with maxWidth limit long tags to 2 per line. so no more than 2 lines of tags.
            // 45% was the break point.
            // eslint-disable-next-line react/jsx-no-undef
            <Box key={i} overflow={'hidden'} maxWidth={'45%'}>
              <Tag key={i} text={t} color="neutralMedium" />
            </Box>
          ))}
          {tags.length > 3 && (
            <Tag text={<>{`+ ${tags.length - truncatedTags.length} more`}</>} color="neutralMedium" />
          )}
        </TagContainer>
      </div>
    </Tooltip>
  );
};

export default CardTags;
