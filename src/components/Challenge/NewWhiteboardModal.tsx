import { Formik } from 'formik';
import React, { FC } from 'react';
import { Form, Modal } from 'react-bootstrap';
import Divider from '../core/Divider';
import Button from '../core/Button';

interface NewWhiteboardModalProps {
  show: boolean;
  onHide: () => void;
  ecoverseId: string;
  challengeId: string;
}

interface NewWhiteboardParameters {
  visibility: 'private' | 'shared';
  content: 'empty' | string;
}

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const VALID_KEY_CHARS = alphabet
  .split('')
  .concat(alphabet.split('').map(s => s.toLowerCase()))
  .concat(['_', '-']);

const NewWhiteboardModal: FC<NewWhiteboardModalProps> = ({ show, onHide, ecoverseId, challengeId }) => {
  const initialValues: NewWhiteboardParameters = {
    visibility: 'private',
    content: 'empty',
  };

  const generateExcalidrawId = () => {
    var seed = new Uint8Array(10); // half size because each byte yields 2 hexchars
    window.crypto.getRandomValues(seed);
    return Array.from(seed, d => d.toString(16).padStart(2, '0')).join('');
  };

  const generateExcalidrawKey = () => {
    var seed = new Uint32Array(22);
    window.crypto.getRandomValues(seed);
    return Array.from(seed, d => VALID_KEY_CHARS[d % 38]).join('');
  };

  const onSubmit = async values => {
    console.log('On submit called', values);
    let excalidrawUrlHash = '';
    // First create resource if shared
    if (values.visibility === 'shared') {
      const id = generateExcalidrawId();
      const key = generateExcalidrawKey();
      excalidrawUrlHash += '#room=' + id + ',' + key;

      //TODO: Actually create reference
    }

    if (values.content === 'prefilled') {
      excalidrawUrlHash += '#url=http%3A//localhost%3A3000/excalidraw/' + ecoverseId + '/' + challengeId;
    }

    // Then redirect to whiteboard
    window.open('https://excalidraw.com/' + excalidrawUrlHash);
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>New Whiteboard</Modal.Header>
      <Modal.Body>
        <Formik initialValues={initialValues} onSubmit={onSubmit} enableReinitialize validator={() => ({})}>
          {({ isSubmitting, handleSubmit, setFieldValue }) => (
            <Form onSubmit={handleSubmit}>
              <label htmlFor="visibility">Visibility: </label>
              <Form.Control
                id="visibility"
                name="visibility"
                as="select"
                onChange={e => setFieldValue('visibility', e.target.value)}
              >
                <option value="private">Personal</option>
                <option value="shared">Shared</option>
              </Form.Control>
              <Divider />
              <label htmlFor="content">Content: </label>
              <Form.Control
                id="content"
                name="content"
                as="select"
                onChange={e => setFieldValue('content', e.target.value)}
              >
                <option value="empty">Empty</option>
                <option value="prefilled">Pre-filled</option>
              </Form.Control>
              <Divider />
              <Button type="submit" disabled={isSubmitting}>
                Create Whiteboard
              </Button>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default NewWhiteboardModal;
