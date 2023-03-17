import * as Sentry from '@sentry/react';
import { User } from '../../../core/apollo/generated/graphql-schema';

export const setUserScope = (user: User | undefined, piiEnabled?: boolean) => {
  if (user && piiEnabled) {
    Sentry.setUser({ id: user.id, username: user.profile.displayName, email: user.email });
  } else {
    Sentry.configureScope(scope => scope.setUser(null));
  }
};

export interface TransactionScope {
  type: 'admin' | 'authentication' | 'connect(search)' | 'domain';
}

export const setTransactionScope = (tScope: TransactionScope) => {
  Sentry.configureScope(scope => scope.setTransactionName(tScope.type));
};
