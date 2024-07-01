import axios from "axios";

export const REQUEST_READ_DEGREE_COURSE_APPLICATIONS = 'REQUEST_READ_DEGREE_COURSE_APPLICATIONS';
export const SUCCESS_READ_DEGREE_COURSE_APPLICATIONS = 'SUCCESS_READ_DEGREE_COURSE_APPLICATIONS';
export const FAILED_READ_DEGREE_COURSE_APPLICATIONS = 'FAILED_READ_DEGREE_COURSE_APPLICATIONS';

export const REQUEST_READ_DEGREE_COURSE_APPLICATIONS_BY_ID = 'REQUEST_READ_DEGREE_COURSE_APPLICATIONS_BY_ID';
export const SUCCESS_READ_DEGREE_COURSE_APPLICATIONS_BY_ID = 'SUCCESS_READ_DEGREE_COURSE_APPLICATIONS_BY_ID';
export const FAILED_READ_DEGREE_COURSE_APPLICATIONS_BY_ID = 'FAILED_READ_DEGREE_COURSE_APPLICATIONS_BY_ID';

export const REQUEST_CREATE_DEGREE_COURSE_APPLICATION = 'REQUEST_CREATE_DEGREE_COURSE_APPLICATION';
export const SUCCESS_CREATE_DEGREE_COURSE_APPLICATION = 'SUCCESS_CREATE_DEGREE_COURSE_APPLICATION';
export const FAILED_CREATE_DEGREE_COURSE_APPLICATION = 'FAILED_CREATE_DEGREE_COURSE_APPLICATION';

export const REQUEST_DELETE_DEGREE_COURSE_APPLICATION = 'REQUEST_DELETE_DEGREE_COURSE_APPLICATION';
export const SUCCESS_DELETE_DEGREE_COURSE_APPLICATION = 'SUCCESS_DELETE_DEGREE_COURSE_APPLICATION';
export const FAILED_DELETE_DEGREE_COURSE_APPLICATION = 'FAILED_DELETE_DEGREE_COURSE_APPLICATION';

export const REQUEST_EDIT_DEGREE_COURSE_APPLICATION = 'REQUEST_EDIT_DEGREE_COURSE_APPLICATION';
export const SUCCESS_EDIT_DEGREE_COURSE_APPLICATION = 'SUCCESS_EDIT_DEGREE_COURSE_APPLICATION';
export const FAILED_EDIT_DEGREE_COURSE_APPLICATION = 'FAILED_EDIT_DEGREE_COURSE_APPLICATION';

export function getDegreeCourseApplicationsPendingAction() {
    return {
        type: REQUEST_READ_DEGREE_COURSE_APPLICATIONS
    }
}

export function getDegreeCourseApplicationsSuccessAction(degreeCourseApplications) {
    return {
        type: SUCCESS_READ_DEGREE_COURSE_APPLICATIONS,
        degreeCourseApplications: degreeCourseApplications
    }
}

export function getDegreeCourseApplicationsErrorAction(error) {
    return {
        type: FAILED_READ_DEGREE_COURSE_APPLICATIONS,
        error: error
    }
}

export function getDegreeCourseApplicationsByIdPendingAction() {
    return {
        type: REQUEST_READ_DEGREE_COURSE_APPLICATIONS_BY_ID
    }
}

export function getDegreeCourseApplicationsByIdSuccessAction(degreeCourseApplications) {
    return {
        type: SUCCESS_READ_DEGREE_COURSE_APPLICATIONS_BY_ID,
        degreeCourseApplications: degreeCourseApplications
    }
}

export function getDegreeCourseApplicationsByIdErrorAction(error) {
    return {
        type: FAILED_READ_DEGREE_COURSE_APPLICATIONS_BY_ID,
        error: error
    }
}


export function createDegreeCourseApplicationPendingAction() {
    return {
        type: REQUEST_CREATE_DEGREE_COURSE_APPLICATION
    }
}

export function createDegreeCourseApplicationSuccessAction(res) {
    return {
        type: SUCCESS_CREATE_DEGREE_COURSE_APPLICATION,
        status: res.status
    }
}

export function createDegreeCourseApplicationErrorAction(error) {
    return {
        type: FAILED_CREATE_DEGREE_COURSE_APPLICATION,
        error: error
    }
}

export function deleteDegreeCourseApplicationPendingAction() {
    return {
        type: REQUEST_DELETE_DEGREE_COURSE_APPLICATION
    }
}

export function deleteDegreeCourseApplicationSuccessAction(res) {
    return {
        type: SUCCESS_DELETE_DEGREE_COURSE_APPLICATION,
        status: res.status
    }
}

export function deleteDegreeCourseApplicationErrorAction(error) {
    return {
        type: FAILED_DELETE_DEGREE_COURSE_APPLICATION,
        status: error.status
    }
}

export function editDegreeCourseApplicationPendingAction() {
    return {
        type: REQUEST_EDIT_DEGREE_COURSE_APPLICATION
    }
}

export function editDegreeCourseApplicationSuccessAction(res) {
    return {
        type: SUCCESS_EDIT_DEGREE_COURSE_APPLICATION,
        status: res.status
    }
}

export function editDegreeCourseApplicationErrorAction(error) {
    return {
        type: FAILED_EDIT_DEGREE_COURSE_APPLICATION,
        status: error.status
    }
}

export function getDegreeCourseApplications() {
    return (dispatch, getState) => {
        dispatch(getDegreeCourseApplicationsPendingAction());

        const token = getState().auth.token;

        const requestOptions = {
            headers: { 'Authorization': 'Bearer ' + token}
        };

        console.log(token);
        axios.get('/api/degreeCourseApplications', requestOptions)
            .then(response => {
                const degreeCourseApplications = response.data;
                console.log(degreeCourseApplications);
                dispatch(getDegreeCourseApplicationsSuccessAction(degreeCourseApplications))
            })
            .catch(error => {
                dispatch(getDegreeCourseApplicationsErrorAction(error.message));
                console.log(error.response);
                //dispatch(getDegreeCourseApplicationsErrorAction(error.response.data.Error));
            })
    }
}


export function getDegreeCourseApplicationsById() {
    return (dispatch, getState) => {
        dispatch(getDegreeCourseApplicationsByIdPendingAction());

        const userID = getState().auth.userID;
        const token = getState().auth.token;

        const requestOptions = {
            headers: { 'Authorization': 'Bearer ' + token }
        };

        console.log(userID);
        axios.get('/api/degreeCourseApplications/myApplications', requestOptions)
            .then(response => {
                const degreeCourseApplications = response.data;
                console.log(degreeCourseApplications);
                dispatch(getDegreeCourseApplicationsByIdSuccessAction(degreeCourseApplications));
            })
            .catch(error => {
                console.log(error.response);
                //dispatch(getDegreeCourseApplicationsByIdErrorAction(error.response.data.Error));
                dispatch(getDegreeCourseApplicationsByIdErrorAction(error.message));
            });
    };
}

export function createDegreeCourseApplication(degreeCourseApplication) {
    return async (dispatch, getState) => {
        try {
            dispatch(createDegreeCourseApplicationPendingAction());

            const token = getState().auth.token;

            const requestOptions = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            };

            const response = await axios.post('/api/degreeCourseApplications', degreeCourseApplication, requestOptions);
            dispatch(createDegreeCourseApplicationSuccessAction(response));
        } catch (error) {
            console.log(error.response);
            console.log(error.response.data.Error);
            //dispatch(createDegreeCourseApplicationErrorAction(error.response.data.Error));
            dispatch(createDegreeCourseApplicationErrorAction(error.message));
        }
    };
}

export function deleteDegreeCourseApplication(dcaID) {
    return (dispatch, getState) => {
        dispatch(deleteDegreeCourseApplicationPendingAction());

        const token = getState().auth.token;

        const requestOptions = {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        };
        axios.delete('/api/degreeCourseApplications/' + dcaID, requestOptions)
            .then(response => {
                dispatch(deleteDegreeCourseApplicationSuccessAction(response))
            })
            .catch(error => {
                console.log(error.response);
                dispatch(deleteDegreeCourseApplicationErrorAction(error.message));
                //dispatch(deleteDegreeCourseApplicationErrorAction(error.response.data.Error));
            })
    }
}

export function editDegreeCourseApplication(dcaID, degreeCourseApplication) {
    return (dispatch, getState) => {
        console.log(degreeCourseApplication);
        dispatch(editDegreeCourseApplicationPendingAction());

        const token = getState().auth.token;

        const requestOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        };
        axios.put('/api/degreeCourseApplications/' + dcaID, degreeCourseApplication, requestOptions)
            .then(response => {
                dispatch(editDegreeCourseApplicationSuccessAction(response))
            })
            .catch(error => {
                console.log(error.response);
                //dispatch(editDegreeCourseApplicationErrorAction(error.response.data.Error));
                dispatch(editDegreeCourseApplicationErrorAction(error.message));
            })
    }
}