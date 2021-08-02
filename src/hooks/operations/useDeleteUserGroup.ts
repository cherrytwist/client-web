import { ApolloError } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { useDeleteGroupMutation } from '../generated/graphql';
import { DeleteGroupMutation } from '../../models/graphql-schema';
import { useApolloErrorHandler } from '../graphql/useApolloErrorHandler';
import { useNotification } from '../useNotification';
import evictFromCache from '../../utils/evictFromCache';

type Options = {
  onComplete?: (data: DeleteGroupMutation) => void;
  onError?: (error: ApolloError) => void;
};

export const useDeleteUserGroup = (options?: Options) => {
  const { t } = useTranslation();
  const handleError = useApolloErrorHandler();
  const notify = useNotification();

  const success = (message: string) => notify(message, 'success');

  const [deleteGroup, { loading, error }] = useDeleteGroupMutation({
    onCompleted: data => {
      success(t('operations.user-group.deleted-successfuly', { name: data.deleteUserGroup.name }));
      options && options.onComplete && options.onComplete(data);
    },
    onError: (options && options.onError && options.onError) || handleError,

    update: evictFromCache,
  });

  const handleDelete = (id: string) => {
    deleteGroup({
      variables: {
        input: {
          ID: id,
        },
      },
    });
  };

  return {
    handleDelete,
    loading,
    error,
  };
};
