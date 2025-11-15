import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

function DeleteList(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <React.Fragment>
      <Button
        variant="danger"
        onClick={(evt) => {
          handleShow();
          props.getList(evt, props.elementId);
        }}
      >
        Delete
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            value={props.singledata.title}
            disabled
            className="d-block my-3"
          />
          <input
            type="text"
            value={props.singledata.author}
            disabled
            className="d-block my-3"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="danger"
            onClick={(event) => {
              handleClose();
              props.deleteList(event, props.elementId);
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}

export default DeleteList;
