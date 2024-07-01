import React, {useEffect} from 'react';
import '../../layout/css/product.css';
import TopMenu from '../components/TopMenu';
import Footer from '../components/Footer';
import LoginButton from '../components/LoginButton';
import StartPage from "./StartPage";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

function LandingPage() {
    const navigate = useNavigate();
    const authData = useSelector(state => state.auth);

    useEffect(() => {
        if (authData?.token) {
            console.log("Go to Starting Page!!!!!!");
            navigate('/startpage');
        }
    }, [authData, navigate]);

    return (
        <div className="page-content" id="LandingPage" style={{background: 'white'}}>
            <TopMenu/>
            <div className='mainContainer'>
                <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-body-tertiary ">
                    <div className="col-md-6 p-lg-5 mx-auto my-5">
                        <h1 className="display-3 fw-bold">Studienbewerberportal</h1>
                        <h3 className="fw-bold text-muted mb-3">Lehrorganisation, Forschungsdatenverwaltung und
                            Promotionsdatenbank</h3>
                        <LoginButton/>
                    </div>
                </div>

                <div className="d-md-flex flex-md-equal w-100 my-md-3 ps-md-3">
                    <div className="text-bg-dark me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
                        <div className="my-3 py-3">
                            <h2 className="display-5">Lehrorganisation</h2>
                            <p className="lead fw-bold ">Planen, Verwalten und Abrechen aller Lahreveranstaltungen der
                                BHT.</p>
                        </div>
                        <div className="bg-body-tertiary shadow-sm mx-auto"
                             style={{width: '80%', height: '300px', borderRadius: '21px 21px 0 0'}}></div>
                    </div>
                    <div className="bg-body-tertiary  me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
                        <div className="my-3 p-3">
                            <h2 className="display-5">Forschungs-<br/>datenverwaltung</h2>
                            <p className="lead fw-bold ">Unterstützung der Fachbereiche bei der Administration.</p>
                        </div>
                        <div className="bg-dark shadow-sm mx-auto"
                             style={{width: '80%', height: '300px', borderRadius: '21px 21px 0 0'}}></div>
                    </div>
                    <div className="text-bg-dark me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
                        <div className="my-3 py-3">
                            <h2 className="display-5">Promotions-<br/>datenbank</h2>
                            <p className="lead fw-bold ">Verwalten der Forschungsleistunrn wie den Publikationen;
                                Kooperationen und Projekten.</p>
                        </div>
                        <div className="bg-body-tertiary shadow-sm mx-auto"
                             style={{width: '80%', height: '300px', borderRadius: '21px 21px 0 0'}}></div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}


export default LandingPage;