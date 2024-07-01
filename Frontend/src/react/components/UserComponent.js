import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as userActions from '../../redux/user/UserActions';
import DeleteUserWidget from './userManagementComponents/DeleteUserWidget';
import EditUserWidget from './userManagementComponents/EditUserWidget';
import CreateNewUserWidget from "./userManagementComponents/CreateNewUserWidget";
import '../../layout/css/u-component-cover.css';
import '../../layout/css/userManagement.css';
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

function UserComponent() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const usersData = useSelector(state => state.users);
    const [users, useUsers] = useState([]);

    useEffect(() => {
        dispatch(userActions.getUsers());
    }, [dispatch, usersData.userListUpdated]);

    const editUserhandler = async (user) => {
        navigate('/userEdit', { state: { user } });
    }

    return (
        usersData.pending ? (
            <h2 className="display-6 text-center">Loading...</h2>
        ) : usersData.error ? (
            <h2 className="display-6 text-center">{usersData.error}</h2>
        ) : (
            <div>
                <CreateNewUserWidget />
                <div id="UserManagementPageListComponent" className="card-deck mb-3 text-center d-flex justify-content-evenly flex-wrap">
                    {usersData.users && usersData.users.length > 0 ? (
                        usersData.users.map(user => (
                            <div className="card mb-4 box-shadow" id={'UserItem' + user?.userID} key={user?.userID} style={{ maxWidth: '25rem'}}>
                                <div className="card-header">
                                    <h4 className="my-0 font-weight-normal">{user?.userID}</h4>
                                </div>
                                <div className="card-body">
                                    <ul className="list-unstyled mt-3 mb-4">
                                        <li>User ID: {user?.userID}</li>
                                        <li>Vorname: {user?.firstName}</li>
                                        <li>Nachname: {user?.lastName}</li>
                                        <li>Administrator-Rechte: {user?.isAdministrator ? 'ja' : 'nein'}</li>
                                    </ul>
                                </div>
                                <Button className="btn common-button" id={"UserItemEditButton" + user.userID}
                                        variant="secondary" size="lg" onClick={() => editUserhandler(user)} active>
                                    Edit
                                </Button>
                                {/*<EditUserWidget userData={user} />*/}
                                <DeleteUserWidget userID={user?.userID} />
                            </div>
                        ))
                    ) : (
                        <h2 className="display-6 text-center">No users available</h2>
                    )}
                </div>
            </div>
        )
    );
}

export default UserComponent;
