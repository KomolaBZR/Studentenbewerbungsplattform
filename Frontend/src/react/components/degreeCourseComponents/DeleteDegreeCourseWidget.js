import React, { useState } from "react";
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import * as degreeCourseActions from '../../../redux/degreeCourseManagement/DegreeCourseActions';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../layout/css/delete-cover.css';
import {useLocation} from "react-router-dom";


function DeleteDegreeCourseWidget(props) {
    const location = useLocation();
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();

    const { dc } = props;

    const handleClose = () => setShow(false);
    const handleShow = () => {
        console.log(dc);
        setShow(true);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(dc);
        await dispatch(degreeCourseActions.deleteDegreeCourse(dc.id));
        setShow(false);
    };


    return (
        <>
            <Button
                className="btn common-button margin-bottom-delete"
                id={"DegreeCourseItemDeleteButton" + props.dc.id}
                variant="secondary"
                size="lg"
                onClick={handleShow}
            >
                Delete
            </Button>


            <Modal id={"DeleteDialogDegreeCourse" + dc.id} show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Studiengang {dc.shortName}: {dc.name} löschen? </Modal.Title>
                </Modal.Header>
                <Modal.Body>Dieser Studiengang wird dauerhaft aus der Datenbank entfernt.</Modal.Body>
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


export default DeleteDegreeCourseWidget;