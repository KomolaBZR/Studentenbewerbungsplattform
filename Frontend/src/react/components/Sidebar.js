import React, { useEffect, useState } from 'react';
import '../../layout/css/sidebars.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faUniversity } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import { faBook } from '@fortawesome/free-solid-svg-icons';


function Sidebar() {
    const [activeLink, setActiveLink] = useState('home');


    const authData = useSelector(state => state.auth);
    const navigate = useNavigate();
    var linkToUserManagementPage;
    var linkToStudiengang;
    var linkToDegreeCourseApplication;

    useEffect(() => {
        if (!authData || !authData.userData) {
            console.log("Token is expired or user logged out...");
            navigate('/');
        } else {
            // Set 'home' as the default active link
            setActiveLink('home');
        }
    }, [authData, navigate]);

    const handleIconClick = (link) => {
        console.log('Before Navigation - activeLink:', activeLink, 'link:', link);
        setActiveLink(link);
        navigate(`/${link === 'home' ? 'startpage' : link}`);
        console.log('After Navigation - activeLink:', activeLink, 'link:', link);
    };

    if (authData && authData.userData) {
        const isAdmin = authData.userData.isAdmin;
        if (isAdmin) {
            console.log('isAdmin: ', authData.userData.isAdmin);
            linkToUserManagementPage = (
                <LinkContainer to="/userManagement" id="OpenUserManagementPageButton"
                               className={activeLink === 'profile' ? 'link-container-active' : ''}>
                    <div
                        className={`nav-link py-3 border-bottom rounded-0`}
                        title="Profile"
                        data-bs-toggle="tooltip"
                        data-bs-placement="right"
                        onClick={() => handleIconClick('profile')}
                    >
                        <FontAwesomeIcon icon={faUser} style={{color: 'black', fontSize: '2rem'}}/>
                    </div>
                </LinkContainer>
            );
        }

            console.log('isAdmin: ', authData.userData.isAdmin);
            linkToStudiengang = (
                <LinkContainer to="/degreeCourseManagement" id="OpenDegreeCourseManagementPageButton"
                               className={activeLink === 'university' ? 'link-container-active' : ''}>
                    <div
                        className={`nav-link py-3 border-bottom rounded-0`}
                        title="University"
                        data-bs-toggle="tooltip"
                        data-bs-placement="right"
                        onClick={() => handleIconClick('university')}
                    >
                        <FontAwesomeIcon icon={faUniversity} style={{color: 'black', fontSize: '2rem'}}/>
                    </div>
                </LinkContainer>
            );

            // link for Degree Course Application
            linkToDegreeCourseApplication = (
                <LinkContainer to="/degreeCourseApplications" id="OpenDegreeCourseApplicationManagementPageButton"
                               className={activeLink === 'degreeCourseApplications' ? 'link-container-active' : ''}>
                    <div
                        className={`nav-link py-3 border-bottom rounded-0`}
                        title="Degree Course Application"
                        data-bs-toggle="tooltip"
                        data-bs-placement="right"
                        onClick={() => handleIconClick('degreeCourseApplications')}
                    >
                        <FontAwesomeIcon icon={faBook} style={{color: 'black', fontSize: '2rem'}}/>
                    </div>
                </LinkContainer>
            );
    }




    return (
        <div className="d-flex flex-column flex-shrink-0 bg-body-tertiary"
             style={{width: '5.5rem', paddingTop: '1rem'}}>
            <div className="nav nav-pills nav-flush flex-column mb-auto text-center">
                <LinkContainer to="/startpage" id="OpenStartPageButton" className={activeLink === 'home' ? 'link-container-active' : ''}>
                    <div
                        className={`nav-link py-3 border-bottom rounded-0`}
                        aria-current="page"
                        title="Home"
                        data-bs-toggle="tooltip"
                        data-bs-placement="right"
                        onClick={() => handleIconClick('home')}
                    >
                        <FontAwesomeIcon icon={faHome} style={{color: 'black', fontSize: '2rem'}}/>
                    </div>
                </LinkContainer>

                {linkToUserManagementPage}
                {linkToStudiengang}
                {linkToDegreeCourseApplication}
            </div>
        </div>
    );

}

export default Sidebar;