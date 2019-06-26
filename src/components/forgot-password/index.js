import React, {Component} from 'react';
import {Container, Row} from 'react-bootstrap';
import usersClient from "../../users-client";

import BlueBackground from '../layouts/blue-bg';
import BlueCardCenter from '../layouts/blue-card-center';
import WhiteCard from '../layouts/white-card';
import FormHeader from '../layouts/form-header';
import Input from '../layouts/inputs';
import DefaultBtn from '../layouts/buttons/DefaultBtn';
import WhiteLogo from '../layouts/white-logo';

import './forgot-password.css';
import {showErrorAlert} from "../../alerts";
import ReactNotification from "react-notifications-component";

export default class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.notificationDOMRef = React.createRef();
    }

    state = {
        email: '',
    };

    onHandleClick = (e) => {
        e.preventDefault();

        usersClient.post('/user/reset_password', {email: this.state.email})
            .then(res => {
                this.props.history.push({
                    pathname: '/forgot-password/info',
                    state: {email: this.state.email}
                })
            })
            .catch(error => {
                showErrorAlert(
                    this.notificationDOMRef,
                    error.response.data.error,
                    error.response.status
                );
            });
    };

    onHandleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    onCloseClick = (e) => {
        e.preventDefault();
        this.props.history.push({
            pathname: '/'
        });
    };

    render() {
        return (
            <BlueBackground>
                <ReactNotification ref={this.notificationDOMRef}/>
                <div className='forgot-password'>
                    <Container>
                        <Row>
                            <BlueCardCenter>
                                <WhiteLogo/>
                                <WhiteCard onClick={this.onCloseClick}>
                                    <FormHeader header='forgot password?'/>
                                    <h4 className='forgot-password__header'>Enter the email address associated with your
                                        account.</h4>
                                    <p className='forgot-password__message'>We will email you a link which should be
                                        used to reset your
                                        password.</p>
                                    <Input
                                        icon='envelope'
                                        placeholder='Example@gmail.com'
                                        onChange={this.onHandleChange}
                                        type='email'
                                        name='email'
                                        value={this.state.email}
                                    />
                                    <DefaultBtn
                                        name='Send'
                                        onClick={this.onHandleClick}
                                    />
                                </WhiteCard>
                            </BlueCardCenter>
                        </Row>
                    </Container>
                </div>
            </BlueBackground>
        )
    }
}
