import React, {useEffect, useState} from "react";
import { Modal, Button, Form, Image, Alert } from 'react-bootstrap';
import {connect, useDispatch, useSelector} from 'react-redux';
import * as userActions from "../../../redux/user/UserActions";
import {Link, useLocation} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../layout/css/edit-u-cover.css';
import TopMenu from "../TopMenu";
import Sidebar from "../Sidebar";
import Footer from "../Footer";

function EditUserWidget (props) {
    const location = useLocation();

    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const linkStyle = { color: '#ced4da' };
    const [show, setShow] = useState(false);

    /*const { userData } = props;*/
    const userData = location.state.user;
    const dispatch = useDispatch();
    const usersData = useSelector(state => state.users);

    const [user, setUser] = useState(
        {
            userID: userData.userID,
            firstName: userData.firstName,
            lastName: userData.lastName,
            password: "",
            isAdministrator: userData.isAdministrator
        });

    const handleClose = () => {
        console.log(successMsg);
        setShow(false);
        setSuccessMsg("");
    };
    const handleShow = () => setShow(true);
    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(userActions.editUser(user.userID, user));
    }

    useEffect(() => {
        if (usersData.userListUpdated && !usersData.error) {
            setSuccessMsg("User successfully saved!");
        }
        console.log(successMsg);
    }, [usersData.userListUpdated])

    useEffect(() => {
        if(usersData.error){
            setErrorMsg(usersData.error.Error || "Error by editing");
        }
        console.log(errorMsg);
    }, [usersData.error])

    return (
        <div>
            <TopMenu/>

            <div className="mainContainer" id="UserManagementPageEditComponent">
                <div className="d-flex flex-nowrap">
                    <Sidebar/>
                    <div className="starter-template editUserSite" style={{flex: 1, padding: '20px'}}>
                        <Link to="/userManagement">
                            <Button variant="link" id="OpenUserManagementPageListComponentButton">
                                Zurück zur User-Liste
                            </Button>
                        </Link>
                        <h1 className="edit-h1-user"> User-Edit: {userData.userID} </h1>
                        <Form className="form-signin edit-form-control-signin edit-form-border"
                              onSubmit={handleSubmit}>
                            <Image className="mb-4" src={require("../../../layout/icons/bhtShortLogo.png")}
                                   alt="Logo" width="72"
                                   height="72"/>
                            <h2 className="h3 mb-3 font-weight-normal">User editieren</h2>

                            <Form.Control
                                className="form-control edit-form-control"
                                type="text"
                                id="EditUserComponentEditUserID"
                                name='userID'
                                placeholder="User ID"
                                value={user.userID}
                                onChange={async (e) => {
                                    setUser({...user, userID: e.target.value})
                                }}
                                disabled
                                autoFocus/>
                            <Form.Control
                                className="form-control edit-form-control"
                                type="text"
                                id="EditUserComponentEditFirstName"
                                name='firstName'
                                placeholder="Vorname"
                                value={user.firstName}
                                onChange={async (e) => {
                                    setUser({...user, firstName: e.target.value})
                                }}/>
                            <Form.Control
                                className="form-control edit-form-control"
                                type="text"
                                id="EditUserComponentEditLastName"
                                name='lastName'
                                placeholder="Nachname"
                                value={user.lastName}
                                onChange={async (e) => {
                                    setUser({...user, lastName: e.target.value})
                                }}/>
                            <Form.Control
                                className="form-control edit-form-control"
                                type="password"
                                id="EditUserComponentEditPassword"
                                name='password'
                                placeholder="Password"
                                value={user.password}
                                onChange={async (e) => {
                                    setUser({...user, password: e.target.value})
                                }}/>
                            <Form.Check
                                className="mb-2"
                                id="EditUserComponentEditIsAdministrator"
                                type="checkbox"
                                label="Administrator-Rechte"
                                name="isAdministrator"
                                checked={user.isAdministrator}
                                onChange={async (e) => {
                                    setUser({...user, isAdministrator: e.target.checked})
                                }}
                            />

                            {/*<ToggleButton
                            className="mb-2"
                            id="EditUserComponentEditIsAdministrator"
                            type="checkbox"
                            variant="outline-primary"
                            name="isAdministrator"
                            checked={user.isAdministrator}
                            onChange={async (e) => { setUser({ ...user, isAdministrator: e.target.checked }) }}
                            required>
                            Admin
                        </ToggleButton>*/}
                            <Button
                                type="submit"
                                id="EditUserComponentSaveUserButton"
                                variant="secondary"
                                size="lg"
                                style={linkStyle}
                                /*onClick={handleSubmit}*/
                            >
                                Speichern
                            </Button>
                            {/*<Button
                                        className="mt-3"
                                        type="reset"
                                        id="OpenUserManagementPageListComponentButton"
                                        variant="outline-secondary"
                                        size="lg"
                                        onClick={handleClose}
                                        style={{backgroundColor: '#ced4da'}}>
                                        Abbrechen
                                    </Button>*/}
                            {successMsg && (
                                <Alert className="mt-2" variant="success" style={{border: "1px solid #28a745"}}>
                                    {successMsg}
                                </Alert>
                            )}
                            {errorMsg && (
                                <Alert className="mt-2" variant="danger" style={{border: "1px solid #28a745"}}>
                                    {errorMsg}
                                </Alert>
                            )}
                        </Form>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default EditUserWidget;