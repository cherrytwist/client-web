import React, { ComponentType, PropsWithChildren } from 'react';
import { Box, IconButton, SvgIconProps, Typography } from '@mui/material';

const iconButtonSize = 105;

export interface RadioButtonProps<Value> {
  value: Value;
  selected?: boolean;
  disabled?: boolean;
  iconComponent: ComponentType<SvgIconProps>;
  onClick?: (value: Value) => void;
}
//!! TODO: Restyle this
const RadioButton = <Value,>({
  value,
  selected,
  disabled,
  iconComponent: Icon,
  onClick,
  children,
}: PropsWithChildren<RadioButtonProps<Value>>) => {
  return (
    <IconButton
      sx={theme => ({
        width: iconButtonSize,
        height: iconButtonSize,
        border: '1px solid #B3B3B3',
        borderRadius: '5px',
        background: selected ? theme.palette.primary.main : undefined,
        '&:hover': selected
          ? {
              background: theme.palette.primary.main,
            }
          : undefined,
        pointerEvents: disabled ? 'none' : undefined,
      })}
      aria-label="comments"
      onClick={onClick && (() => onClick(value))}
    >
      <Box display="flex" flexDirection="column" alignContent="center">
        <Icon
          sx={theme => ({
            color: selected ? theme.palette.background.default : theme.palette.primary.main,
            fontSize: 60,
          })}
        />
        <Typography
          sx={theme => ({
            color: selected ? theme.palette.background.default : theme.palette.primary.main,
            align: 'center',
          })}
        >
          {children}
        </Typography>
      </Box>
    </IconButton>
  );
};

export default RadioButton;
