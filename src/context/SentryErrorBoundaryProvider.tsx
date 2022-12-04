import * as Sentry from '@sentry/react';
import React, { FC } from 'react';
import { ErrorPage } from '../core/pages/Errors/ErrorPage';
import sentryBootstrap from '../services/logging/sentry/bootstrap';
import { useConfig } from '../domain/platform/config/useConfig';

const SentryErrorBoundaryProvider: FC = ({ children }) => {
  const { sentry } = useConfig();
  sentryBootstrap(sentry?.enabled, sentry?.endpoint);

  return <Sentry.ErrorBoundary fallback={({ error }) => <ErrorPage error={error} />}>{children}</Sentry.ErrorBoundary>;
};

export default SentryErrorBoundaryProvider;
