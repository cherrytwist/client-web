import clsx from 'clsx';
import React, { FC } from 'react';
import Grid from '@mui/material/Grid';
import { Container, ContainerProps } from '@mui/material';
import { Link } from 'react-router-dom';
import Image from '../../../../domain/shared/components/Image';
import { makeStyles } from '@mui/styles';

const useAuthenticationLayout = makeStyles(theme => ({
  logo: {
    height: theme.spacing(4),
  },
  logoWrapper: {
    marginBottom: theme.spacing(2),
  },
}));

interface AuthenticationLayoutProps extends ContainerProps {}

export const AuthenticationLayout: FC<AuthenticationLayoutProps> = ({ children, ...rest }) => {
  const styles = useAuthenticationLayout();
  return (
    <Container maxWidth="xl" {...rest}>
      <Grid container spacing={2}>
        <Grid item container justifyContent={'center'} className={clsx(styles.logoWrapper)}>
          <Link to={'/about'}>
            <Image src="/logo.png" alt="Alkemio" className={styles.logo} />
          </Link>
        </Grid>
      </Grid>
      {children}
    </Container>
  );
};

export default AuthenticationLayout;
