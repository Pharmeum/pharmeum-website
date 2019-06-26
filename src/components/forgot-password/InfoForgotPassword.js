import React, {Component} from 'react';
import {Container, Row} from 'react-bootstrap';
import usersClient from "../../users-client";

import BlueBackground from '../layouts/blue-bg';
import BlueCardCenter from '../layouts/blue-card-center';
import WhiteCard from '../layouts/white-card';
import WhiteLogo from '../layouts/white-logo';
import FormHeader from '../layouts/form-header';
import DefaultBtn from '../layouts/buttons/DefaultBtn';

import './forgot-password-verify.css';
import ReactNotification from "react-notifications-component"

export default class InfoForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.notificationDOMRef = React.createRef();
    };

    componentDidMount() {
        if (this.props.location) {
            this.setState({email: this.props.location.state.email});
        }
    }

    onResendClick = (e) => {
        e.preventDefault();

        if (this.state.email !== '') {
            usersClient.post('/user/reset_password', {
                email: this.state.email,
            }).catch(e => console.log(e));
        } else {
            this.props.history.push('/forgot-password');
        }
    };

    onHandleClick = (e) => {
        e.preventDefault();
        this.props.history.push('/sign-in');
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
                <div className='forgot-password__verify'>
                    <Container>
                        <ReactNotification ref={this.notificationDOMRef}/>
                        <Row>
                            <BlueCardCenter>
                                <WhiteLogo/>
                                <WhiteCard onClick={this.onCloseClick}>
                                    <FormHeader header='verification'/>
                                    <h4 className='forgot-password__verify__header'>We have emailed you with the helpful
                                        link which will help you to recover your password</h4>
                                    <div className="resend__message">
                                        If you didn’t receive email!
                                        <div className="resend__link" onClick={this.onResendClick}>Resend</div>
                                    </div>
                                    <DefaultBtn
                                        name='Go to login page'
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
