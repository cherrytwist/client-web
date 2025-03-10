import { SvgIcon, SvgIconProps } from '@mui/material';

import CalloutIconIconSvg from './CalloutIcon.svg?react';

/**
 * @deprecated CalloutIcon is deprecated.
 */
const CalloutIcon = (props: SvgIconProps) => <SvgIcon component={CalloutIconIconSvg} inheritViewBox {...props} />;

CalloutIcon.muiName = 'Callout';

export { CalloutIcon };
