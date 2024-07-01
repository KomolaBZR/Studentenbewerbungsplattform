import React, { useState } from "react";
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import * as degreeCourseApplicationActions from '../../../redux/degreeCourseApplication/DegreeCourseApplicationActions';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../layout/css/delete-cover.css';
import {useLocation} from "react-router-dom";


function DeleteApplicationWidget(props) {
    const location = useLocation();
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();

    const { dca } = props;

    const handleClose = () => setShow(false);
    const handleShow = () => {
        console.log(dca);
        setShow(true);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(dca);
        await dispatch(degreeCourseApplicationActions.deleteDegreeCourseApplication(dca.id));
        setShow(false);
    };

    return (
        <>
            <Button
                className="btn common-button margin-bottom-delete delete-button-dca"
                id={"DegreeCourseApplicationDeleteButton" + props.dca.id}
                variant="secondary"
                size="lg"
                onClick={handleShow}
            >
                Delete
            </Button>

            <Modal id={"DeleteDialogDegreeCourseApplication"+ dca.id} show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Studienbewerbung {dca.applicantUserID}: {dca.targetPeriodShortName}{dca.targetPeriodYear} {dca.departmentName}  löschen? </Modal.Title>
                </Modal.Header>
                <Modal.Body>Diese Studienbewerbung wird dauerhaft aus der Datenbank entfernt.</Modal.Body>
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


export default DeleteApplicationWidget;