import React from 'react';
import UserComponent from '../components/UserComponent';
import '../../layout/css/userManagement.css';
import '../../layout/css/sidebars.css';
import {useSelector} from "react-redux";
import TopMenu from "../components/TopMenu";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";


function UserManagementPage() {
    return (
        <div>
            <div className="page-content" id="UserManagementPage" style={{ background: 'white', display: 'grid', gridTemplateRows: 'auto 1fr auto', minHeight: '100vh' }}>
                <TopMenu />

                <div className="mainContainer" style={{ display: 'flex', flexGrow: 1 }}>
                    <div className="d-flex flex-nowrap">
                        <Sidebar />
                        <div className="starter-template" style={{ flex: 1, padding: '20px' }}>
                <h1> User-Liste </h1>
                <UserComponent />
            </div>
        </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default UserManagementPage;