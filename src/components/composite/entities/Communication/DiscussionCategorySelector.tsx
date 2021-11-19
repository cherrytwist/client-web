import { Box, emphasize, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core';
import List from '@material-ui/core/List';
import { createStyles } from '@mui/material';
import clsx from 'clsx';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { DiscussionCategoryExt, DiscussionCategoryExtEnum } from '../../../../models/enums/DiscussionCategoriesExt';
import { DiscussionCategory } from '../../../../models/graphql-schema';
import DiscussionIcon from './DiscussionIcon';

interface DiscussionCategorySelectorProps {
  value?: DiscussionCategoryExt;
  onSelect?: (category: DiscussionCategoryExt) => void;
}

const useStyles = makeStyles(
  createStyles(theme => ({
    root: {
      '&$selected': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.neutralLight.main,
        '&:hover': {
          backgroundColor: emphasize(theme.palette.primary.main, 0.5),
        },
      },
      '&:hover': {
        backgroundColor: emphasize(theme.palette.primary.main, 0.5),
      },
    },
    selected: {},
    icon: {
      color: theme.palette.neutralLight.main,
    },
  }))
);

export const DiscussionCategorySelector: FC<DiscussionCategorySelectorProps> = ({
  value = DiscussionCategoryExtEnum.All,
  onSelect,
}) => {
  const { t } = useTranslation();
  const styles = useStyles();

  const handleSelect = (selectedValue: DiscussionCategoryExt) => {
    onSelect && onSelect(selectedValue);
  };

  return (
    <List>
      <ListItem
        classes={{
          root: styles.root,
          selected: styles.selected,
        }}
        button
        selected={value === DiscussionCategoryExtEnum.All}
        onClick={() => handleSelect(DiscussionCategoryExtEnum.All)}
      >
        <ListItemIcon>
          <DiscussionIcon
            className={clsx({ [styles.icon]: value === DiscussionCategoryExtEnum.All })}
            color="primary"
            category={DiscussionCategoryExtEnum.All}
          />
        </ListItemIcon>
        <ListItemText>
          <Box component="span" fontWeight="bold">
            {t('components.discussion-category-selector.ALL')}
          </Box>
        </ListItemText>
      </ListItem>
      {Object.values(DiscussionCategory).map((k, i) => (
        <ListItem
          key={i}
          classes={{
            root: styles.root,
            selected: styles.selected,
          }}
          button
          selected={value === k}
          onClick={() => handleSelect(k)}
        >
          <ListItemIcon>
            <DiscussionIcon className={clsx({ [styles.icon]: value === k })} color="primary" category={k} />
          </ListItemIcon>
          <ListItemText>
            <Box component="span" fontWeight="bold">
              {t(`components.discussion-category-selector.${k}` as const)}
            </Box>
          </ListItemText>
        </ListItem>
      ))}
    </List>
  );
};
export default DiscussionCategorySelector;
