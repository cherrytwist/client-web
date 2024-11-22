import { ConfigurationDocument } from '@/core/apollo/generated/apollo-hooks';
import { ConfigurationQuery } from '@/core/apollo/generated/graphql-schema';
import queryRequest from '@/core/http/queryRequest';
import { TagCategoryValues, warn as logWarn } from '@/core/logging/sentry/log';
import Loading from '@/core/ui/loading/Loading';
import useLoadingStateWithHandlers from '@/domain/shared/utils/useLoadingStateWithHandlers';
import { ApolloError } from '@apollo/client';
import React, { FC, PropsWithChildren, useEffect, useState } from 'react';
import { Configuration } from './configuration';

export interface ConfigContextProps {
  config?: Configuration;
  loading: boolean;
  error?: ApolloError;
}

interface ConfigProviderProps extends PropsWithChildren {
  url: string;
}

const ConfigContext = React.createContext<ConfigContextProps>({
  config: undefined,
  loading: false,
  error: undefined,
});

const ConfigProvider: FC<ConfigProviderProps> = ({ children, url }) => {
  const [config, setConfig] = useState<Configuration | undefined>();

  const [requestConfig, loading, error] = useLoadingStateWithHandlers(
    async (url: string) => {
      const result = await queryRequest<ConfigurationQuery>(url, ConfigurationDocument);
      setConfig(result.data.data.platform.configuration);
    },
    {
      onError: err => logWarn(err, { category: TagCategoryValues.CONFIG }),
    }
  );

  useEffect(() => {
    requestConfig(url);
  }, [url]);

  if (loading || (!config && !error)) {
    return <Loading text={'Loading configuration ...'} />;
  }

  return (
    <ConfigContext.Provider
      value={{
        config,
        loading,
        error: error && new ApolloError({ errorMessage: error.message }),
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

export { ConfigContext, ConfigProvider };
