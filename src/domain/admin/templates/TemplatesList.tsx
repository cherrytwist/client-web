import React, { PropsWithChildren } from 'react';
import { Box } from '@mui/material';

const TemplatesList = ({ children }: PropsWithChildren<{}>) => {
  return (
    <Box display="flex" flexWrap="wrap" columnGap={8} rowGap={3} justifyContent="center">
      {children}
    </Box>
  );
};

export default TemplatesList;
