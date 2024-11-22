import { Box, CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';
import WrapperTypography from '../typography/deprecated/WrapperTypography';

export const useLoadingStyles = makeStyles(theme => ({
  text: {
    marginLeft: theme.spacing(2),
  },
}));

export const Loading = ({ text = 'Loading' }: { text?: string }) => {
  const styles = useLoadingStyles();
  return (
    <Box sx={{ display: 'flex', flexGrow: 1, alignItems: 'center', justifyContent: 'center', height: 1 }}>
      <CircularProgress sx={{ color: 'primary.main}' }} />
      <WrapperTypography variant="caption" color="primary" className={styles.text}>
        {text}
      </WrapperTypography>
    </Box>
  );
};

export default Loading;
