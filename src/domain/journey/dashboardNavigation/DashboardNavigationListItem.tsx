import { type MouseEventHandler } from 'react';

import { type TooltipProps } from '@mui/material';

import { type Identifiable } from '@/core/utils/Identifiable';

import { type DashboardNavigationItemViewProps } from './DashboardNavigationItemView';
import { type DashboardNavigationItem } from '../space/spaceDashboardNavigation/useSpaceDashboardNavigation';

export interface DashboardNavigationItemProps extends DashboardNavigationItem {
  tooltipPlacement?: TooltipProps['placement'];
  currentPath: string[];
  subspaceOfCurrent?: boolean;
  level?: number;
  onClick?: MouseEventHandler;
  onToggle?: (isExpanded: boolean) => void;
  compact?: boolean;
  onCreateSubspace?: (parent: Identifiable) => void;
  itemProps?:
    | Partial<DashboardNavigationItemViewProps>
    | ((item: DashboardNavigationItem) => Partial<DashboardNavigationItemViewProps>);
}

export const DashboardNavigationListItem = () =>
  // {
  // id,
  // url,
  // avatar,
  // level = 0,
  // currentPath,
  // displayName,
  // compact = false,
  // tooltipPlacement,
  // subspaceOfCurrent = false,
  // canCreateSubspace = false,
  // private: isPrivate = false,
  // onClick,
  // onToggle,
  // onCreateSubspace,
  // itemProps = () => ({}),
  // }: DashboardNavigationItemProps
  {
    return <h1>shurets</h1>;
  };
