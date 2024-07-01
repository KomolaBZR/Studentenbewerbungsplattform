import axios from "axios";

export const REQUEST_READ_DEGREE_COURSES = 'REQUEST_READ_DEGREE_COURSES';
export const SUCCESS_READ_DEGREE_COURSES = 'SUCCESS_READ_DEGREE_COURSES';
export const FAILED_READ_DEGREE_COURSES = 'FAILED_READ_DEGREE_COURSES';

export const REQUEST_CREATE_DEGREE_COURSE = 'REQUEST_CREATE_DEGREE_COURSE';
export const SUCCESS_CREATE_DEGREE_COURSE = 'SUCCESS_CREATE_DEGREE_COURSE';
export const FAILED_CREATE_DEGREE_COURSE = 'FAILED_CREATE_DEGREE_COURSE';

export const REQUEST_DELETE_DEGREE_COURSE = 'REQUEST_DELETE_DEGREE_COURSE';
export const SUCCESS_DELETE_DEGREE_COURSE = 'SUCCESS_DELETE_DEGREE_COURSE';
export const FAILED_DELETE_DEGREE_COURSE = 'FAILED_DELETE_DEGREE_COURSE';

export const REQUEST_EDIT_DEGREE_COURSE = 'REQUEST_EDIT_DEGREE_COURSE';
export const SUCCESS_EDIT_DEGREE_COURSE = 'SUCCESS_EDIT_DEGREE_COURSE';
export const FAILED_EDIT_DEGREE_COURSE = 'FAILED_EDIT_DEGREE_COURSE';

export function getDegreeCoursesPendingAction() {
    return {
        type: REQUEST_READ_DEGREE_COURSES
    }
}

export function getDegreeCoursesSuccessAction(degreeCourses) {
    return {
        type: SUCCESS_READ_DEGREE_COURSES,
        degreeCourses: degreeCourses
    }
}

export function getDegreeCoursesErrorAction(error) {
    return {
        type: FAILED_READ_DEGREE_COURSES,
        error: error
    }
}

export function createDegreeCoursePendingAction() {
    return {
        type: REQUEST_CREATE_DEGREE_COURSE
    }
}

export function createDegreeCourseSuccessAction(res) {
    return {
        type: SUCCESS_CREATE_DEGREE_COURSE,
        status: res.status
    }
}

export function createDegreeCourseErrorAction(error) {
    return {
        type: FAILED_CREATE_DEGREE_COURSE,
        status: error
    }
}

export function deleteDegreeCoursePendingAction() {
    return {
        type: REQUEST_DELETE_DEGREE_COURSE
    }
}

export function deleteDegreeCourseSuccessAction(res) {
    return {
        type: SUCCESS_DELETE_DEGREE_COURSE,
        status: res.status
    }
}

export function deleteDegreeCourseErrorAction(error) {
    return {
        type: FAILED_DELETE_DEGREE_COURSE,
        status: error.status
    }
}

export function editDegreeCoursePendingAction() {
    return {
        type: REQUEST_EDIT_DEGREE_COURSE
    }
}

export function editDegreeCourseSuccessAction(res) {
    return {
        type: SUCCESS_EDIT_DEGREE_COURSE,
        status: res.status
    }
}

export function editDegreeCourseErrorAction(error) {
    return {
        type: FAILED_EDIT_DEGREE_COURSE,
        status: error.status
    }
}



export function getDegreeCourses() {
    return (dispatch, getState) => {
        dispatch(getDegreeCoursesPendingAction());

        const token = getState().auth.token;

        const requestOptions = {
            headers: { 'Authorization': 'Bearer ' + token}
        };

        console.log(token);
        axios.get('/api/degreeCourses', requestOptions)
            .then(response => {
                const degreeCourses = response.data;
                console.log("Here we can see ID:", degreeCourses);
                dispatch(getDegreeCoursesSuccessAction(degreeCourses))
            })
            .catch(error => {
                const errorMessage = error.message;
                dispatch(getDegreeCoursesErrorAction(errorMessage));
            })
    }
}


export function createDegreeCourse(degreeCourse) {
    return (dispatch, getState) => {
        dispatch(createDegreeCoursePendingAction());

        const token = getState().auth.token;

        const requestOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        };
        axios.post('/api/degreeCourses', degreeCourse, requestOptions)
            .then(response => {
                dispatch(createDegreeCourseSuccessAction(response))
            })
            .catch(error => {
                dispatch(createDegreeCourseErrorAction(error.message));
            })
    }
}

export function deleteDegreeCourse(id) {
    return (dispatch, getState) => {
        dispatch(deleteDegreeCoursePendingAction());

        const token = getState().auth.token;

        const requestOptions = {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        };
        axios.delete('/api/degreeCourses/' + id, requestOptions)
            .then(response => {
                dispatch(deleteDegreeCourseSuccessAction(response))
            })
            .catch(error => {
                dispatch(deleteDegreeCourseErrorAction(error.message));
            })
    }
}

/*
export function editDegreeCourse(dcID, degreeCourse) {
    return (dispatch, getState) => {
        console.log(degreeCourse);
        dispatch(editDegreeCoursePendingAction());

        const token = getState().auth.token;

        const requestOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        };
        axios.put('/api/degreeCourses/' + dcID, degreeCourse, requestOptions)
            .then(response => {
                dispatch(editDegreeCourseSuccessAction(response))
            })
            .catch(error => {
                dispatch(editDegreeCourseErrorAction(error.message));
            })
    }
}
*/


export function editDegreeCourse(id, degreeCourse) {
    return (dispatch, getState) => {
        console.log(degreeCourse);
        dispatch(editDegreeCoursePendingAction());

        const token = getState().auth.token;

        const requestOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        };
        console.log('dcID:',id);
        console.log('degreeCourse:', degreeCourse);

        axios.put(`/api/degreeCourses/${id}`, degreeCourse, requestOptions)
            .then(response => {
                console.log('Edit Degree Course Response:', response); // Log the response
                dispatch(editDegreeCourseSuccessAction(response))
            })
            .catch(error => {
                console.error('!!!!Error editing degree course:', error);
                const errorMessage = error.response ? error.response.data.message : error.message;
                dispatch(editDegreeCourseErrorAction(errorMessage));
            });
    }
}
