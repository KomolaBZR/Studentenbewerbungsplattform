import * as degreeCourseActions from "./DegreeCourseActions";

const initialState = {
    degreeCourses: [],
    pending: false,
    dcListUpdated: false,
    error: null
};

export default function degreeCourseReducer(state = initialState, action) {

    console.log('Bin in degreeCourseReducer: ' + action.type);

    switch (action.type) {
        case degreeCourseActions.REQUEST_READ_DEGREE_COURSES:
            return {
                ...state,
                pending: true,
                error: null
            }
        case degreeCourseActions.SUCCESS_READ_DEGREE_COURSES:
            console.log('Degree courses payload:', action.degreeCourses);
            return {
                ...state,
                pending: false,
                degreeCourses: action.degreeCourses,
                dcListUpdated: false,
                error: null
            }
        case degreeCourseActions.FAILED_READ_DEGREE_COURSES:
            return {
                ...state,
                pending: false,
                degreeCourses: [],
                error: action.error
            }
        case degreeCourseActions.REQUEST_CREATE_DEGREE_COURSE:
            return {
                ...state,
                pending: true,
                error: null
            }
        case degreeCourseActions.SUCCESS_CREATE_DEGREE_COURSE:
            return {
                ...state,
                pending: false,
                status: action.status,
                dcListUpdated: true,
                error: null
            }
        case degreeCourseActions.FAILED_CREATE_DEGREE_COURSE:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        case degreeCourseActions.REQUEST_EDIT_DEGREE_COURSE:
            return {
                ...state,
                pending: true,
                error: null
            }
        case degreeCourseActions.SUCCESS_EDIT_DEGREE_COURSE:
            return {
                ...state,
                pending: false,
                status: action.status,
                dcListUpdated: true,
                error: null
            }
        case degreeCourseActions.FAILED_EDIT_DEGREE_COURSE:
            console.error('Edit degree course failed:', action.error);
            return {
                ...state,
                pending: false,
                error: action.error
            }
        case degreeCourseActions.REQUEST_DELETE_DEGREE_COURSE:
            return {
                ...state,
                pending: true,
                error: null
            }
        case degreeCourseActions.SUCCESS_DELETE_DEGREE_COURSE:
            return {
                ...state,
                pending: false,
                status: action.status,
                dcListUpdated: true,
                error: null
            }
        case degreeCourseActions.FAILED_DELETE_DEGREE_COURSE:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        default:
            return state;
    }
};