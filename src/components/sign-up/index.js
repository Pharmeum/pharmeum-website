import React, {Component} from 'react';
import {Container, Row} from 'react-bootstrap';

import BlueBackground from '../layouts/blue-bg';
import BlueCard from '../layouts/blue-card';
import WhiteCard from '../layouts/white-card';
import FromHeader from '../layouts/form-header';
import Input from '../layouts/inputs';
import OnBoardLink from '../layouts/buttons/OnBoardLink';
import ProgressBar from '../layouts/progress-bar';

import './sign-up__first.css';

export default class FirstPage extends Component {
    state = {
        email: '',
        password: '',
        verifyPassword: '',
        error: ''
    };

    onHandleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    onHandleClick = (e) => {
        e.preventDefault();

        if (this.state.password === this.state.verifyPassword) {
            this.props.history.push({
                pathname: '/sign-up/2',
                state: {email: this.state.email, password: this.state.password},
            });
        } else {
            this.setState({error: 'Incorrect verification of password'});
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
                <div className="sign-up__first">
                    <Container>
                        <Row>
                            <BlueCard>
                                <div className="sign-up__first__labels">
                                    <div className="sign-up__first__labels__item">
                                        Email
                                    </div>
                                    <div className="sign-up__first__labels__item">
                                        Password
                                    </div>
                                    <div className="sign-up__first__labels__item">
                                        Confirm password
                                    </div>
                                </div>
                            </BlueCard>
                            <WhiteCard onClick={this.onCloseClick}>
                                <FromHeader header='sign up'/>
                                <Input
                                    type='email'
                                    placeholder='Example@gmail.com'
                                    onChange={this.onHandleChange}
                                    name='email'
                                    value={this.state.email}
                                    icon='envelope'
                                />
                                <Input
                                    type='password'
                                    placeholder='***********'
                                    onChange={this.onHandleChange}
                                    name='password'
                                    value={this.state.password}
                                    icon='lock'
                                />
                                <Input
                                    type='password'
                                    placeholder='***********'
                                    onChange={this.onHandleChange}
                                    name='verifyPassword'
                                    value={this.state.verifyPassword}
                                    icon='check'
                                />
                                <div className="validation__error">{this.state.error}</div>
                                <div className="sign-up__first__navigation">
                                    <ProgressBar which={0}/>
                                    <OnBoardLink
                                        name='next'
                                        onClick={this.onHandleClick}
                                    />
                                </div>
                            </WhiteCard>
                        </Row>
                    </Container>
                </div>
            </BlueBackground>
        )
    }
}
