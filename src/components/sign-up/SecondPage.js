import React, {Component} from "react";
import {Container, Row} from "react-bootstrap";

import {showErrorAlert} from "../../alerts";
import ReactNotification from "react-notifications-component";

import BlueBackground from "../layouts/blue-bg";
import WhiteCard from "../layouts/white-card";
import BlueCard from "../layouts/blue-card";
import FormHeader from "../layouts/form-header";
import Input from "../layouts/inputs";
import ProgressBar from "../layouts/progress-bar";
import OnBoardLink from "../layouts/buttons/OnBoardLink";
import usersClient from "../../users-client";

import "./sign-up__second.css";

export default class SecondPage extends Component {
    constructor(props) {
        super(props);
        this.notificationDOMRef = React.createRef();
    }

    state = {
        fullName: "",
        phoneNumber: "",
        birthDate: "",
        day: "",
        month: "",
        year: "",
        dateError: ""
    };

    onHandleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    onDateChange = e => {
        const reg =
            e.target.name === "day"
                ? new RegExp(/(^0?[1-9]$)|(^1[0-9]$)|(^2[0-9]$)|(^3[0-1]$)/)
                : e.target.name === "month"
                ? new RegExp(/(^0?[1-9]$)|(^1[0-2]$)/)
                : new RegExp(/^[1-9][0-9]{0,11}$/);

        if (e.target.name === "year") {
            if (
                (!reg.test(e.target.value) ||
                    e.target.value > new Date().getFullYear()) &&
                e.target.value !== ""
            ) {
                e.preventDefault();
                return false;
            }
        } else {
            if (
                e.target.value !== "0" &&
                !reg.test(e.target.value) &&
                e.target.value !== ""
            ) {
                e.preventDefault();
                return false;
            }
        }

        this.setState({[e.target.name]: e.target.value});
    };

    isValidDate = () => {
        const day = Number(this.state.day),
            month = Number(this.state.month),
            year = Number(this.state.year);
        const date = new Date();

        date.setFullYear(year, month - 1, day);

        return date.getFullYear() === year &&
            date.getMonth() + 1 === month &&
            date.getDate() === day;
    };

    onBackClick = e => {
        e.preventDefault();

        this.props.history.push("/sign-up/1");
    };

    onNextClick = e => {
        e.preventDefault();
        const isValidDate = this.isValidDate();
        if (isValidDate) {
            usersClient
                .post("/user/signup", {
                    email: this.props.location.state.email,
                    password: this.props.location.state.password,
                    name: this.state.fullName,
                    phone: this.state.phoneNumber,
                    date_of_birth: `${this.state.day}.${this.state.month}.${
                        this.state.year
                        }`
                })
                .then(res => {
                    if (res) this.props.history.push("/sign-up/finish");
                })
                .catch(error => {
                    showErrorAlert(
                        this.notificationDOMRef,
                        error.response.data.error,
                        error.response.status
                    );
                });
        }
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
                <div className="sign-up__second">
                    <Container>
                        <ReactNotification ref={this.notificationDOMRef}/>
                        <Row>
                            <WhiteCard onClick={this.onCloseClick}>
                                <FormHeader header="sign up"/>
                                <Input
                                    type="text"
                                    placeholder="John Doe"
                                    onChange={this.onHandleChange}
                                    name="fullName"
                                    value={this.state.fullName}
                                    icon="user"
                                />
                                <div className="birthday-input">
                                    <Input
                                        type="text"
                                        value={this.state.day}
                                        onChange={this.onDateChange}
                                        placeholder="DD"
                                        name="day"
                                    />
                                    <Input
                                        type="text"
                                        value={this.state.month}
                                        onChange={this.onDateChange}
                                        placeholder="MM"
                                        name="month"
                                    />
                                    <Input
                                        type="text"
                                        value={this.state.year}
                                        onChange={this.onDateChange}
                                        placeholder="YYYY"
                                        name="year"
                                    />
                                </div>
                                <Input
                                    type="phone"
                                    placeholder="+447911123456"
                                    onChange={this.onHandleChange}
                                    name="phoneNumber"
                                    value={this.state.phoneNumber}
                                    icon="phone"
                                />
                                <div className="date-validation">{this.state.dateError}</div>
                                <OnBoardLink
                                    name="back"
                                    style={{left: 100, bottom: 60}}
                                    onClick={this.onBackClick}
                                />
                                <ProgressBar which={1}/>
                                <OnBoardLink
                                    name="next"
                                    style={{right: 100, bottom: 60}}
                                    onClick={this.onNextClick}
                                />
                            </WhiteCard>
                            <BlueCard>
                                <div className="sign-up__second__labels">
                                    <div className="sign-up__second__labels__item">Full name</div>
                                    <div className="sign-up__second__labels__item">
                                        Birth date
                                    </div>
                                    <div className="sign-up__second__labels__item">
                                        Phone number
                                    </div>
                                </div>
                            </BlueCard>
                        </Row>
                    </Container>
                </div>
            </BlueBackground>
        );
    }
}

