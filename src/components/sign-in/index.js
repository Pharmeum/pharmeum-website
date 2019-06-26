import React, {Component} from "react";
import {Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import Cookies from "js-cookie";
import {showErrorAlert} from "../../alerts";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import usersClient from "../../users-client";
import FormHeader from "../layouts/form-header";
import BlueBackground from "../layouts/blue-bg";
import LeftWhiteCard from "../layouts/white-card";
import Input from "../layouts/inputs";
import DefaultBtn from "../layouts/buttons/DefaultBtn";
import WhiteBtn from "../layouts/buttons/WhiteBtn";
import BlueCard from "../layouts/blue-card";

import "./sign-in.css";

export default class SignIn extends Component {
    constructor(props) {
        super(props);
        this.notificationDOMRef = React.createRef();
    }

    state = {
        email: "",
        password: ""
    };

    onLoginClick = e => {
        e.preventDefault();
        usersClient
            .post('/user/login', {
                email: this.state.email,
                password: this.state.password
            }, {rejectUnauthorized: false})
            .then(res => {
                if (res) {
                    console.log(res);
                    if (res.data) {
                        if (res.data.token) {
                            Cookies.set("Authorization", `Bearer ${res.data.token}`);
                            return this.props.history.push("/wallets");
                        }
                    }
                }
            })
            .catch(error => {
                showErrorAlert(
                    this.notificationDOMRef,
                    error.response.data.error,
                    error.response.status
                );
            });
    };

    onCreateClick = e => {
        e.preventDefault();
        this.props.history.push("/sign-up/1");
    };

    onHandleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    render() {
        return (
            <BlueBackground>
                <div className="sign-in">
                    <Container>
                        <ReactNotification ref={this.notificationDOMRef}/>
                        <Row>
                            <LeftWhiteCard>
                                <FormHeader header="sign in"/>
                                <Input
                                    icon="envelope"
                                    placeholder="Example@gmail.com"
                                    onChange={this.onHandleChange}
                                    type="email"
                                    name="email"
                                    value={this.state.email}
                                />
                                <Input
                                    icon="lock"
                                    placeholder="Password"
                                    onChange={this.onHandleChange}
                                    type="password"
                                    name="password"
                                    value={this.state.password}
                                />
                                <div className="sign-in__suggestions">
                                    <div className="remember-me">
                                        <input type="checkbox" className="remember-me__check"/>
                                        Remember me
                                    </div>
                                    <Link to="/forgot-password" className="forgot-password__link">
                                        Forgot password?
                                    </Link>
                                </div>
                                <div className="sign-in__buttons">
                                    <DefaultBtn name="Login" onClick={this.onLoginClick}/>
                                    <WhiteBtn
                                        name="Create Account"
                                        onClick={this.onCreateClick}
                                    />
                                </div>
                            </LeftWhiteCard>
                            <BlueCard/>
                        </Row>
                    </Container>
                </div>
            </BlueBackground>
        );
    }
}

