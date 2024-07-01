import * as authenticationActions from "./authentication/AuthenticationActions";

const initialState = {
    user: null,
    loginPending:false,
    showLoginDialog:false,
    error:null
};

function dialogReducer(state = initialState, action){

    console.log("Bin im Reducer: " + action.type);

    switch(action.type){
        case authenticationActions.SHOW_LOGIN_DIALOG:
            return{
                ...state,
                showLoginDialog:true,
                error:null
            };
        case authenticationActions.HIDE_LOGIN_DIALOG:
            return{
                ...state,
                showLoginDialog:false,
                error:null
            };
        case authenticationActions.AUTHENTICATION_PENDING:
            return{
                ...state,
                pending: true,
                error:null
            };
        case authenticationActions.AUTHENTICATION_SUCCESS:
            return{
                ...state,
                showLoginDialog: false,
                pending: false,
                user:action.user,
                accessToken: action.accessToken
            };
        case authenticationActions.AUTHENTICATION_ERROR:
            return{
                ...state,
                pending: false,
                error: action.error
            };
        default:
            return state;
    }
};

export default dialogReducer;