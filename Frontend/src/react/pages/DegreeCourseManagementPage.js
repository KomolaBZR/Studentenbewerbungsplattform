import React from 'react';
import '../../layout/css/userManagement.css';
import '../../layout/css/sidebars.css';
import TopMenu from "../components/TopMenu";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import DegreeCourseComponent from "../components/DegreeCourseComponent";


function DegreeCourseManagementPage() {
    return (
            <div className="page-content" id="DegreeCourseManagementPage" style={{ background: 'white', display: 'grid', gridTemplateRows: 'auto 1fr auto', minHeight: '100vh' }}>
                <TopMenu />

                <div className="mainContainer" style={{ display: 'flex', flexGrow: 1 }}>
                    <div className="d-flex flex-nowrap">
                        <Sidebar />
                        <div className="starter-template" style={{ flex: 1, padding: '20px' }}>
                            <h1>Degree Courses</h1>
                            <p className="lead" style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.5vw' }}>
                            </p>
                            <DegreeCourseComponent />
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
            );
}

export default DegreeCourseManagementPage;