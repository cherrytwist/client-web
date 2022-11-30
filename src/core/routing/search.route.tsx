import React, { FC, useMemo } from 'react';
import { useTransactionScope } from '../../hooks';
import { SearchPage } from '../../domain/platform/pages/Search/SearchPage';

export const SearchRoute: FC = () => {
  useTransactionScope({ type: 'connect(search)' });

  const currentPaths = useMemo(() => [], []);

  return <SearchPage paths={currentPaths} />;
};
