import React, {useEffect, useState} from 'react';
import '../../layout/css/sidebars.css';
import TopMenu from '../components/TopMenu';
import Footer from '../components/Footer';
import Sidebar from "../components/Sidebar"

function StartPage() {
    return (
        <div className="page-content" id="StartPage" style={{ background: 'white', display: 'grid', gridTemplateRows: 'auto 1fr auto', minHeight: '100vh' }}>
            <TopMenu />

            <div className="mainContainer" style={{ display: 'flex', flexGrow: 1 }}>
                <div className="d-flex flex-nowrap">
                    <Sidebar />
                    <div className="starter-template" style={{ flex: 1, padding: '20px' }}>
                        <h1>Start Seite für Sie</h1>
                        <p className="lead" style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.5vw' }}>
                            Sollte ihre Anfrage bzw. das Problem im Fachbereich
                            nicht geklärt werden können, können sich alle Lehrenden und Beschäftigen
                            gern an den BIS Support wenden. Senden Sie uns bitte eine E-Mail an
                            bis-support@bht-berlin.de. Hilfreich ist oft eine ausführliche Beschreibung
                            Ihres Anliegens, Fehlers, Problems etc. In einigen Fällen ist auch
                            ein Screenshot nützlich. Wir werden uns dann zeitnah mit ihnen in Verbindung setzen.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default StartPage;