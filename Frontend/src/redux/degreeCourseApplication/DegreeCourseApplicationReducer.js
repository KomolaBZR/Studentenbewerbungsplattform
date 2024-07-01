import * as degreeCourseApplicationActions from "./DegreeCourseApplicationActions";

const initialState = {
    degreeCourseApplications: [],
    pending: false,
    dcaListUpdated: false,
    error: null
};

export default function degreeCourseApplicationReducer(state = initialState, action){

    console.log('Bin in degreeCourseApplicationReducer: ' + action.type);

    switch (action.type) {
        case degreeCourseApplicationActions.REQUEST_READ_DEGREE_COURSE_APPLICATIONS:
            return {
                ...state,
                pending: true,
                error: null
            }
        case degreeCourseApplicationActions.SUCCESS_READ_DEGREE_COURSE_APPLICATIONS:
                console.log('Degree courses applications payload:', action.degreeCourseApplications);
                return {
                    ...state,
                    pending: false,
                    degreeCourseApplications: action.degreeCourseApplications,
                    dcaListUpdated: false,
                    error: null
            }
        case degreeCourseApplicationActions.FAILED_READ_DEGREE_COURSE_APPLICATIONS:
            return {
                ...state,
                pending: false,
                degreeCourseApplications: [],
                error: action.error
            }
        case degreeCourseApplicationActions.REQUEST_READ_DEGREE_COURSE_APPLICATIONS_BY_ID:
            return {
                ...state,
                pending: true,
                error: null
            }
        case degreeCourseApplicationActions.SUCCESS_READ_DEGREE_COURSE_APPLICATIONS_BY_ID:
            return {
                ...state,
                pending: false,
                degreeCourseApplications: action.degreeCourseApplications,
                dcaListUpdated: false,
                error: null
            }
        case degreeCourseApplicationActions.FAILED_READ_DEGREE_COURSE_APPLICATIONS_BY_ID:
            return {
                ...state,
                pending: false,
                degreeCourseApplications: [],
                error: action.error
            }
        case degreeCourseApplicationActions.REQUEST_CREATE_DEGREE_COURSE_APPLICATION:
            return {
                ...state,
                pending: true,
                error: null
            }
        case degreeCourseApplicationActions.SUCCESS_CREATE_DEGREE_COURSE_APPLICATION:
            return {
                ...state,
                pending: false,
                status: action.status,
                dcaListUpdated: true,
                error: null,
                degreeCourseApplications: [...state.degreeCourseApplications, action.newApplication]
            }
        case degreeCourseApplicationActions.FAILED_CREATE_DEGREE_COURSE_APPLICATION:
            console.error('Failed to create degree course application:', action.error);
            return {
                ...state,
                pending: false,
                error: action.error
            }
        case degreeCourseApplicationActions.REQUEST_EDIT_DEGREE_COURSE_APPLICATION:
            return {
                ...state,
                pending: true,
                error: null
            }
        case degreeCourseApplicationActions.SUCCESS_EDIT_DEGREE_COURSE_APPLICATION:
            return {
                ...state,
                pending: false,
                status: action.status,
                dcaListUpdated: true,
                error: null
            }
        case degreeCourseApplicationActions.FAILED_EDIT_DEGREE_COURSE_APPLICATION:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        case degreeCourseApplicationActions.REQUEST_DELETE_DEGREE_COURSE_APPLICATION:
            return {
                ...state,
                pending: true,
                error: null
            }
        case degreeCourseApplicationActions.SUCCESS_DELETE_DEGREE_COURSE_APPLICATION:
            return {
                ...state,
                pending: false,
                status: action.status,
                dcaListUpdated: true,
                error: null
            }
        case degreeCourseApplicationActions.FAILED_DELETE_DEGREE_COURSE_APPLICATION:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        default:
            return state;
    }
};