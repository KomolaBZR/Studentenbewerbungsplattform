import * as authenticationActions from './AuthenticationActions';


const initialState = {
    pending: false,
    error: null,
    userData: null,
    token: '',
    status: ''
};

export default function authenticationReducer(state = initialState, action) {

    console.log('Bin in Authentication Reducer: ' + action.type);

    switch (action.type) {
        case authenticationActions.AUTHENTICATION_PENDING:
            return {
                ...state,
                pending: true,
                error: null
            }
        case authenticationActions.AUTHENTICATION_SUCCESS:
            return {
                ...state,
                pending: false,
                //status: action.status,
                userData: action.user,
                token:action.accessToken
            }
        case authenticationActions.AUTHENTICATION_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            }

        case authenticationActions.LOGOUT_PENDING:
            return {
                ...state,
                pending: true,
                error: null
            }
        case authenticationActions.LOGOUT_SUCCESS:
            return {
                ...state,
                pending: false,
                error: null,
                userData: action.userData, // Clear user information
                token: action.accessToken, // Clear the access token
            }
        case authenticationActions.LOGOUT_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            }

        default:
            return state;
    }
};