import React, { useState } from "react";
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import * as userActions from '../../../redux/user/UserActions';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../layout/css/delete-cover.css';


function DeleteUserWidget(props) {

    const [show, setShow] = useState(false);
    const dispatch = useDispatch();

    const { userID } = props;

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(userID);
        await dispatch(userActions.deleteUser(userID));
        setShow(false);
    };


    return (
        <>
            <Button className="btn common-button margin-bottom-delete" id={"UserItemDeleteButton" + props.userID} variant="secondary"
                    size="lg" onClick={handleShow}>Delete</Button>

            <Modal id={"DeleteDialogUser"+ props.userID} show={show} onHide={handleClose}>
                <Modal.Header  closeButton>
                    <Modal.Title>User {props.userID} löschen? </Modal.Title>
                </Modal.Header>
                <Modal.Body>Der User wird dauerhaft aus der Datenbank entfernt.</Modal.Body>
                <Modal.Footer>
                    <Button id="DeleteDialogCancelButton" variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button id="DeleteDialogConfirmButton" variant="primary" onClick={handleSubmit}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}



export default DeleteUserWidget;