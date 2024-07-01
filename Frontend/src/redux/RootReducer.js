import { combineReducers } from 'redux';
import dialogReducer from './DialogReducer';
import authenticationReducer from "./authentication/AuthenticationReducer";
import userReducer from "./user/UserReducer";
import degreeCourseReducer from "./degreeCourseManagement/DegreeCourseReducer";
import degreeCourseApplicationReducer from "./degreeCourseApplication/DegreeCourseApplicationReducer";

const rootReducer = combineReducers({
    dialog: dialogReducer,
    auth: authenticationReducer,
    users: userReducer,
    degreeCourses:degreeCourseReducer,
    degreeCourseApplications: degreeCourseApplicationReducer
});
export default rootReducer;