import React,{useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Image from 'react-bootstrap/Image';

import logo from '../../layout/icons/logobht.png'; 

import UserSessionWidget from './UserSessionWidget';
import * as authenticationActions from "../../redux/authentication/AuthenticationActions";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';


function TopMenu() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authData = useSelector(state => state.auth);
  var menuContainer;
  const buttonColor = '#ced4da';

  useEffect(() => {
    if (!authData || !authData.token) {
      console.log("Go to Landing Page!!!!!!");
      navigate('/');
    }
  }, [authData, navigate]);

  const handleLogout = async (e) => {
    e.preventDefault();
    await dispatch(authenticationActions.logoutUser(authData.userData, authData.token));
    console.log(authData)
    // navigate('/');
  }

  if (authData.token) {
    console.log(authData);
    menuContainer = ( <div>
      <Navbar expand="lg" className="bg-body-tertiary mb-3" fixed="top">
        <Container fluid>
          <Navbar.Brand href="#">
            <Image src={logo} alt="Logo" fluid width={"200"} height={"200"}/>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <Navbar.Offcanvas
              id="offcanvasNavbar"
              aria-labelledby="offcanvasNavbarLabel"
              placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">
                <Image src={logo} alt="Logo" fluid width={"200"} height={"200"}/>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <NavDropdown title="Informationen" id="offcanvasNavbarDropdown">
                  <NavDropdown.Item href="#uber-uns">Über uns</NavDropdown.Item>
                  <NavDropdown.Item href="#kontakt">Kontakt</NavDropdown.Item>
                  <NavDropdown.Item href="#impressum">Impressum</NavDropdown.Item>
                </NavDropdown>
              </Nav>
              {/*Logout Button*/}
              <Button id="LogoutButton" variant="outline-secondary"
                      style={{
                        backgroundColor: buttonColor,
                        border: 'none'
                      }} onClick={handleLogout}> <FontAwesomeIcon icon={faSignOutAlt} size="2x" />
              </Button>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </div>);
  }else{
    //if startPage
    menuContainer = ( <div>
      <Navbar expand="lg" className="bg-body-tertiary mb-3" fixed="top">
        <Container fluid>
          <Navbar.Brand href="#">
            <Image src={logo} alt="Logo" fluid width={"200"} height={"200"}/>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <Navbar.Offcanvas
              id="offcanvasNavbar"
              aria-labelledby="offcanvasNavbarLabel"
              placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">
                <Image src={logo} alt="Logo" fluid width={"200"} height={"200"}/>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <NavDropdown title="Informationen" id="offcanvasNavbarDropdown">
                  <NavDropdown.Item href="#uber-uns">Über uns</NavDropdown.Item>
                  <NavDropdown.Item href="#kontakt">Kontakt</NavDropdown.Item>
                  <NavDropdown.Item href="#impressum">Impressum</NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <UserSessionWidget/>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </div>);
  }

return (
    menuContainer
  );
}

export default TopMenu;