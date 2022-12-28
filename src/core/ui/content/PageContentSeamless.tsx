import { forwardRef } from 'react';
import { Box, BoxProps, SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { gutters, useGridItem } from '../grid/utils';
import GridProvider from '../grid/GridProvider';
import SwapColors from '../palette/SwapColors';
import { useDeclaredColumns } from '../grid/GridContext';

export interface PageContentSeamlessProps extends BoxProps {
  accent?: boolean;
  disablePadding?: boolean;
  disableGap?: boolean;
  halfWidth?: boolean;
  columns?: number;
}

const borderWidth = '1px';

const PageContentSeamless = forwardRef<HTMLDivElement, PageContentSeamlessProps>(
  ({ accent = false, disablePadding = false, disableGap = false, halfWidth = false, columns, sx, ...props }, ref) => {
    const gridColumns = useDeclaredColumns();

    const getGridItemStyle = useGridItem();

    const columnsTaken = halfWidth ? gridColumns / 2 : columns;

    const mergedSx: Partial<SxProps<Theme>> = {
      padding: disablePadding ? undefined : theme => `calc(${gutters()(theme)} - ${borderWidth})`,
      display: disableGap ? undefined : 'flex',
      flexDirection: disableGap ? undefined : 'column',
      gap: disableGap ? undefined : gutters(),
      ...getGridItemStyle(columnsTaken),
      ...sx,
    };

    return (
      <SwapColors swap={accent}>
        <GridProvider columns={columnsTaken ?? gridColumns}>
          <Box ref={ref} sx={mergedSx} {...props} />
        </GridProvider>
      </SwapColors>
    );
  }
);

export default PageContentSeamless;
