import React, {Component} from "react";
import { connect } from 'react-redux';

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';


import * as authenticationActions from "../../redux/authentication/AuthenticationActions";
import { bindActionCreators } from "redux";
import { Alert } from 'react-bootstrap';

const mapStateToProps = state => {
    const {dialog}= state;
    return dialog;
}


class UserSessionWidget extends Component{

    constructor(props){
        super(props);
        this.state = {
            username: '',
            password:''
        };
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleShow(e){
        e.preventDefault();
        /*this.setState({show: true});*/
        const {showLoginDialogAction} =this.props;
        showLoginDialogAction();
    }

    handleClose(){
        /* this.setState({show: false});*/
        const {hideLoginDialogAction} = this.props;
        hideLoginDialogAction();
    }

    handleChange(e){
        const {name, value} = e.target;
        this.setState({[name]: value});
        //console.log(JSON.stringify(this.state));
    }

    handleSubmit(e){
        e.preventDefault();
        const {username, password} = this.state;
        const {authenticateUserAction} = this.props;
        authenticateUserAction(username,password);
        console.log("Pushed submit");
    }



    render(){
        const buttonColor = '#ced4da';
        let messageText;

        var showDialog = this.props.showLoginDialog;
        if(showDialog === undefined){
            showDialog = false;
        }

        if(this.props.error){
            messageText = (
                <Alert className="text-center mt-3" key='danger' variant='danger'>
                    {this.props.error}
                </Alert>
            );
        }

        return (
            <div>
                <Button id="OpenLoginDialogButton" variant="outline-secondary"
                        style={{ backgroundColor: buttonColor, border: 'none'}} onClick={this.handleShow}>
                    <FontAwesomeIcon icon={faSignInAlt} size="2x" />
                </Button>

                <Modal id="LoginDialog" show={showDialog} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Login</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Username</Form.Label>
                                <Form.Control id="LoginDialogUserIDText" type="text" placeholder="User ID" name='username' onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control id="LoginDialogPasswordText" type="password" placeholder="Password" name='password' onChange={this.handleChange}/>
                            </Form.Group>
                            <div className="d-flex justify-content-center">
                                <Button id="PerformLoginButton" variant="outline-secondary" type="submit" onClick={this.handleSubmit}>
                                    Submit
                                </Button>
                            </div>
                            { messageText }
                        </Form></Modal.Body>
                    <Modal.Footer>
                        {/*Passwort vergesssen?*/}
                        {/* <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleClose}>
                            Save Changes
                        </Button> */}
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    showLoginDialogAction: authenticationActions.getShowLoginDialogAction,
    hideLoginDialogAction: authenticationActions.getHideLoginDialogAction,
    authenticateUserAction: authenticationActions.authenticateUser
}, dispatch);

const ConnectedUserSessionWidget = connect(mapStateToProps,mapDispatchToProps)(UserSessionWidget);

export default ConnectedUserSessionWidget;