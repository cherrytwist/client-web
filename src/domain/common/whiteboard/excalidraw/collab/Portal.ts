import { isSyncableElement, SocketUpdateData, SocketUpdateDataSource } from './data';
import { ExcalidrawElement } from '@alkemio/excalidraw/types/element/types';
import { PRECEDING_ELEMENT_KEY, WS_EVENTS, WS_SCENE_EVENT_TYPES } from './excalidrawAppConstants';
import { UserIdleState } from './utils';
import { BroadcastedExcalidrawElement } from './reconciliation';
import { Socket } from 'socket.io-client';
import { BinaryFileDataWithUrl } from '../useWhiteboardFilesManager';

interface PortalProps {
  onSaveRequest: () => Promise<{ success: boolean; errors?: string[] }>;
  onCloseConnection: () => void;
  onRoomUserChange: (clients: string[]) => void;
  getSceneElements: () => readonly ExcalidrawElement[];
}

interface BroadcastOptions {
  volatile?: boolean;
}

interface BroadcastSceneOptions {
  syncAll?: boolean;
}

interface ConnectionOptions {
  url: string;
  roomId: string;
  polling?: boolean;
}

interface SocketEventHandlers {
  'client-broadcast': (encryptedData: ArrayBuffer) => void;
  'first-in-room': () => void;
}

class Portal {
  onSaveRequest: () => Promise<{ success: boolean; errors?: string[] }>;
  onCloseConnection: () => void;
  onRoomUserChange: (clients: string[]) => void;
  getSceneElements: () => readonly ExcalidrawElement[];
  socket: Socket | null = null;
  socketInitialized: boolean = false; // we don't want the socket to emit any updates until it is fully initialized
  roomId: string | null = null;
  broadcastedElementVersions: Map<string, number> = new Map();

  constructor({ onSaveRequest, onRoomUserChange, getSceneElements, onCloseConnection }: PortalProps) {
    this.onSaveRequest = onSaveRequest;
    this.onRoomUserChange = onRoomUserChange;
    this.getSceneElements = getSceneElements;
    this.onCloseConnection = onCloseConnection;
  }

  async open(connectionOptions: ConnectionOptions, eventHandlers: SocketEventHandlers) {
    const { default: socketIOClient } = await import('socket.io-client');

    const socket = socketIOClient(connectionOptions.url, {
      transports: connectionOptions.polling ? ['websocket', 'polling'] : ['websocket'],
      path: '/api/private/ws/socket.io',
      retries: 0,
    });

    this.socket = socket;
    this.roomId = connectionOptions.roomId;

    // Initialize socket listeners
    this.socket.on('init-room', () => {
      if (this.socket) {
        this.socket.emit('join-room', this.roomId);
      }
    });

    this.socket.on('new-user', async (_socketId: string) => {
      this.broadcastScene(WS_SCENE_EVENT_TYPES.INIT, this.getSceneElements(), { syncAll: true });
    });

    this.socket.on('room-user-change', (clients: string[]) => {
      this.onRoomUserChange(clients);
    });

    this.socket.on('save-request', async callback => {
      try {
        callback(await this.onSaveRequest());
      } catch (ex) {
        callback({ success: false, errors: [ex?.message ?? ex] });
      }
    });

    this.socket.on('client-broadcast', eventHandlers['client-broadcast']);

    this.socket.on('first-in-room', () => {
      socket.off('first-in-room');
      eventHandlers['first-in-room']();
    });

    this.socket.on('disconnect', () => {
      this.close();
      this.onCloseConnection();
    });

    return socket;
  }

  close() {
    if (!this.socket) {
      return;
    }

    this.socket.close();
    this.socket = null;
    this.roomId = null;
    this.socketInitialized = false;
    this.broadcastedElementVersions = new Map();
  }

  isOpen() {
    return !!(this.socketInitialized && this.socket && this.roomId);
  }

  private _broadcastSocketData(data: SocketUpdateData, { volatile = false }: BroadcastOptions = {}) {
    if (this.isOpen()) {
      const jsonStr = JSON.stringify(data);
      const encryptedBuffer = new TextEncoder().encode(jsonStr).buffer;
      this.socket?.emit(volatile ? WS_EVENTS.SERVER_VOLATILE : WS_EVENTS.SERVER, this.roomId, encryptedBuffer);
    }
  }

  private _broadcastRequestData(data: SocketUpdateData) {
    if (this.isOpen()) {
      const jsonStr = JSON.stringify(data);
      const buffer = new TextEncoder().encode(jsonStr).buffer;
      this.socket?.emit(WS_EVENTS.SERVER_REQUEST_BROADCAST, this.roomId, buffer);
    }
  }

  broadcastScene = async (
    updateType: WS_SCENE_EVENT_TYPES.INIT | WS_SCENE_EVENT_TYPES.UPDATE,
    allElements: readonly ExcalidrawElement[],
    { syncAll = false }: BroadcastSceneOptions = {}
  ) => {
    if (updateType === WS_SCENE_EVENT_TYPES.INIT && !syncAll) {
      throw new Error('syncAll must be true when sending SCENE.INIT');
    }

    // sync out only the elements we think we need to to save bandwidth.
    // periodically we'll resync the whole thing to make sure no one diverges
    // due to a dropped message (server goes down etc).
    const syncableElements = allElements.reduce((acc, element: BroadcastedExcalidrawElement, idx, elements) => {
      if (
        (syncAll ||
          !this.broadcastedElementVersions.has(element.id) ||
          element.version > this.broadcastedElementVersions.get(element.id)!) &&
        isSyncableElement(element)
      ) {
        acc.push({
          ...element,
          // z-index info for the reconciler
          [PRECEDING_ELEMENT_KEY]: idx === 0 ? '^' : elements[idx - 1]?.id,
        });
      }

      return acc;
    }, [] as BroadcastedExcalidrawElement[]);

    const data: SocketUpdateDataSource[typeof updateType] = {
      type: updateType,
      payload: {
        elements: syncableElements,
      },
    };

    for (const syncableElement of syncableElements) {
      this.broadcastedElementVersions.set(syncableElement.id, syncableElement.version);
    }

    this._broadcastSocketData(data as SocketUpdateData);
  };

  broadcastFile = async (file: BinaryFileDataWithUrl) => {
    if (this.socket?.id) {
      const data: SocketUpdateDataSource['FILE_UPLOAD'] = {
        type: 'FILE_UPLOAD',
        payload: {
          socketId: this.socket.id,
          file,
        },
      };

      this._broadcastRequestData(data as SocketUpdateData);
    }
  };

  broadcastFileRequest = (fileIds: string[]) => {
    if (this.socket?.id) {
      const data: SocketUpdateDataSource['FILE_REQUEST'] = {
        type: 'FILE_REQUEST',
        payload: {
          socketId: this.socket.id,
          fileIds,
        },
      };

      this._broadcastRequestData(data as SocketUpdateData);
    }
  };

  broadcastIdleChange = (userState: UserIdleState, username: string) => {
    if (this.socket?.id) {
      const data: SocketUpdateDataSource['IDLE_STATUS'] = {
        type: 'IDLE_STATUS',
        payload: {
          socketId: this.socket.id,
          userState,
          username,
        },
      };
      return this._broadcastSocketData(data as SocketUpdateData, { volatile: true });
    }
  };

  broadcastMouseLocation = (payload: {
    pointer: SocketUpdateDataSource['MOUSE_LOCATION']['payload']['pointer'];
    button: SocketUpdateDataSource['MOUSE_LOCATION']['payload']['button'];
    selectedElementIds: Readonly<{
      [id: string]: true;
    }>;
    username: string;
  }) => {
    if (this.socket?.id) {
      const data: SocketUpdateDataSource['MOUSE_LOCATION'] = {
        type: 'MOUSE_LOCATION',
        payload: {
          socketId: this.socket.id,
          ...payload,
        },
      };
      return this._broadcastSocketData(data as SocketUpdateData, { volatile: true });
    }
  };

  broadcastSavedEvent = (username: string) => {
    if (this.socket?.id) {
      const data: SocketUpdateDataSource['SAVED'] = {
        type: 'SAVED',
        payload: {
          socketId: this.socket.id,
          username,
        },
      };
      return this._broadcastSocketData(data as SocketUpdateData);
    }
  };
}

export default Portal;
