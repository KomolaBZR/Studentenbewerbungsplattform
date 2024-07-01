import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import {Button, Form} from "react-bootstrap";
import * as degreeCourseActions from "../../redux/degreeCourseManagement/DegreeCourseActions";
import CreateNewDegreeCourseWidget from "./degreeCourseComponents/CreateNewDegreeCourseWidget";
import DeleteDegreeCourseWidget from "./degreeCourseComponents/DeleteDegreeCourseWidget";
import CreateNewApplicationWidget from "./applicationComponents/CreateNewApplicationWidget";


function DegreeCourseComponent(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const degreeCoursesData = useSelector(state => state.degreeCourses);
    const [degreeCourses, setDegreeCourses] = useState([]);
    const authData = useSelector((state) => state.auth);
    const isAdmin = authData?.userData?.isAdmin;


    useEffect(() => {
        dispatch(degreeCourseActions.getDegreeCourses());
    }, [dispatch, degreeCoursesData.dcListUpdated]);


    const editDegreeCoursehandler = async (degreeCourse) => {
        navigate(`/degreeCourseEdit/${degreeCourse.id}`, { state: { degreeCourse: degreeCourse } });
    };


    return (
        degreeCoursesData.pending ? (
            <h2 className="display-6 text-center">Loading...</h2>
        ) : degreeCoursesData.error ? (
            <h2 className="display-6 text-center">{degreeCoursesData.error}</h2>
        ) : (
            <div>
                {isAdmin &&
                <CreateNewDegreeCourseWidget />}
                <div id="DegreeCourseManagementPageListComponent" className="card-deck mb-3 text-center d-flex justify-content-evenly flex-wrap">
                    {degreeCoursesData.degreeCourses && degreeCoursesData.degreeCourses.length > 0 ? (
                        degreeCoursesData.degreeCourses.map(degreeCourse => (
                            <div className="card mb-4 box-shadow" id={'DegreeCourseItem' + degreeCourse?.id} key={degreeCourse?.id} style={{ maxWidth: '25rem'}}>
                                <div className="card-header">
                                    <h4 className="my-0 font-weight-normal">{degreeCourse?.name}</h4>
                                </div>
                                <div className="card-body">
                                    <ul className="list-unstyled mt-3 mb-4">
                                        <li id="Name">Studiengang-Name: {degreeCourse?.name}</li>
                                        <li>Studiengang-Kurzbezeichnung: {degreeCourse?.shortName}</li>
                                        <li id="UniversityName">Universität-Name: {degreeCourse?.universityName}</li>
                                        <li>Universität-Kurzbezeichnung: {degreeCourse?.universityShortName}</li>
                                        <li id="DepartmentName">Fachbereich-Name: {degreeCourse?.departmentName}</li>
                                        <li>Universität-Kurzbezeichnung: {degreeCourse?.departmentShortName}</li>
                                    </ul>
                                </div>
                                {isAdmin &&
                                <Button
                                    className="btn common-button"
                                    id={`DegreeCourseItemEditButton${degreeCourse?.id}`}
                                    variant="secondary"
                                    size="lg"
                                    onClick={() => editDegreeCoursehandler(degreeCourse)}
                                    active
                                >
                                    Edit
                                </Button>}
                                {isAdmin &&
                                <DeleteDegreeCourseWidget dc={degreeCourse} />}
                                <CreateNewApplicationWidget degreeCourseData={degreeCourse} />
                            </div>
                        ))
                    ) : (
                        <h2 className="display-6 text-center">No users available</h2>
                    )}
                </div>
            </div>
        )
    );
}

export default DegreeCourseComponent;