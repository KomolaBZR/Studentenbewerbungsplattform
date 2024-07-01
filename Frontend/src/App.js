import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LandingPage from './react/pages/LandingPage';
import StartPage from './react/pages/StartPage';
import UserManagementPage from "./react/pages/UserManagementPage";
import EditUserWidget from "./react/components/userManagementComponents/EditUserWidget";
import DegreeCourseManagementPage from "./react/pages/DegreeCourseManagementPage";
import DegreeCourseApplicationPage from "./react/pages/DegreeCourseApplicationPage";
import EditDegreeCourseWidget from "./react/components/degreeCourseComponents/EditDegreeCourseWidget";


function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<LandingPage />} />
                <Route path="/startpage" element={<StartPage />} />
                <Route path="/userManagement" element={<UserManagementPage />} />
                <Route path="/userEdit" element={<EditUserWidget />} />
                <Route path="/degreeCourseManagement" element={<DegreeCourseManagementPage />} />
                <Route path="/degreeCourseApplications" element={<DegreeCourseApplicationPage />} />
                {/*<Route path="/degreeCourseEdit" element={<EditDegreeCourseWidget />} />*/}
                <Route path="/degreeCourseEdit/:id" element={<EditDegreeCourseWidget />} />
            </Routes>
        </Router>
    );
}

export default App;
