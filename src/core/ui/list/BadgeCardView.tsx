import React, { cloneElement, forwardRef, PropsWithChildren, ReactElement } from 'react';
import { Box, BoxProps } from '@mui/material';
import { BoxTypeMap } from '@mui/material/Box/Box';
import { gutters } from '../grid/utils';

interface BadgeCardViewProps {
  visual?: ReactElement<{ sx: { flexShrink: number } }>;
  visualRight?: ReactElement<{ sx: { flexShrink: number } }>;
  contentProps?: BoxProps;
}

const cloneVisual = <Sx extends { flexShrink: number }>(element: ReactElement<{ sx: Partial<Sx> }> | undefined) => {
  if (!element) {
    return undefined;
  }

  const { sx } = element.props;

  return cloneElement(element, {
    sx: {
      flexShrink: 0,
      ...sx,
    },
  });
};

const BadgeCardView = forwardRef(
  <D extends React.ElementType = BoxTypeMap['defaultComponent'], P = {}>(
    {
      visual,
      visualRight,
      children,
      contentProps,
      ...containerProps
    }: PropsWithChildren<BadgeCardViewProps> & BoxProps<D, P>,
    ref
  ) => {
    return (
      <Box ref={ref} display="flex" alignItems="center" gap={gutters()} {...containerProps}>
        {cloneVisual(visual)}
        <Box overflow="hidden" flexGrow={1} minWidth={0} {...contentProps}>
          {children}
        </Box>
        {cloneVisual(visualRight)}
      </Box>
    );
  }
);

export default BadgeCardView;
