import React, { cloneElement, MouseEventHandler, ReactElement, useState } from 'react';
import { ClickAwayListener, Tooltip, TooltipProps } from '@mui/material';

export interface TriggerProps {
  onClick?: MouseEventHandler;
}

interface TitleProps {
  onClose?: () => void;
}

interface ClickableTooltipProps extends Omit<TooltipProps, 'children'> {
  children: ({ onClick }: TriggerProps) => ReactElement;
  title: ReactElement<TitleProps>;
}

enum OpenTriggerAction {
  Click = 'Click',
  Hover = 'Hover',
}

const ClickableTooltip = ({ title, children, ...tooltipProps }: ClickableTooltipProps) => {
  const [openBy, setOpenBy] = useState<OpenTriggerAction | null>(null);

  const handleClickAway = () => setOpenBy(null);

  const handleTriggerClick = () => setOpenBy(OpenTriggerAction.Click);

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Tooltip
        title={cloneElement(title, { onClose: () => setOpenBy(null) })}
        open={!!openBy}
        onOpen={() => setOpenBy(OpenTriggerAction.Hover)}
        onClose={() => setOpenBy(prevOpenBy => (prevOpenBy === OpenTriggerAction.Hover ? null : prevOpenBy))}
        {...tooltipProps}
      >
        {children({ onClick: handleTriggerClick })}
      </Tooltip>
    </ClickAwayListener>
  );
};

export default ClickableTooltip;
