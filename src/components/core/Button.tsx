import clsx from 'clsx';
import React, { FC } from 'react';
import { Button as MuiButton, makeStyles } from '@material-ui/core';
import hexToRGBA from '../../utils/hexToRGBA';
import Typography from './Typography';
import { defaultPalette } from '../../themes';

const useStyles = makeStyles(theme => ({
  whiteStatic: {
    color: theme.palette.background.default,
    borderColor: theme.palette.background.default,
    background: 'transparent',

    '&:hover': {
      background: 'transparent',
    },

    '&.inset': {
      '&:focus': {
        outline: 'none',
      },
    },
  },
  transparent: {
    color: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
    background: 'transparent',

    '&:hover': {
      color: theme.palette.background.default,
      background: hexToRGBA(theme.palette.primary.main, 0.7),
    },

    '&:focus': {
      '&.inset': {
        outline: 'none',
      },
    },
  },
  semiTransparent: {
    color: theme.palette.background.default,
    borderColor: theme.palette.primary.main,
    background: hexToRGBA(theme.palette.background.default, 0.25),

    '& > span': {
      filter: `drop-shadow(1px 1px ${defaultPalette.neutral})`,
    },

    '&:hover': {
      color: theme.palette.background.default,
      background: hexToRGBA(theme.palette.primary.main, 0.7),
      filter: 'none',
    },

    '&:focus': {
      '&.inset': {
        outline: 'none',
      },
    },

    '&.inset': {
      borderColor: 'transparent',
    },
  },
  negative: {
    color: theme.palette.error.main,
    borderColor: theme.palette.error.main,
    background: theme.palette.background.default,

    '&:hover': {
      color: theme.palette.background.default,
      background: hexToRGBA(theme.palette.error.main, 0.7),
    },

    '&.inset': {
      borderColor: theme.palette.background.default,
      borderRightColor: 'transparent',
      borderTopColor: 'transparent',
      borderBottomColor: 'transparent',

      '&:hover': {
        color: theme.palette.error.main,
        background: theme.palette.background,
        cursor: 'pointer',
      },

      '&:focus': {
        outline: 'none',
      },
    },
  },
}));

export interface ButtonProps extends Record<string, unknown> {
  paddingClass?: string;
  className?: string;
  classes?: unknown;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  as?: React.ComponentType<any> | string;
  to?: string;
  onClick?: (e: Event) => void;
  text?: string;
  variant?: 'default' | 'primary' | 'negative' | 'transparent' | 'semiTransparent' | 'whiteStatic';
  inset?: boolean;
  small?: boolean;
  block?: boolean;
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({
  className,
  classes = {},
  variant = 'default',
  inset = false,
  small = false,
  block = false,
  disabled = false,
  children,
  as: Component = 'button',
  to,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClick = () => {},
  text,
  ...rest
}) => {
  const styles = useStyles(classes);

  const props = disabled
    ? {}
    : {
        type: 'button',
        onClick,
        ...rest,
      };

  const Link = React.forwardRef((props, ref) => <Component ref={ref} to={to} {...props} />);

  return (
    <MuiButton
      className={clsx(className, inset && 'inset', small && 'small', block && 'block')}
      classes={{
        outlined: styles[variant],
      }}
      component={Link}
      variant="outlined"
      {...props}
    >
      <Typography variant="button" color="inherit" weight="boldLight">
        {text}
      </Typography>
      {children}
    </MuiButton>
  );
};

export default Button;
