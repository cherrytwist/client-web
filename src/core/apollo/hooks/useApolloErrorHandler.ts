import { ApolloError } from '@apollo/client';
import { GraphQLError } from 'graphql';
import { Severity } from '../../state/global/notifications/notificationMachine';
import { useTranslation } from 'react-i18next';
import { error as logError } from '../../../services/logging/sentry/log';
import { useNotification } from '../../ui/notifications/useNotification';
import { i18n, TFunction } from 'i18next';

// those match the AlkemioErrorStatus on the server, but not all of them are used in the graphql errors
enum GraphQLErrorsExtensionCodes {
  BAD_USER_INPUT = 'BAD_USER_INPUT',
  ENTITY_NOT_FOUND = 'ENTITY_NOT_FOUND',
}

const tryGetField = (errorMessage: string): string | undefined => {
  let matches = errorMessage?.match(/property ([\w-]+) has failed/);
  return matches ? matches[1] : undefined;
};

const getTranslationForCode = (error: GraphQLError, t: TFunction,i18n: i18n) => {
  const code = error.extensions?.code as string;
  if (!code) {
    // if code missing send a generic error text
    return t('apollo.errors.generic');
  }

  const key = `apollo.errors.${code}`;

  if(!i18n.exists(key)) {
    // if the error text is missing for that code
    // send a generic error text with code
    return t('apollo.errors.generic-with-code', { code });
  }
  // send the error text
  return t(key);
};

export const useApolloErrorHandler = (severity: Severity = 'error') => {
  const { t, i18n } = useTranslation();
  const notify = useNotification();

  const handleNetworkErrors = (error: ApolloError) => {
    const networkError = error.networkError;
    if (networkError && 'result' in networkError && networkError.result && networkError.result.errors) {
      const error = networkError.result.errors[0] as GraphQLError;
      notify(error.message, severity);
    }
  };

  const handleGraphQLErrors = (error: ApolloError) => {
    const graphqlErrors = error.graphQLErrors;

    graphqlErrors.forEach((error: GraphQLError) => {
      /*switch (error.extensions?.code) {
        case GraphQLErrorsExtensionCodes.BAD_USER_INPUT: {
          const field = tryGetField(error.message);
          if (field) {
            notify(t('apollo.errors.bad-user-input-withfield', { field }), severity);
          } else {
            notify(t('apollo.errors.bad-user-input'), severity);
          }
          break;
        }
      }*/

      const translation = getTranslationForCode(error, t, i18n);
      if (translation) {
        notify(translation, severity);
      }

      logError(error);
    });
  };

  const handleClientErrors = (error: ApolloError) => {
    if (error.clientErrors && error.clientErrors.length > 0) {
      notify(error.message, severity);
    }
  };

  return (error: ApolloError) => {
    handleNetworkErrors(error);
    handleGraphQLErrors(error);
    handleClientErrors(error);
  };
};
