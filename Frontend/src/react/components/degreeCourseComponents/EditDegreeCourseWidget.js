import React, {useEffect, useState} from "react";
import {connect, useDispatch, useSelector} from 'react-redux';
import * as degreeCourseActions from "../../../redux/degreeCourseManagement/DegreeCourseActions";
import {Link, useLocation} from 'react-router-dom';
import { useNavigate, useParams } from "react-router-dom";  // Add 'useParams'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Alert from 'react-bootstrap/Alert';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../layout/css/edit-u-cover.css';
import TopMenu from "../TopMenu";
import Sidebar from "../Sidebar";
import Footer from "../Footer";

function EditDegreeCourseWidget (props) {
    const location = useLocation();
    const { id } = useParams();

    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const linkStyle = { color: '#ced4da' };
    const [show, setShow] = useState(false);

    const degreeCourseData = location.state?.degreeCourse || {};
    const dispatch = useDispatch();
    const degreeCoursesData = useSelector(state => state.degreeCourses);

    const [degreeCourse, setDegreeCourse] = useState(
        {
            id: degreeCourseData.id,
            name: degreeCourseData.name,
            shortName: degreeCourseData.shortName,
            universityName: degreeCourseData.universityName,
            universityShortName: degreeCourseData.universityShortName,
            departmentName: degreeCourseData.departmentName,
            departmentShortName: degreeCourseData.departmentShortName
        });

    const handleClose = () => {
        console.log(successMsg);
        setShow(false);
        setSuccessMsg("");
    };
    const handleShow = () => setShow(true);

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await dispatch(degreeCourseActions.editDegreeCourse(degreeCourse?.id, degreeCourse));
        setLoading(false);
    };

    const navigate = useNavigate();
    const handleEditClick = () => {
        navigate(`/edit-degree-course/${degreeCourseData.id}`, { state: { degreeCourse: degreeCourseData } });
    };


    useEffect(() => {
        if (degreeCoursesData.dcListUpdated && !degreeCoursesData.error) {
            setSuccessMsg("Degree Course is successfully saved!");
        }
        console.log(successMsg);
    }, [degreeCoursesData.dcListUpdated])

    useEffect(() => {
        if(degreeCoursesData.error){
            setErrorMsg(degreeCoursesData.error.Error || "Error by editing");
        }
        console.log(errorMsg);
    }, [degreeCoursesData.error])

    useEffect(() => {
        if (degreeCoursesData.status === 'SUCCESS_EDIT_DEGREE_COURSE') {
            setSuccessMsg("Degree Course is successfully saved!");
        }
    }, [degreeCoursesData.status]);

    useEffect(() => {
        if (degreeCoursesData.error) {
            setErrorMsg(degreeCoursesData.error.Error || "Error by editing");
        }
    }, [degreeCoursesData.error]);

    return (

        <>
            <div>
                <div className="page-content" id="DegreeCourseManagementPage" style={{
                    background: 'white',
                    display: 'grid',
                    gridTemplateRows: 'auto 1fr auto',
                    minHeight: '100vh'
                }}>
                    <TopMenu/>

                    <div className="mainContainer" style={{display: 'flex', flexGrow: 1}}>
                        <div className="d-flex flex-nowrap">
                            <Sidebar/>
                            <div className="starter-template editUserSite" style={{flex: 1, padding: '20px'}}>
                                <Link to="/degreeCourseManagement">
                                    <Button variant="link" id="OpenDegreeCourseManagementPageListComponentButton">
                                        Zurück zur Studiengang-Liste
                                    </Button>
                                </Link>
                                <Form id="DegreeCourseManagementPageEditComponent" className="form-signin edit-form-control-signin edit-form-border"
                                      onSubmit={handleSubmit} disabled={loading}>
                                    <Image className="mb-4" src={require("../../../layout/icons/bhtShortLogo.png")} alt="Logo" width="72"
                                           height="72"/>
                                    <h2 className="h3 mb-3 font-weight-normal">{degreeCourseData.shortName}:{degreeCourseData.name} editieren</h2>

                                    <Form.Control
                                        className="form-control edit-form-control"
                                        type="text"
                                        id="EditDegreeCourseComponentEditName"
                                        name='courseName'
                                        placeholder="Studiengang-Name"
                                        value={degreeCourse.name}
                                        onChange={async (e) => {
                                            setDegreeCourse({ ...degreeCourse, name: e.target.value }) }}
                                        />
                                    <Form.Control
                                        className="form-control edit-form-control"
                                        type="text"
                                        id="EditDegreeCourseComponentEditShortName"
                                        name='courseShortName'
                                        placeholder="Studiengang-Kurzbezeichnung"
                                        value={degreeCourse.shortName}
                                        onChange={async (e) => {
                                            setDegreeCourse({ ...degreeCourse, shortName: e.target.value })
                                    }}/>
                                    <Form.Control
                                        className="form-control edit-form-control"
                                        type="text"
                                        id="EditDegreeCourseComponentEditUniversityName"
                                        name='universityName'
                                        placeholder="Universität-Name"
                                        value={degreeCourse.universityName}
                                        onChange={async (e) => {
                                            setDegreeCourse({ ...degreeCourse, universityName: e.target.value })
                                    }}/>
                                    <Form.Control
                                        className="form-control edit-form-control"
                                        type="text"
                                        id="EditDegreeCourseComponentEditUniversityShortName"
                                        name='universityShortName'
                                        placeholder="Universität-Kurzbezeichnung"
                                        value={degreeCourse.universityShortName}
                                        onChange={async (e) => {
                                            setDegreeCourse({ ...degreeCourse, universityShortName: e.target.value })
                                    }}/>
                                    <Form.Control
                                        className="form-control edit-form-control"
                                        type="text"
                                        id="EditDegreeCourseComponentEditDepartmentName"
                                        name='departmentName'
                                        placeholder="Fachbereich-Name"
                                        value={degreeCourse.departmentName}
                                        onChange={async (e) => {
                                            setDegreeCourse({ ...degreeCourse, departmentName: e.target.value })
                                    }}/>
                                    <Form.Control
                                        className="form-control edit-form-control"
                                        type="text"
                                        id="EditDegreeCourseComponentEditDepartmentShortName"
                                        name='departmentShortName'
                                        placeholder="Universität-Kurzbezeichnung"
                                        value={degreeCourse.departmentShortName}
                                        onChange={async (e) => {
                                            setDegreeCourse({ ...degreeCourse, departmentShortName: e.target.value })
                                    }}/>

                                    <Button
                                        type="submit"
                                        id="EditDegreeCourseComponentSaveDegreeCourseButton"
                                        variant="secondary"
                                        size="lg"
                                        style={linkStyle}
                                        disabled={loading}
                                    >
                                        Speichern
                                    </Button>

                                    {loading && <p>Loading...</p>}
                                    {successMsg && (
                                        <Alert className="mt-2" variant="success" style={{ border: "1px solid #28a745" }}>
                                            {successMsg}
                                        </Alert>
                                    )}
                                    {errorMsg && (
                                        <Alert className="mt-2" variant="danger" style={{ border: "1px solid #28a745" }}>
                                            {errorMsg}
                                        </Alert>
                                    )}
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        </>
    );
}

export default EditDegreeCourseWidget;