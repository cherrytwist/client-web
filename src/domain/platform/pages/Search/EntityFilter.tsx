import { FC, useRef, useState } from 'react';
import {
  Box,
  Checkbox,
  Drawer,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { useTranslation } from 'react-i18next';
import { BlockTitle } from '../../../../core/ui/typography';
import { gutters } from '../../../../core/ui/grid/utils';
import { FilterConfig, FilterDefinition } from './Filter';
import useCurrentBreakpoint from '../../../../core/ui/utils/useCurrentBreakpoint';
import RoundedIcon from '../../../../core/ui/icon/RoundedIcon';

interface EntityFilterProps {
  title?: string;
  currentFilter: FilterDefinition;
  config: FilterConfig;
  onChange: (value: FilterDefinition) => void;
}

export const EntityFilter: FC<EntityFilterProps> = ({ title, currentFilter, config, onChange }) => {
  const { t } = useTranslation();
  const breakpoint = useCurrentBreakpoint();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isFilterMenuOpen, setFilterMenuOpen] = useState<boolean>(false);

  const handleChange = (typename: string) => {
    const filterKey = Object.keys(config).find(x => x === typename);

    if (!filterKey) {
      throw new Error(`Unrecognized filter key: ${filterKey}`);
    }

    onChange(config[filterKey]);
    setFilterMenuOpen(false);
  };

  return (
    <>
      <IconButton ref={buttonRef} onClick={() => setFilterMenuOpen(true)} sx={{ marginRight: gutters(-0.5) }}>
        <RoundedIcon component={FilterAltOutlinedIcon} size="medium" />
      </IconButton>
      {/* Popup menu for big screens */}
      {breakpoint !== 'xs' && (
        <Menu anchorEl={buttonRef.current} open={isFilterMenuOpen} onClose={() => setFilterMenuOpen(false)}>
          {Object.keys(config).map((key, i) => (
            <MenuItem
              key={`menu-item-${i}`}
              value={config[key].typename}
              selected={config[key].typename === currentFilter.typename}
              onClick={() => handleChange(key)}
            >
              {t(config[key].title)}
            </MenuItem>
          ))}
        </Menu>
      )}
      {/* Bottom Drawer for small screens */}
      {breakpoint === 'xs' && (
        <Drawer anchor="bottom" open={isFilterMenuOpen} onClose={() => setFilterMenuOpen(false)}>
          <FormControl sx={{ padding: gutters(1) }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={gutters(1)}>
              <BlockTitle>{title}</BlockTitle>
              <RoundedIcon component={FilterAltOutlinedIcon} size="medium" />
            </Box>
            <FormGroup>
              {Object.keys(config).map((key, i) => (
                <FormControlLabel
                  key={`menu-item-${i}`}
                  labelPlacement="start"
                  sx={{ justifyContent: 'space-between' }}
                  control={
                    <Checkbox
                      checked={currentFilter.typename === config[key].typename}
                      onClick={() => handleChange(key)}
                      sx={{ marginRight: gutters(0.5) }}
                    />
                  }
                  label={t(config[key].title)}
                />
              ))}
            </FormGroup>
          </FormControl>
        </Drawer>
      )}
    </>
  );
};
