import axios from "axios";

export const REQUEST_READ_USERS = 'REQUEST_READ_USERS';
export const SUCCESS_READ_USERS = 'SUCCESS_READ_USERS';
export const FAILED_READ_USERS = 'FAILED_READ_USERS';

export const REQUEST_CREATE_USER = 'REQUEST_CREATE_USER';
export const SUCCESS_CREATE_USER = 'SUCCESS_CREATE_USER';
export const FAILED_CREATE_USER = 'FAILED_CREATE_USER';

export const REQUEST_DELETE_USER = 'REQUEST_DELETE_USER';
export const SUCCESS_DELETE_USER = 'SUCCESS_DELETE_USER';
export const FAILED_DELETE_USER = 'FAILED_DELETE_USER';

export const REQUEST_EDIT_USER = 'REQUEST_EDIT_USER';
export const SUCCESS_EDIT_USER = 'SUCCESS_EDIT_USER';
export const FAILED_EDIT_USER = 'FAILED_EDIT_USER';

export function getUsersPendingAction() {
    return {
        type: REQUEST_READ_USERS
    }
}

export function getUsersSuccessAction(users) {
    return {
        type: SUCCESS_READ_USERS,
        users: users
    }
}

export function getUsersErrorAction(error) {
    return {
        type: FAILED_READ_USERS,
        error: error
    }
}

export function createUserPendingAction() {
    return {
        type: REQUEST_CREATE_USER
    }
}

export function createUserSuccessAction(res) {
    return {
        type: SUCCESS_CREATE_USER,
        status: res.status
    }
}

export function createUserErrorAction(error) {
    return {
        type: FAILED_CREATE_USER,
        status: error
    }
}

export function deleteUserPendingAction() {
    return {
        type: REQUEST_DELETE_USER
    }
}

export function deleteUserSuccessAction(res) {
    return {
        type: SUCCESS_DELETE_USER,
        status: res.status
    }
}

export function deleteUserErrorAction(error) {
    return {
        type: FAILED_DELETE_USER,
        status: error.status
    }
}

export function editUserPendingAction() {
    return {
        type: REQUEST_EDIT_USER
    }
}

export function editUserSuccessAction(res) {
    return {
        type: SUCCESS_EDIT_USER,
        status: res.status
    }
}

export function editUserErrorAction(error) {
    return {
        type: FAILED_EDIT_USER,
        status: error.status
    }
}

export function getUsers() {
    return (dispatch, getState) => {
        dispatch(getUsersPendingAction());

        const token = getState().auth.token;

        const requestOptions = {
            headers: { 'Authorization': 'Bearer ' + token}
        };

        console.log(token);
        axios.get('/api/users', requestOptions)
            .then(response => {
                const users = response.data;
                console.log(users);
                dispatch(getUsersSuccessAction(users))
            })
            .catch(error => {
                const errorMessage = error.message;
                dispatch(getUsersErrorAction(errorMessage));
            })
    }
}

export function createUser(user) {
    return (dispatch, getState) => {
        dispatch(createUserPendingAction());

        const token = getState().auth.token;

        const requestOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        };
        axios.post('/api/users', user, requestOptions)
            .then(response => {
                dispatch(createUserSuccessAction(response))
            })
            .catch(error => {
                dispatch(createUserErrorAction(error.message));
            })
    }
}

export function deleteUser(userID) {
    return (dispatch, getState) => {
        dispatch(deleteUserPendingAction());

        const token = getState().auth.token;

        const requestOptions = {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        };
        axios.delete('/api/users/' + userID, requestOptions)
            .then(response => {
                dispatch(deleteUserSuccessAction(response))
            })
            .catch(error => {
                dispatch(deleteUserErrorAction(error.message));
            })
    }
}

export function editUser(userID, user) {
    return (dispatch, getState) => {
        console.log(user);
        dispatch(editUserPendingAction());

        const token = getState().auth.token;

        const requestOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        };
        axios.put('/api/users/' + userID, user, requestOptions)
            .then(response => {
                dispatch(editUserSuccessAction(response))
            })
            .catch(error => {
                dispatch(editUserErrorAction(error.message));
            })
    }
}