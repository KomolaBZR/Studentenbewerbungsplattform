import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import * as degreeCourseApplicationActions from "../../redux/degreeCourseApplication/DegreeCourseApplicationActions";
import DeleteApplicationWidget from "./applicationComponents/DeleteApplicationWidget";

function ApplicationComponent() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const authData = useSelector((state) => state.auth);
    const isAdmin = authData?.userData?.isAdmin;
    const userNotAdmin = authData?.userData?.userID;
    const degreeCourseApplicationsData = useSelector((state) => state.degreeCourseApplications);

    useEffect(() => {
        const fetchData = async () => {
            if (isAdmin) {
                await dispatch(degreeCourseApplicationActions.getDegreeCourseApplications());
            } else if (userNotAdmin) {
                await dispatch(degreeCourseApplicationActions.getDegreeCourseApplicationsById());
            }
        };

        fetchData();
    }, [dispatch, isAdmin, userNotAdmin, degreeCourseApplicationsData.dcaListUpdated]);




    return (
        degreeCourseApplicationsData.pending ? (
            <h2 className="display-6 text-center">Loading...</h2>
        ) : degreeCourseApplicationsData.error ? (
            <h2 className="display-6 text-center">{degreeCourseApplicationsData.error}</h2>
        ) : (
            <div>
                {/*<CreateNewApplicationWidget />*/}
                <div id="DegreeCourseApplicationManagementPageListComponent" className="card-deck mb-3 text-center d-flex justify-content-evenly flex-wrap">
                    {degreeCourseApplicationsData.degreeCourseApplications && degreeCourseApplicationsData.degreeCourseApplications.length > 0 ? (
                        degreeCourseApplicationsData.degreeCourseApplications.map(degreeCourseApplication => {
                            console.log(degreeCourseApplication);
                        return (
                            <div className="card mb-4 box-shadow" id={'DegreeCourseApplicationItem' + degreeCourseApplication?.id} key={degreeCourseApplication?.id} style={{ maxWidth: '25rem' }}>
                                <div className="card-header">
                                    <h4 className="my-0 font-weight-normal">{degreeCourseApplication?.applicantUserID}:{degreeCourseApplication?.targetPeriodShortName}{degreeCourseApplication?.universityShortName} {degreeCourseApplication?.targetPeriodYear}</h4>
                                </div>
                                <div className="card-body">
                                    <ul className="list-unstyled mt-3 mb-4">
                                        <li id="ApplicantUserID">User: {degreeCourseApplication?.applicantUserID}</li>
                                        <li id="DegreeCourseName">Studiengang: {degreeCourseApplication?.degreeCourseName}</li>
                                        <li id="TargetPeriodYear">Bewerbungsjahr: {degreeCourseApplication?.targetPeriodYear}</li>
                                        <li id="TargetPeriodShortName">Bewerbungssemester: {degreeCourseApplication?.targetPeriodShortName}</li>
                                        <li id="UniversityShortName">Universität: {degreeCourseApplication?.universityShortName}</li>
                                        <li id="DepartmentShortName">Fachbereich: {degreeCourseApplication?.departmentShortName}</li>
                                    </ul>
                                </div>
                                {(isAdmin && degreeCourseApplication) && <DeleteApplicationWidget dca={degreeCourseApplication} />}
                            </div>
                        );
                    })
                    ) : (
                        <h2 className="display-6 text-center">No users available</h2>
                    )}
                </div>
            </div>
        )
    );
    }

    export default ApplicationComponent;