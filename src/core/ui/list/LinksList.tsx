import React, { FC, ReactNode, useEffect, useState } from 'react';
import { styled } from '@mui/styles';
import {
  Box,
  List as MuiList,
  ListItem as MuiListItem,
  ListItemIcon as MuiListItemIcon,
  Skeleton,
} from '@mui/material';
import { BlockSectionTitle, CaptionSmall } from '../typography';
import RouterLink from '../link/RouterLink';
import { gutters } from '../grid/utils';
import { times } from 'lodash';
import CardExpandButton from '../card/CardExpandButton';

const List = styled(MuiList)(() => ({ padding: 0 }));

const ListItem = styled(MuiListItem)(({ theme }) => ({
  height: gutters(2)(theme),
  gap: theme.spacing(1),
  display: 'flex',
  alignItems: 'center',
})) as typeof MuiListItem;

const ListItemIcon = styled(MuiListItemIcon)({
  minWidth: 'auto',
  color: 'inherit',
});

interface Item {
  id: string;
  title: ReactNode;
  icon: ReactNode;
  uri: string;
}

export interface LinksListProps {
  items: Item[] | undefined;
  emptyListCaption?: string;
  loading?: boolean;
}

const COLLAPSED_LIST_ITEM_LIMIT = 5;

const LinksList: FC<LinksListProps> = ({ items = [], emptyListCaption, loading = false }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [itemsToShow, setItemsToShow] = useState<Item[]>([]);

  const handleExpand = () => {
    if (!isExpanded) {
      setItemsToShow(items);
    } else {
      setItemsToShow(items.slice(0, COLLAPSED_LIST_ITEM_LIMIT));
    }
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    if (loading) {
      return;
    }
    setItemsToShow(items.slice(0, COLLAPSED_LIST_ITEM_LIMIT));
  }, [items, loading]);

  return (
    <List>
      {loading && times(3, i => <ListItem key={i} component={Skeleton} />)}
      {!loading && items.length === 0 && emptyListCaption && <CaptionSmall>{emptyListCaption}</CaptionSmall>}
      {!loading &&
        itemsToShow.length > 0 &&
        itemsToShow.map(item => (
          <ListItem key={item.id} component={RouterLink} to={item.uri}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <BlockSectionTitle minWidth={0} noWrap>
              {item.title}
            </BlockSectionTitle>
          </ListItem>
        ))}
      <Box flexGrow={1} display="flex" justifyContent="end" paddingX={1.5} onClick={handleExpand}>
        {!loading && items.length > COLLAPSED_LIST_ITEM_LIMIT && <CardExpandButton expanded={isExpanded} />}
      </Box>
    </List>
  );
};

export default LinksList;
