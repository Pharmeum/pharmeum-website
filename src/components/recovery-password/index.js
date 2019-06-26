import BlueBackground from '../layouts/blue-bg';
import BlueCardCenter from '../layouts/blue-card-center';
import WhiteCard from '../layouts/white-card';
import WhiteLogo from '../layouts/white-logo';
import DefaultBtn from "../layouts/buttons/DefaultBtn";

import './recovery-password.css';
import React, {Component} from 'react';
import ReactNotification from "react-notifications-component";
import Container from "react-bootstrap/es/Container";
import Row from "react-bootstrap/es/Row";
import {showErrorAlert} from "../../alerts";
import usersClient from "../../users-client";


const hasNumbers = value => {
    return new RegExp(/[0-9]/).test(value)
};
const hasSpecial = value => {
    return (/[!@#$^&*)(+=._-]/.test(value))
};

const hasMixed = value => {
    return new RegExp(/[a-z]/).test(value) &&
        new RegExp(/[A-Z]/).test(value)
};

export const strengthColor = count => {
    if (count < 1) return '#ffffff';
    if (count < 3) return {label: 'Very Weak', color: 'red'};
    if (count < 4) return {label: 'Weak', color: 'yellow'};
    if (count < 5) return {label: 'Strong', color: 'orange'};
    if (count < 6) return {label: 'Very Strong', color: '#1ed88f'};
};

export const strengthIndicator = value => {
    const matched = []
    if (value.length > 5) matched.push('greater-than-5');
    if (value.length > 7) matched.push('greater-than-7');
    if (hasNumbers(value)) matched.push('has-numbers');
    if (hasMixed(value)) matched.push('has-mixed');
    if (hasSpecial(value)) matched.push('has-special');
    return matched.length
};

function PasswordInput(props) {
    const strength = strengthIndicator(props.value);
    const str = strengthColor(strength);
    return (
        <div className="form-field">
            <input
                type="password"
                value={props.value}
                name={props.name}
                className="password-input"
                placeholder={props.placeholder}
                onChange={props.handleChange}
                style={{
                    borderBottom: `2px solid ${str.color}`
                }}
            />
            <span className="password-strength-label"
                  style={{
                      color: `${str.color}`
                  }}
            >{str.label}</span>
        </div>
    )
}

function PasswordConfirmationInput(props) {
    return (
        <div className="form-field">
            <input
                type="password"
                value={props.value}
                name={props.name}
                className="password-confirmation-input"
                placeholder={props.placeholder}
                onChange={props.handleChange}
            />
        </div>
    )
}

export default class RecoveryPassword extends Component {
    constructor(props) {
        super(props);
        this.notificationDOMRef = React.createRef();
    };

    state = {
        password: "",
        password_confirmation: ""
    };

    onCloseClick = (e) => {
        e.preventDefault();
        this.props.history.push({
            pathname: "/"
        })
    };

    handleChange = (event, attr) => {
        const newState = {...this.state};
        newState[attr] = event.target.value;
        this.setState(newState);
    };

    onClick = (event) => {
        event.preventDefault();
        if (this.state.password !== this.state.password_confirmation) {
            showErrorAlert(
                this.notificationDOMRef,
                "passwords not equals",
                400
            );
            return
        }

        if (this.state.password === "" || this.state.password_confirmation === "") {
            showErrorAlert(
                this.notificationDOMRef,
                "passwords should not be empty",
                400
            );
            return
        }

        const currentURL = window.location.href;
        const token = currentURL.split("token=")[1];
        if (token === undefined) {
            showErrorAlert(
                this.notificationDOMRef,
                "Token does not exist",
                400
            );
            return
        }
        console.log(token);
        usersClient.put("/user/new_password",
            {token: token, password: this.state.password})
            .then(res => {
                return this.props.history.push("/sign-in")
            })
            .catch(error => {
                showErrorAlert(
                    this.notificationDOMRef,
                    error.response.data.error,
                    error.response.status
                );
            })
    };

    render() {
        return (
            <BlueBackground>
                <ReactNotification ref={this.notificationDOMRef}/>
                <div className="recovery-password">
                    <Container>
                        <Row>
                            <BlueCardCenter>
                                <WhiteLogo/>
                                <WhiteCard onClieck={this.onCloseClick}>
                                    <h4 className="recovery-password__header">
                                        You are very close to finish password changing
                                    </h4>
                                    <p className="recovery-password__message">
                                        Please enter your new password
                                    </p>
                                    <PasswordInput
                                        value={this.state.password}
                                        name="password"
                                        placeholder="Your secure password"
                                        handleChange={(e) => this.handleChange(e, 'password')}
                                    />
                                    <div className="passwordConfirmation">
                                        <PasswordConfirmationInput
                                            value={this.state.password_confirmation}
                                            name="password_confirmation"
                                            placeholder="Password confirmation"
                                            handleChange={(e) => this.handleChange(e, 'password_confirmation')}
                                        />
                                    </div>
                                    <div className="confirmationButton">
                                        <DefaultBtn name="Confirmation" type="submit" onClick={this.onClick}/>
                                    </div>
                                </WhiteCard>
                            </BlueCardCenter>
                        </Row>
                    </Container>
                </div>
            </BlueBackground>
        )
    }
}