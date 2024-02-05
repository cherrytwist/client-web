import NavigationBar, { NAVIGATION_CONTENT_HEIGHT_GUTTERS } from '../../../core/ui/navigation/NavigationBar';
import PlatformNavigationUserAvatar from './PlatformNavigationUserAvatar';
import PlatformSearch from '../platformSearch/PlatformSearch';
import PlatformNavigationMenuButton from './PlatformNavigationMenuButton';
import { Box, MenuItem, Slide, Theme, useMediaQuery } from '@mui/material';
import React, { cloneElement, ReactElement, Ref, useLayoutEffect, useRef, useState } from 'react';
import PlatformNavigationUserMenu, { UserMenuDivider } from './PlatformNavigationUserMenu';
import UserMenuPlatformNavigationSegment from './platformNavigationMenu/UserMenuPlatformNavigationSegment';
import NavigationBarSideContent from '../../../core/ui/navigation/NavigationBarSideContent';
import { gutters } from '../../../core/ui/grid/utils';
import { Collapsible } from '../../../core/ui/navigation/Collapsible';
import { UncontrolledExpandable } from '../../../core/ui/navigation/UncontrolledExpandable';
import { useResizeDetector } from 'react-resize-detector';
import { GUTTER_PX } from '../../../core/ui/grid/constants';
import PlatformNavigationUncollapse from './PlatformNavigationUncollapse';
import SkipLink from '../../../core/ui/keyboardNavigation/SkipLink';
import { useTranslation } from 'react-i18next';
import PoweredBy from '../poweredBy/PoweredBy';

export interface PlatformNavigationBarProps {
  breadcrumbs?: ReactElement<UncontrolledExpandable & { ref: Ref<Collapsible> }>;
}

const DEFAULT_BOUNDING_CLIENT_RECT = {
  right: 0,
} as const;

const PlatformNavigationBar = ({ breadcrumbs }: PlatformNavigationBarProps) => {
  const isMobile = useMediaQuery<Theme>(theme => theme.breakpoints.down('lg'));

  const [areBreadcrumbsHidden, setAreBreadcrumbsHidden] = useState(false);

  const breadcrumbsContainerRef = useRef<HTMLDivElement>(null);

  const buttonsContainerRef = useRef<HTMLDivElement>(null);

  const uncollapseButtonRef = useRef<HTMLButtonElement>(null);

  const [rightSideShift, setRightSideShift] = useState(0);

  const breadcrumbsRef = useRef<Collapsible>(null);
  const searchBoxRef = useRef<Collapsible>(null);

  const handleExpandSearch = (isExpanded: boolean) => {
    setAreBreadcrumbsHidden(isMobile && isExpanded);
    if (isExpanded) {
      breadcrumbsRef.current?.collapse();
    }
  };

  const handleExpandBreadcrumbs = (areExpanded: boolean) => {
    if (areExpanded) {
      searchBoxRef.current?.collapse();
    }

    if (!isMobile || !areExpanded) {
      setRightSideShift(0);
      return;
    }

    const { right: containerRight } =
      buttonsContainerRef.current?.getBoundingClientRect() ?? DEFAULT_BOUNDING_CLIENT_RECT;
    const { right: contentRight } =
      uncollapseButtonRef.current?.getBoundingClientRect() ?? DEFAULT_BOUNDING_CLIENT_RECT;

    setRightSideShift(prevShift => prevShift || containerRight - contentRight);
  };

  const { height: breadcrumbsHeight = 0, ref: breadcrumbsWrapperRef } = useResizeDetector();

  const breadcrumbsVerticalShift =
    breadcrumbsHeight > GUTTER_PX * 2 ? (NAVIGATION_CONTENT_HEIGHT_GUTTERS * GUTTER_PX - breadcrumbsHeight) / 2 : 0;

  useLayoutEffect(() => {
    breadcrumbsRef.current?.collapse();
    searchBoxRef.current?.collapse();
  }, [isMobile]);

  const { t } = useTranslation();

  return (
    <NavigationBar>
      <SkipLink anchor={() => document.querySelector('main')}>{t('components.navigation.skipMenu')}</SkipLink>

      <NavigationBarSideContent ref={buttonsContainerRef}>
        <Box
          display="flex"
          gap={gutters(0.5)}
          padding={gutters(0.5)}
          justifyContent="end"
          position="relative"
          sx={{
            transform: `translateX(${rightSideShift}px)`,
            transition: theme =>
              `transform ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut}`,
          }}
        >
          <PlatformSearch ref={searchBoxRef} onExpand={handleExpandSearch} compact={isMobile}>
            <PlatformNavigationUncollapse ref={uncollapseButtonRef} visible={rightSideShift !== 0} />
          </PlatformSearch>
          {!isMobile && <PlatformNavigationMenuButton />}
          <PlatformNavigationUserAvatar drawer={isMobile}>
            <PlatformNavigationUserMenu
              surface={!isMobile}
              footer={
                isMobile && (
                  <>
                    <UserMenuDivider />
                    <Box component={MenuItem} paddingY={gutters(0.5)}>
                      <PoweredBy preview />
                    </Box>
                  </>
                )
              }
            >
              {isMobile && <UserMenuPlatformNavigationSegment />}
              {isMobile && <UserMenuDivider />}
            </PlatformNavigationUserMenu>
          </PlatformNavigationUserAvatar>
        </Box>
      </NavigationBarSideContent>

      <NavigationBarSideContent
        ref={breadcrumbsContainerRef}
        sx={{
          pointerEvents: 'none',
          transform: `translateY(${breadcrumbsVerticalShift}px)`,
          transition: theme => `transform ${theme.transitions.duration.shortest}ms linear`,
        }}
      >
        <Slide in={!areBreadcrumbsHidden} container={breadcrumbsContainerRef.current} direction="right">
          <Box ref={breadcrumbsWrapperRef} display="flex">
            {breadcrumbs && cloneElement(breadcrumbs, { ref: breadcrumbsRef, onExpand: handleExpandBreadcrumbs })}
          </Box>
        </Slide>
      </NavigationBarSideContent>
    </NavigationBar>
  );
};

export default PlatformNavigationBar;
