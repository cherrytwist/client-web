import { useRef, useState } from 'react';
import { useUploadFileMutation } from '../../../../core/apollo/generated/apollo-hooks';
import {
  BinaryFileData,
  ExcalidrawAPIRefValue,
} from '@alkemio/excalidraw/types/types';
import { bytesToHexString } from './collab/utils';
import { FileId } from '@alkemio/excalidraw/types/element/types';
import { IMAGE_MIME_TYPES } from '@alkemio/excalidraw/types/constants';


const dataUrlToFile = async (
  dataUrl: string,
  fileName: string = '',
  mimeType: string | undefined = undefined,
  lastModified: number = (new Date()).getTime()
): Promise<File> => {
  const res = await fetch(dataUrl);
  const type = mimeType ?? dataUrl.substring(dataUrl.indexOf(':') + 1, dataUrl.indexOf(';'));
  const data = new Uint8Array(await res.arrayBuffer());
  const blob = new Blob([data], { type });
  return new File([blob], fileName, { type, lastModified })
}

const fetchFileToDataURL = async (url: string): Promise<string> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch file from ${url}`);
  }
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      console.log('downloaded ', url, reader.result);
      resolve(reader.result as string);
    };
    reader.onerror = () => {
      reject(reader.error);
    };
  });
}

///// This is copied from Excalidraw sources because VITE cannot import generateIdFromFile
// TODO: import it properly
export const blobToArrayBuffer = (blob: Blob): Promise<ArrayBuffer> => {
  if ('arrayBuffer' in blob) {
    return blob.arrayBuffer();
  }
  // Safari
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (!event.target?.result) {
        return reject(new Error("Couldn't convert blob to ArrayBuffer"));
      }
      resolve(event.target.result as ArrayBuffer);
    };
    reader.readAsArrayBuffer(blob);
  });
};

/** generates SHA-1 digest from supplied file */
export const generateIdFromFile = async (file: File): Promise<FileId> => {
  const hashBuffer = await window.crypto.subtle.digest(
    'SHA-1',
    await blobToArrayBuffer(file),
  );
  return bytesToHexString(new Uint8Array(hashBuffer)) as FileId;
};

////// ----- End of Excalidraw Copy&Paste


type BinaryFileDataExtended = BinaryFileData & { url? : string }
interface WhiteboardFiles {
  files?: Record<string, BinaryFileDataExtended>;
}

interface Props {
  storageBucketId: string | undefined;
  excalidrawApi: ExcalidrawAPIRefValue | null;
}

const useWhiteboardFilesManager = ({ storageBucketId, excalidrawApi }: Props) => {

  /**
   * Stores all the files temporarily:
   * - Files that come from loadFiles, downloaded when the wb json is loaded into excalidraw and the files are requested from their Urls
   * - Files that are added by the user to the wb when editing and are uploaded
   * - ... something for the realtime
   */
  const fileStore = useRef<Record<string, BinaryFileDataExtended>>({});
  const [fileStoreVersion, setFileStoreVersion] = useState(0);
  const fileStoreAddFile = (fileId: string, file: BinaryFileDataExtended) => {
    fileStore.current = { ...fileStore.current, [fileId]: file };
    setFileStoreVersion(fileStoreVersion => fileStoreVersion + 1);
  }


  const [downloadingFiles, setDownloadingFiles] = useState(false);
  const [uploadFile, { loading: uploadingFile }] = useUploadFileMutation();

  /**
   * Generates the fileId using the Excalidraw's internal function (the SHA-1 of the content).
   * Uploads the file to the storageBucket
   * Stores the file with the storageBucket url in fileStore.
   * @param file: File
   * @returns FileId
   */
  const addNewFile = async (file: File): Promise<string> => {
    if (!storageBucketId) {
      throw new Error('Missing StorageBucket: Uploading images to this whiteboard is not supported');
    }

    const fileId = await generateIdFromFile(file);
    if (fileStore.current[fileId]) {
      log('file was already in our store', fileId, fileStore.current[fileId]);
      return fileId;
    }

    log('uploading new file', fileId, file);
    const { data, errors } = await uploadFile({
      variables: {
        file,
        uploadData: {
          storageBucketId
        }
      }
    });
    if (!data?.uploadFileOnStorageBucket || errors) {
      log('Error uploading!', data, errors);
      return Promise.reject(errors?.[0]?.message);
    }
    log('newFile uploaded', fileId, data.uploadFileOnStorageBucket);
    const excalidraw = await excalidrawApi?.readyPromise;
    const fileFromExcalidraw = excalidraw?.getFiles()?.[fileId];
    if (fileFromExcalidraw) {
      fileStoreAddFile(fileId, {
        ...fileFromExcalidraw,
        url: data.uploadFileOnStorageBucket
      });
    } else {
      fileStoreAddFile(fileId, {
        id: fileId,
        mimeType: 'application/octet-stream',
        created: (new Date()).getTime(),
        url: data.uploadFileOnStorageBucket,
        dataURL: '' as string & { _brand: 'DataURL'; },
      });
    }

    return fileId;
  }


  const log = (...args) => {
    console.log('[FileManager]', ...args);
  }

  const loadFiles = async <W extends WhiteboardFiles>(data: WhiteboardFiles | undefined): Promise<void> => {
    if (!data?.files) {
      log('No files to download');
      return;
    }
    const files = data.files;

    const pendingFileIds = Object.keys(files).filter(fileId => !files[fileId]?.dataURL);
    log('I need to download these files', pendingFileIds);
    const newFiles: typeof files = {};
    setDownloadingFiles(true);
    for(const fileId of pendingFileIds) {
      const file = data.files[fileId];
      if (file.url) {
        log('DOWNLOADING ', file);
        const dataURL = await fetchFileToDataURL(file.url);
        newFiles[fileId] = { ...file, dataURL } as BinaryFileDataExtended;
        fileStoreAddFile(fileId, newFiles[fileId]);
      } else {
        log('Cannot download', file);
      }
    }
    setDownloadingFiles(false);
  };

  const importFilesToExcalidraw = async () => {
    const excalidraw = await excalidrawApi?.readyPromise;
    if (!excalidraw || !fileStore.current) {
      log('excalidrawApi not ready yet or no files', excalidraw, fileStore.current);
      return;
    }

    // Files currently linked from the Excalidraw drawing and don't have content:
    const currentFiles = excalidraw.getFiles();
    const currentFilesWithContent = Object.keys(currentFiles).filter(fileId => !!currentFiles[fileId].dataURL);

    const missingFiles = Object.keys(fileStore.current).filter(fileId => !currentFilesWithContent.includes(fileId)).map(fileId => fileStore.current[fileId]);
    excalidraw.addFiles(missingFiles);
  }


  const removeExcalidrawAttachedFiles = async <W extends WhiteboardFiles>(whiteboard: W): Promise<W> => {
    if (!whiteboard?.files) {
      log('no whiteboard or no files', whiteboard);
      return whiteboard;
    }
    const { files, ...rest } = whiteboard;
    const filesNext: Record<string, BinaryFileDataExtended> = {};

    for(const fileId of Object.keys(files)) {
      const file = files[fileId] as BinaryFileDataExtended;
      if (file.url) {
        // The url was already set, just copy the rest of the properties and remove dataURL:
        filesNext[fileId] = { ...file, dataURL: '' } as BinaryFileDataExtended;
      } else if (fileStore.current[fileId]) {
        // The file is in the fileStore, so it has been uploaded at some point, take the url from there:
        filesNext[fileId] = { ...file, dataURL: '', url: fileStore.current[fileId].url } as BinaryFileDataExtended;
      } else if (file.dataURL) {
        log('NEED TO UPLOAD ', fileId, file);
        const fileObject = await dataUrlToFile(file.dataURL, '', file.mimeType, file.created);
        const id = await addNewFile(fileObject);
        log('Uploaded ', fileId, file, id);
        filesNext[fileId] = { ...file, url: fileStore.current[fileId].url, dataURL: '' } as BinaryFileDataExtended;

      } else {
        log('I have no url or dataURL, ignore this file', file);
      }
    }
    return { files: filesNext, ...rest } as W;
  }

  return {
    addNewFile,
    loadFiles, // Load external files into Excalidraw
    importFilesToExcalidraw,
    removeExcalidrawAttachedFiles,
    fileStoreVersion,
    loading: {
      uploadingFile,
      downloadingFiles,
    }
  };
}

export default useWhiteboardFilesManager;