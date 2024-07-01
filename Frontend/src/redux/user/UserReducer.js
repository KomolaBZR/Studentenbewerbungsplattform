import * as userActions from "./UserActions";

const initialState = {
    users: [],
    pending: false,
    userListUpdated: false,
    error: null
};

export default function userReducer(state = initialState, action) {

    console.log('Bin in UserReducer: ' + action.type);

    switch (action.type) {
        case userActions.REQUEST_READ_USERS:
            return {
                ...state,
                pending: true,
                error: null
            }
        case userActions.SUCCESS_READ_USERS:
            return {
                ...state,
                pending: false,
                users: action.users,
                userListUpdated: false,
                error: null
            }
        case userActions.FAILED_READ_USERS:
            return {
                ...state,
                pending: false,
                users: [],
                error: action.error
            }
        case userActions.REQUEST_CREATE_USER:
            return {
                ...state,
                pending: true,
                error: null
            }
        case userActions.SUCCESS_CREATE_USER:
            return {
                ...state,
                pending: false,
                status: action.status,
                userListUpdated: true,
                error: null
            }
        case userActions.FAILED_CREATE_USER:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        case userActions.REQUEST_EDIT_USER:
            return {
                ...state,
                pending: true,
                error: null
            }
        case userActions.SUCCESS_EDIT_USER:
            return {
                ...state,
                pending: false,
                status: action.status,
                userListUpdated: true,
                error: null
            }
        case userActions.FAILED_EDIT_USER:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        case userActions.REQUEST_DELETE_USER:
            return {
                ...state,
                pending: true,
                error: null
            }
        case userActions.SUCCESS_DELETE_USER:
            return {
                ...state,
                pending: false,
                status: action.status,
                userListUpdated: true,
                error: null
            }
        case userActions.FAILED_DELETE_USER:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        default:
            return state;
    }
};