import { useActorRef } from '@xstate/react';
import { FC, PropsWithChildren, createContext, useMemo } from 'react';
import { notificationMachine } from './global/notifications/notificationMachine';
import { loginNavigationMachine } from './global/ui/loginNavigationMachine';
import { userSegmentMachine } from './global/ui/userSegmentMachine';

// TODO replace any with correct types below
interface GlobalStateContextProps {
  ui: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    loginNavigationService: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    userSegmentService: any;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  notificationsService: any;
}

export const GlobalStateContext = createContext<GlobalStateContextProps | undefined>(undefined);

export const GlobalStateProvider: FC<PropsWithChildren> = ({ children }) => {
  const loginNavigationService = useActorRef(loginNavigationMachine);
  const userSegmentService = useActorRef(userSegmentMachine);
  const notificationsService = useActorRef(notificationMachine);

  const ui = useMemo(
    () => ({ loginNavigationService, userSegmentService }),
    [loginNavigationService, userSegmentService]
  );

  return (
    <GlobalStateContext.Provider
      value={{
        ui: ui,
        notificationsService,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};
