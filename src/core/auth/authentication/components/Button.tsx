import { Button, ButtonProps } from '@mui/material';
import { sxCols } from '../../../../domain/shared/layout/Grid';

export interface AuthActionButtonProps extends ButtonProps {
  justifyContent?: 'start' | 'center';
}

const AuthActionButton = ({ justifyContent, ...props }: AuthActionButtonProps) => {
  return (
    <Button
      variant="contained"
      sx={{ width: '100%', minWidth: sxCols(2), justifyContent }}
      {...(props as ButtonProps)}
    />
  );
};

export default AuthActionButton;
