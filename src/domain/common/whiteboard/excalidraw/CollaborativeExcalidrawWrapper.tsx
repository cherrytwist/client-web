import { Excalidraw } from '@alkemio/excalidraw';
import { ExportedDataState } from '@alkemio/excalidraw/types/data/types';
import {
  AppState,
  BinaryFiles,
  ExcalidrawAPIRefValue,
  ExcalidrawImperativeAPI,
  ExcalidrawProps,
  ExportOpts,
} from '@alkemio/excalidraw/types/types';
import BackupIcon from '@mui/icons-material/Backup';
import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { debounce, merge } from 'lodash';
import React, { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { useCombinedRefs } from '../../../shared/utils/useCombinedRefs';
import EmptyWhiteboard from '../EmptyWhiteboard';
import { ExcalidrawElement } from '@alkemio/excalidraw/types/element/types';
import Collab, { CollabAPI } from './collab/Collab';
import { useUserContext } from '../../../community/user';

const useActorWhiteboardStyles = makeStyles(theme => ({
  container: {
    height: '100%',
    flexGrow: 1,
  },
  '@global': {
    '.excalidraw-modal-container': {
      zIndex: `${theme.zIndex.modal + 1} !important`,
    },
  },
  excalidrawAlkemioBackground: {
    background: `${theme.palette.primary.dark} !important`,
  },
}));

export interface WhiteboardWhiteboardEntities {
  whiteboard: { id?: string; content: string } | undefined;
}

export interface WhiteboardWhiteboardActions {
  onUpdate?: (state: ExportedDataState) => void;
}

export interface WhiteboardWhiteboardOptions extends ExcalidrawProps {}

export interface WhiteboardWhiteboardProps {
  entities: WhiteboardWhiteboardEntities;
  options?: WhiteboardWhiteboardOptions;
  actions: WhiteboardWhiteboardActions;
}

const WHITEBOARD_UPDATE_DEBOUNCE_INTERVAL = 100;
const WINDOW_SCROLL_HANDLER_DEBOUNCE_INTERVAL = 100;

const CollaborativeExcalidrawWrapper = forwardRef<ExcalidrawAPIRefValue | null, WhiteboardWhiteboardProps>(
  ({ entities, actions, options }, excalidrawRef) => {
    const { whiteboard } = entities;

    const [collabAPI, setCollabAPIRef] = useState<CollabAPI>();

    const styles = useActorWhiteboardStyles();
    //    const [excalidrawAPI, excalidrawRefCallback] = useCallbackRefState<ExcalidrawImperativeAPI>();
    const combinedRef = useCombinedRefs<ExcalidrawAPIRefValue | null>(null, excalidrawRef);

    const { user } = useUserContext();
    const username = user?.user.profile.displayName ?? 'User'; //!!

    const data = useMemo(() => {
      const parsedData = whiteboard?.content ? JSON.parse(whiteboard?.content) : EmptyWhiteboard;
      return {
        ...parsedData,
        zoomToFit: true,
      };
    }, [whiteboard?.content]);

    const refreshOnDataChange = useRef(
      debounce(async (state: Parameters<ExcalidrawImperativeAPI['updateScene']>[0]) => {
        const excalidraw = await combinedRef.current?.readyPromise;
        excalidraw?.updateScene(state);
        excalidraw?.zoomToFit();
      }, WHITEBOARD_UPDATE_DEBOUNCE_INTERVAL)
    ).current;

    useEffect(() => {
      // apparently when a whiteboard state is changed too fast
      // it is not reflected by excalidraw (they don't have internal debounce for state change)
      refreshOnDataChange(data);
      return refreshOnDataChange.cancel;
    }, [refreshOnDataChange, data]);

    const scrollToContent = async () => {
      const excalidraw = await combinedRef.current?.readyPromise;
      excalidraw?.scrollToContent();
    };

    useEffect(() => {
      if (whiteboard?.id) {
        scrollToContent();
      }
    }, [whiteboard?.id, scrollToContent]);

    const handleScroll = useRef(
      debounce(async () => {
        const excalidraw = await combinedRef.current?.readyPromise;
        excalidraw?.refresh();
      }, WINDOW_SCROLL_HANDLER_DEBOUNCE_INTERVAL)
    ).current;

    useEffect(() => {
      window.addEventListener('scroll', handleScroll, true);

      return () => {
        handleScroll.cancel();
        window.removeEventListener('scroll', handleScroll, true);
      };
    }, [handleScroll]);

    const renderCustomUI = useMemo<ExportOpts['renderCustomUI']>(
      () => (exportedElements, appState) =>
        (
          <Box className={'Card'}>
            <Box className={`Card-icon ${styles.excalidrawAlkemioBackground}`}>
              <BackupIcon />
            </Box>
            <h2>Save to the Alkemio</h2>
            <Box className={'Card-details'}>Save the scene in Alkemio and share it with others.</Box>
            <button
              className={`ToolIcon_type_button ToolIcon_size_m Card-button ToolIcon_type_button--show ToolIcon ${styles.excalidrawAlkemioBackground}`}
              title="Save to Alkemio"
              aria-label="Save to Alkemio"
              type="button"
              onClick={async () => {
                if (actions.onUpdate) {
                  await actions.onUpdate({ ...(data as ExportedDataState), elements: exportedElements, appState });
                  const element = document.body.getElementsByClassName('Modal__close')[0];
                  ReactDOM.findDOMNode(element)?.dispatchEvent(
                    new MouseEvent('click', { view: window, cancelable: true, bubbles: true })
                  );
                }
              }}
            >
              <div className="ToolIcon__label">Save to Alkemio</div>
            </button>
          </Box>
        ),
      [data, actions, styles.excalidrawAlkemioBackground]
    );

    const UIOptions: ExcalidrawProps['UIOptions'] = useMemo(
      () => ({
        canvasActions: {
          export: {
            saveFileToDisk: true,
            renderCustomUI,
          },
        },
      }),
      [renderCustomUI]
    );

    const { UIOptions: externalUIOptions, ...restOptions } = options || {};

    const mergedUIOptions = useMemo(() => merge(UIOptions, externalUIOptions), [UIOptions, externalUIOptions]);

    const onChange = (elements: readonly ExcalidrawElement[], _appState: AppState, _files: BinaryFiles) => {
      collabAPI?.syncElements(elements);
    };

    useEffect(() => {
      if (collabAPI && whiteboard?.id) {
        console.log('startCollaboration!', whiteboard.id);
        collabAPI.startCollaboration({
          roomId: whiteboard.id,
        });
      } else {
        console.log('didnt start collaboration!', whiteboard?.id, collabAPI);
      }
      return () => collabAPI?.stopCollaboration();
    }, [collabAPI, whiteboard?.id]);
    console.log('combinedRef.current', combinedRef.current, excalidrawRef);
    return (
      <div className={styles.container}>
        {whiteboard && (
          <Excalidraw
            key={whiteboard.id} // initializing a fresh Excalidraw for each whiteboard
            ref={combinedRef}
            initialData={data}
            UIOptions={mergedUIOptions}
            isCollaborating
            gridModeEnabled
            onChange={onChange}
            onPointerUpdate={collabAPI?.onPointerUpdate}
            detectScroll={false}
            autoFocus
            /*renderTopRightUI={_isMobile => {
              return <LiveCollaborationStatus />;
            }}*/
            {...restOptions}
          />
        )}
        {combinedRef.current && (
          <Collab username={username} excalidrawAPI={combinedRef.current} collabAPIRef={setCollabAPIRef} />
        )}
      </div>
    );
  }
);

export default CollaborativeExcalidrawWrapper;
