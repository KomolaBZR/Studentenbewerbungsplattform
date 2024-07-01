import React, { useState } from "react";
import { BiUserPlus } from "react-icons/bi";
import { Modal, Button, Form, Image, ToggleButton } from 'react-bootstrap';
import { connect, useDispatch } from 'react-redux';
import * as degreeCourseActions from '../../../redux/degreeCourseManagement/DegreeCourseActions';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../layout/css/create-nu-cover.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaUniversity, FaPlus } from 'react-icons/fa';




function CreateNewDegreeCourseWidget (props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [degreeCourse, setDegreeCourse] = useState(
        {
            name: "",
            shortName: "",
            universityName: "",
            universityShortName: "",
            departmentName: "",
            departmentShortName: ""
        });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await dispatch(degreeCourseActions.createDegreeCourse(degreeCourse));
        console.log(response); // Log the response to check for errors or status
    }



    return (
        <>
            <Button
                className="block-example border border-0 border-dark mb-4"
                id="DegreeCourseManagementPageCreateDegreeCourseButton"
                onClick={handleShow}
                style={{ background: '#fff' }}
            >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <FaUniversity size={30} color={'#3f464c'} style={{ marginRight: '5px' }} />
                    <FaPlus size={20} color={'#3f464c'} />
                </div>
            </Button>

            <Modal id="DegreeCourseManagementPageCreateComponent" className="modal fade" show={show} onHide={handleClose} >
                <Modal.Header className="modal-header border-bottom-0" closeButton></Modal.Header>
                <Modal.Body className="modal-body d-flex flex-column text-center">
                    <Form className="form-signin">
                        <Image className="mb-4" src={require("../../../layout/icons/bhtShortLogo.png")} alt="Logo" width="72" height="72" />
                        <h3 className="h3 mb-3 font-weight-normal">Degree Course anlegen</h3>

                        <Form.Control
                            className="form-control"
                            type="text"
                            id="CreateDegreeCourseComponentEditName"
                            name='courseName'
                            placeholder="Studiengang-Name"
                            value={degreeCourse.name}
                            onChange={async (e) => { setDegreeCourse({ ...degreeCourse, name: e.target.value }) }}
                            required
                            autoFocus />
                        <Form.Control
                            className="form-control"
                            type="text"
                            id="CreateDegreeCourseComponentEditShortName"
                            name='courseShortName'
                            placeholder="Studiengang-Kurzbezeichnung"
                            value={degreeCourse.shortName}
                            onChange={async (e) => { setDegreeCourse({ ...degreeCourse, shortName: e.target.value }) }}
                            required
                            autoFocus />
                        <Form.Control
                            className="form-control"
                            type="text"
                            id="CreateDegreeCourseComponentEditUniversityName"
                            name='universityName'
                            placeholder="Universität-Name"
                            value={degreeCourse.universityName}
                            onChange={async (e) => { setDegreeCourse({ ...degreeCourse, universityName: e.target.value }) }}
                            required
                            autoFocus />
                        <Form.Control
                            className="form-control"
                            type="text"
                            id="CreateDegreeCourseComponentEditUniversityShortName"
                            name='universityShortName'
                            placeholder="Universität-Kurzbezeichnung"
                            value={degreeCourse.universityShortName}
                            onChange={async (e) => { setDegreeCourse({ ...degreeCourse, universityShortName: e.target.value }) }}
                            required
                            autoFocus />
                        <Form.Control
                            className="form-control"
                            type="text"
                            id="CreateDegreeCourseComponentEditDepartmentName"
                            name='departmentName'
                            placeholder="Fachbereich-Name"
                            value={degreeCourse.departmentName}
                            onChange={async (e) => { setDegreeCourse({ ...degreeCourse, departmentName: e.target.value }) }}
                            required
                            autoFocus />
                        <Form.Control
                            className="form-control"
                            type="text"
                            id="CreateDegreeCourseComponentEditDepartmentShortName"
                            name='departmentShortName'
                            placeholder="Universität-Kurzbezeichnung"
                            value={degreeCourse.departmentShortName}
                            onChange={async (e) => { setDegreeCourse({ ...degreeCourse, departmentShortName: e.target.value }) }}
                            required
                            autoFocus />
                        <Button
                            type="submit"
                            id="CreateDegreeCourseComponentCreateDegreeCourseButton"
                            variant="secondary"
                            size="lg"
                            onClick={handleSubmit}>
                            Anlegen
                        </Button>

                        <Link to="/degreeCourseManagement" onClick={() => { navigate('/degreeCourseManagement'); handleClose(); }}>
                            <Button
                                variant="link"
                                id="OpenDegreeCourseManagementPageListComponentButton"
                            >
                                Zurück zur Studiengang-Liste
                            </Button>
                        </Link>

                        <p className="mt-5 mb-3 text-muted">&copy; 2024</p>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default CreateNewDegreeCourseWidget;