import { Components, Theme } from '@mui/material/styles';

const MuiTabPanel = (_theme: Theme): Components['MuiTabPanel'] => {
  return {
    styleOverrides: {
      root: {
        paddingLeft: 0,
        paddingRight: 0,
      },
    },
  };
};

export default MuiTabPanel;
