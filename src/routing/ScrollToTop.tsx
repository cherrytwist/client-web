// copied from https://reactrouter.com/web/guides/scroll-restoration/scroll-to-top
// If a route doesn't require scrolling to top the `Route` component can be extended with option to enable/diable
// scrolling on top.

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
