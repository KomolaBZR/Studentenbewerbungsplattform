import React, {useEffect, useState} from "react";
import {Modal, Button, Form, Image, ToggleButton, Alert} from 'react-bootstrap';
import {connect, useDispatch, useSelector} from 'react-redux';
import * as degreeCourseApplicationActions from '../../../redux/degreeCourseApplication/DegreeCourseApplicationActions';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../layout/css/create-nu-cover.css';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {FaPlus } from 'react-icons/fa';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBook} from "@fortawesome/free-solid-svg-icons";




function CreateNewApplicationWidget(props) {
    const [show, setShow] = useState(false);
    const [errMes, setErrMes] = useState('');
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setErrMes(null);
        setShow(true);
    }
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const authData = useSelector((state) => state.auth);
    const degreeCourseApplicationsData = useSelector((state) => state.degreeCourseApplications);
    const location = useLocation();
    const degreeCourseApplicationData = location.state?.degreeCourseApplications || {};
    const degreeCoursesData = useSelector(state => state.degreeCourses);

    const isAdmin = authData?.userData?.isAdmin;
    const { degreeCourseData } = props;

    const [degreeCourseApplication, setDegreeCourseApplication] = useState(() => ({
        applicantUserID: isAdmin ? "" : authData?.userData?.userID || "",
        targetPeriodYear: "",
        targetPeriodShortName: "",
        degreeCourseID: degreeCourseData?.id || "", // Set default value to an empty string or provide a fallback
        degreeCourseName: degreeCourseData?.name || "", // Set default value to an empty string or provide a fallback
    }));

    useEffect(() => {
        if(degreeCourseApplicationsData.status !== 201 || degreeCourseApplicationsData.error){
            // Here you can add an error message for the user
            console.log(degreeCourseApplicationsData.error);
            console.log(degreeCourseApplicationsData.status);
            setErrMes(degreeCourseApplicationsData.error);
        } else {
            handleClose();
        }
    }, [degreeCourseApplicationsData.status, degreeCourseApplicationsData.error]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const { applicantUserID, ...degreeCourseApplicationNotAdmin } = degreeCourseApplication;

        try {
            const requestBody = isAdmin ? degreeCourseApplication : degreeCourseApplicationNotAdmin;
            await dispatch(degreeCourseApplicationActions.createDegreeCourseApplication(requestBody));
            console.log("degreeCourseApp:", degreeCourseApplication);
            console.log("degreeCourseData:", degreeCourseData);
            console.log(degreeCourseApplicationsData);
            // handleClose();
        } catch (error) {
            setErrMes('Error by creating application');
            console.error("Error creating degree course application:", error);
        }
    };


    // Generate an array of years from 2020 to 2030
    const years = Array.from({ length: 11 }, (_, index) => (2020 + index).toString());
    const isDegreeCourseApplicationsPage = location.pathname === '/degreeCourseApplications';

    return (
        <>

            {isDegreeCourseApplicationsPage ? (
                <Button
                    className="block-example border border-0 border-dark mb-4"
                    id={"CreateDegreeCourseApplicationForDegreeCourse"+props.degreeCourseData.id}
                    onClick={handleShow}
                    style={{ background: '#fff' }}
                >
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <FontAwesomeIcon icon={faBook} size={30} color={'#3f464c'} style={{ marginRight: '5px' }} />
                        <FaPlus size={20} color={'#3f464c'} />
                    </div>
                </Button>
            ) : (
                <Button
                    className="btn common-button button-create-application"
                    id={"CreateDegreeCourseApplicationForDegreeCourse"+props.degreeCourseData.id}
                    onClick={handleShow}
                    variant="secondary"
                    style={{ background: '#236fc7' }}
                >
                    Create Application
                </Button>
            )}

            <Modal id="DegreeCourseApplicationManagementPageCreateComponent" className="modal fade" show={show} onHide={handleClose} >
                <Modal.Header className="modal-header border-bottom-0" closeButton>{ degreeCourseData.shortName }: { degreeCourseData.name }</Modal.Header>
                <Modal.Body className="modal-body d-flex flex-column text-center">
                    <Form className="form-signin">
                        <Image className="mb-4" src={require("../../../layout/icons/bhtShortLogo.png")} alt="Logo" width="72" height="72" />
                        <h3 className="h3 mb-3 font-weight-normal">Studienbewerbung anlegen</h3>

                        {isAdmin && (
                            <Form.Control
                                className="form-control"
                                type="text"
                                id="CreateDegreeCourseApplicationEditUserID"
                                name='applicantUserID'
                                placeholder="User-ID"
                                value={degreeCourseApplication.applicantUserID}
                                onChange={(e) => setDegreeCourseApplication({ ...degreeCourseApplication, applicantUserID: e.target.value })}
                                required
                                autoFocus
                            />
                        )}
                        {!isAdmin && (
                            <Form.Control
                                className="form-control"
                                type="text"
                                name='applicantUserID'
                                id="CreateDegreeCourseApplicationEditUserID"
                                placeholder="User-ID"
                                value={degreeCourseApplication.applicantUserID}
                                onChange={(e) => setDegreeCourseApplication({ ...degreeCourseApplication, applicantUserID: e.target.value })}
                                disabled
                                autoFocus
                            />
                        )}
                        <Form.Control
                            as="select"
                            className="form-control"
                            id="CreateDegreeCourseApplicationEditTargetPeriodYear"
                            name="targetPeriodYear"
                            value={degreeCourseApplication.targetPeriodYear}
                            onChange={(e) => setDegreeCourseApplication({ ...degreeCourseApplication, targetPeriodYear: e.target.value })}
                            required
                        >
                            <option value="" disabled>Select Year</option>
                            {years.map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </Form.Control>
                        <Form.Control
                            as="select"
                            className="form-control"
                            id="CreateDegreeCourseApplicationEditTargetPeriodName"
                            name="targetPeriodShortName"
                            value={degreeCourseApplication.targetPeriodShortName}
                            onChange={(e) => setDegreeCourseApplication({ ...degreeCourseApplication, targetPeriodShortName: e.target.value })}
                            required
                        >
                            <option value="" disabled>Bitte Semester auswählen</option>
                            <option value="WiSe">Wintersemester</option>
                            <option value="SoSe">Sommersemester</option>
                        </Form.Control>

                        <Button
                            type="submit"
                            id="CreateDegreeCourseApplicationCreateButton"
                            variant="secondary"
                            size="lg"
                            onClick={handleSubmit}>
                            Anlegen
                        </Button>
                        {errMes && (
                            <Alert className="mt-2" variant="danger" style={{border: "1px solid #28a745"}}>
                                {errMes}
                            </Alert>
                        )}

                        <p className="mt-5 mb-3 text-muted">&copy; 2024</p>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default CreateNewApplicationWidget;