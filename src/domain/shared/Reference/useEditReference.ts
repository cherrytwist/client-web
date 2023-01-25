import { useRef } from 'react';
import {
  useCreateReferenceOnCardProfileMutation,
  useCreateReferenceOnContextMutation,
  useCreateReferenceOnProfileMutation,
  useDeleteReferenceMutation,
} from '../../../core/apollo/generated/apollo-hooks';

export type PushFunc = (success: boolean) => void;
// TODO this hook needs refactoring - something weird is going on with types here
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RemoveFunc = (obj?: any) => void;
export type AddReferenceFunc = (reference: {
  cardProfileId?: string;
  contextId?: string;
  profileId?: string;
  name: string;
  uri?: string;
  description?: string;
}) => void;

export const useEditReference = () => {
  const remove = useRef<PushFunc | undefined>();
  const push = useRef<RemoveFunc | undefined>();

  const handleError = () => {
    push.current && push.current();
  };

  const [addReferenceOnContext] = useCreateReferenceOnContextMutation({
    onCompleted: data => {
      if (push.current) {
        push.current({
          id: data?.createReferenceOnContext.id,
          name: data?.createReferenceOnContext.name,
          uri: data?.createReferenceOnContext.uri,
        });
      }
    },
  });

  const [addReferenceOnProfile] = useCreateReferenceOnProfileMutation({
    onCompleted: data => {
      if (push.current) {
        push.current({
          id: data?.createReferenceOnProfile.id,
          name: data?.createReferenceOnProfile.name,
          uri: data?.createReferenceOnProfile.uri,
        });
      }
    },
  });

  const [addReferenceOnCardProfile] = useCreateReferenceOnCardProfileMutation({
    onCompleted: data => {
      if (push.current) {
        push.current({
          id: data?.createReferenceOnCardProfile.id,
          name: data?.createReferenceOnCardProfile.name,
          uri: data?.createReferenceOnCardProfile.uri,
        });
      }
    },
  });

  const [deleteReferenceInt] = useDeleteReferenceMutation({
    onError: err => {
      remove.current && remove.current(false);
      handleError(err);
    },
    onCompleted: () => remove.current && remove.current(true),
    //update: removeFromCache,
  });

  const setPush = (pushFn: PushFunc) => {
    push.current = pushFn;
  };

  const setRemove = (removeFn: RemoveFunc) => {
    remove.current = removeFn;
  };

  const addReference: AddReferenceFunc = ({
    cardProfileId,
    contextId,
    profileId,
    name,
    uri = '',
    description = '',
  }) => {
    if (contextId) {
      addReferenceOnContext({
        variables: {
          input: {
            contextID: contextId,
            name: name,
            description: description,
            uri: uri,
          },
        },
      });
    }

    if (profileId) {
      addReferenceOnProfile({
        variables: {
          input: {
            profileID: profileId,
            name: name,
            description: description,
            uri: uri,
          },
        },
      });
    }

    if (cardProfileId) {
      addReferenceOnCardProfile({
        variables: {
          referenceInput: {
            cardProfileID: cardProfileId,
            name: name,
            description: description,
            uri: uri,
          },
        },
      });
    }
  };

  const deleteReference = (id: string) => {
    deleteReferenceInt({
      variables: {
        input: {
          ID: id,
        },
      },
    });
  };

  return {
    addReference,
    deleteReference,
    setPush,
    setRemove,
  };
};
