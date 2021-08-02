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

const NewWhiteboardModal: FC<NewWhiteboardModalProps> = ({ show, onHide, ecoverseId, challengeId }) => {
  const initialValues: NewWhiteboardParameters = {
    visibility: 'private',
    content: 'empty',
  };

  const onSubmit = async _values => {
    console.log('On submit called');
    // First create resource if shared

    // Then redirect to whiteboard
    window.open('https://excalidraw.com/#url=http%3A//localhost%3A3000/excalidraw/' + ecoverseId + '/' + challengeId);
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>New Whiteboard</Modal.Header>
      <Modal.Body>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validator={() => ({})}>
          {({ isSubmitting, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <label htmlFor="visibility">Visibility: </label>
              <Form.Control name="visibility" as="select">
                <option value="private">Personal</option>
                <option value="shared">Shared</option>
              </Form.Control>
              <Divider />
              <label htmlFor="content">Content: </label>
              <Form.Control name="content" as="select">
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
