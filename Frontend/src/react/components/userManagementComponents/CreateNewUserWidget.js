import React, { useState } from "react";
import { BiUserPlus } from "react-icons/bi";
import { Modal, Button, Form, Image, ToggleButton } from 'react-bootstrap';
import { connect, useDispatch } from 'react-redux';
import * as userActions from '../../../redux/user/UserActions';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../layout/css/create-nu-cover.css';

function CreateNewUserWidget (props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const dispatch = useDispatch();

    const [user, setUser] = useState(
        {
            userID: "",
            firstName: "",
            lastName: "",
            password: "",
            isAdministrator: false
        });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(userActions.createUser(user));
    }

    return (
        <>
            <Button
                className="block-example border border-0 border-dark mb-4"
                id="UserManagementPageCreateUserButton"
                onClick={handleShow}
                style={{ background: '#fff' }}
            >
                <BiUserPlus size={45} color={'#3f464c'} />
            </Button>

            <Modal id="UserManagementPageCreateComponent" className="modal fade" show={show} onHide={handleClose} >
                <Modal.Header className="modal-header border-bottom-0" closeButton></Modal.Header>
                <Modal.Body className="modal-body d-flex flex-column text-center">
                    <Form className="form-signin">
                        <Image className="mb-4" src={require("../../../layout/icons/bhtShortLogo.png")} alt="Logo" width="72" height="72" />
                        <h3 className="h3 mb-3 font-weight-normal">User anlegen</h3>

                        <Form.Control
                            className="form-control"
                            type="text"
                            id="CreateUserComponentEditUserID"
                            name='userID'
                            placeholder="User ID"
                            value={user.userID}
                            onChange={async (e) => { setUser({ ...user, userID: e.target.value }) }}
                            required
                            autoFocus />
                        <Form.Control
                            className="form-control"
                            type="text"
                            id="CreateUserComponentEditFirstName"
                            name='firstName'
                            placeholder="Vorname"
                            value={user.firstName}
                            onChange={async (e) => { setUser({ ...user, firstName: e.target.value }) }}
                            required />
                        <Form.Control
                            className="form-control"
                            type="text"
                            id="CreateUserComponentEditLastName"
                            name='lastName'
                            placeholder="Nachname"
                            value={user.lastName}
                            onChange={async (e) => { setUser({ ...user, lastName: e.target.value }) }}
                            required />
                        <Form.Control
                            className="form-control"
                            type="password"
                            id="CreateUserComponentEditPassword"
                            name='password'
                            placeholder="Password"
                            value={user.password}
                            onChange={async (e) => { setUser({ ...user, password: e.target.value }) }}
                            required />
                        <Form.Check
                            className="mb-2"
                            id="CreateUserComponentEditIsAdministrator"
                            type="checkbox"
                            label="Administrator-Rechte"
                            name="isAdministrator"
                            checked={user.isAdministrator}
                            onChange={async (e) => { setUser({ ...user, isAdministrator: e.target.checked }) }}
                            required
                        />
                        {/* OR we can use ToggleButton instead of Form.Check */}
                        {/*
            <ToggleButton
                className="mb-2"
                id="CreateUserComponentEditIsAdministrator"
                type="checkbox"
                variant="outline-primary"
                name="isAdministrator"
                checked={user.isAdministrator}
                onChange={(e) => setUser({ ...user, isAdministrator: e.target.checked })}
                required
            >
                Admin
            </ToggleButton>*/}
                        <Button
                            type="submit"
                            id="CreateUserComponentCreateUserButton"
                            variant="secondary"
                            size="lg"
                            onClick={handleSubmit}>
                            Anlegen
                        </Button>
                        <p className="mt-5 mb-3 text-muted">&copy; 2024</p>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default CreateNewUserWidget;