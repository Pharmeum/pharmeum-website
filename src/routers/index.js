import React from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';

import SignIn from '../components/sign-in';
import ForgotPassword from '../components/forgot-password';
import InfoForgotPassword from '../components/forgot-password/InfoForgotPassword';
import SignUpFirst from '../components/sign-up';
import SignUpSecond from '../components/sign-up/SecondPage';
import SignUpFinish from '../components/sign-up/FinishPage';
import Wallets from '../components/wallets';
import Medications from '../components/medications';
import NotFoundPage from '../components/NotFoundPage';
import RecoveryPassword from '../components/recovery-password';
import "react-notifications-component/dist/theme.css";

export default () => (
    <BrowserRouter>
        <Switch>
            <Route path='/sign-in' name='sign-in' component={SignIn}/>
            <Route path='/forgot-password' name='forgot-password' component={ForgotPassword} exact/>
            <Route path='/forgot-password/info' name='forgot-password-info' component={InfoForgotPassword}/>
            <Route path='/recovery-password' name='recovery-password' component={RecoveryPassword}/>
            <Route path='/sign-up/1' name='sign-up1' component={SignUpFirst}/>
            <Route path='/sign-up/2' name='sign-up2' component={SignUpSecond}/>
            <Route path='/sign-up/finish' name='sign-up3' component={SignUpFinish}/>
            <Route path='/wallets' name='wallets' component={Wallets}/>
            <Route path='/medications' name='medications' component={Medications}/>
            <Redirect from="/" to="/sign-in"/>
            <Route component={NotFoundPage}/>
        </Switch>
    </BrowserRouter>
)