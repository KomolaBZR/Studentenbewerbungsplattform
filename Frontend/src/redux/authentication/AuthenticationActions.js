import { jwtDecode } from "jwt-decode";
export const SHOW_LOGIN_DIALOG = 'SHOW_LOGIN_DIALOG';
export const HIDE_LOGIN_DIALOG = 'HIDE_LOGIN_DIALOG';

export const AUTHENTICATION_PENDING = 'AUTHENTICATION_PENDING';
export const AUTHENTICATION_SUCCESS = 'AUTHENTICATION_SUCCESS';
export const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR';
export const LOGOUT_PENDING = 'LOGOUT_PENDING';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_ERROR = 'LOGOUT_ERROR';


export function getShowLoginDialogAction(){
    return{
        type: SHOW_LOGIN_DIALOG
    };
}

export function getHideLoginDialogAction(){
    return{
        type: HIDE_LOGIN_DIALOG
    };
}

export function getAuthenticateUserPendingAction(){
    return{
        type:AUTHENTICATION_PENDING
    };
}

export function getAuthenticationSuccessAction(userSession){
    return{
        type: AUTHENTICATION_SUCCESS,
        user: userSession.user,
        accessToken: userSession.accessToken
    };
}

export function getAuthenticationErrorAction(error){
    return{
        type: AUTHENTICATION_ERROR,
        error: error
    };
}

export function getLogOutPendingAction() {
    return {
        type: LOGOUT_PENDING
    }
}

export function getLogOutSuccessAction(userSession) {
    return {
        type: LOGOUT_SUCCESS,
        user: userSession.user,
        token: userSession.accessToken
    }
}

export function getLogOutErrorAction(error) {
    return {
        type: LOGOUT_ERROR,
        error: error
    }
}


export function authenticateUser(userID, password){
    console.log("Authenticate");


    return dispatch => {
        dispatch(getAuthenticateUserPendingAction());
        login(userID, password)
            .then(
                userSession => {
                    const action = getAuthenticationSuccessAction(userSession);
                    dispatch(action);
                },
                error => {
                    dispatch(getAuthenticationErrorAction(error));
                }
            )
            .catch(error => {
                dispatch(getAuthenticationErrorAction(error));
            });
    };
}

export function logoutUser(userData, token){
    console.log("Authenticate");

    return dispatch => {
        dispatch(getLogOutPendingAction());
        logout(userData, token)
            .then(
                userSession => {
                    const action = getLogOutSuccessAction(userSession);
                    dispatch(action);
                },
                error => {
                    dispatch(getLogOutErrorAction(error));
                }
            )
            .catch(error => {
                dispatch(getLogOutErrorAction(error));
            });
    };
}



function login(userID,password){
    const requestOptions ={
        method: 'GET',
        headers: {'Authorization': 'Basic ' + btoa(`${userID}:${password}`) }
    };

    return fetch('https://localhost:443/api/authenticate', requestOptions)
        .then(handleResponse)
        .then(userSession => {
            console.log(userSession);
            return userSession;
        })
}


function handleResponse(response){

    const authorizationHeader = response.headers.get('Authorization');

    return response.text().then(text => {

        console.log('Receive result: ' + authorizationHeader);

        const data = text && JSON.parse(text);
        //console.log(data);
        var token;
        if(authorizationHeader){
            token = authorizationHeader.split(" ")[1];
        }

        if(response.status === 500){
            const error = {
                Error: "Authentication failed"
            }
            return Promise.reject(error);
        }else if(!response.ok){
            const error = (data && data.Error) || response.statusText;
            return Promise.reject(error);
        } else {
            const tokenData = jwtDecode(token);

            const userID = tokenData.userID;
            const isAdmin = tokenData.isAdministrator;

            let userSession = {
                user: { userID, isAdmin },
                accessToken: token
            };
            return userSession;
        }
    });
}


function logout(userData, token) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const userSession = (userData || token) ? { user: null, accessToken: '' } : { user: userData, accessToken: token };
            console.error('Logout user');
            console.error('UserSession is removed: ', userSession);
            resolve(userSession);
        }, 500); // Simulating a 0.5-second asynchronous operation
    });
}