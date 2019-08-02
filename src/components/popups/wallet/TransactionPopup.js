import React, {Component} from 'react';

import Input from '../../layouts/inputs';
import DefaultBtn from '../../layouts/buttons/DefaultBtn'
import WhiteBtn from '../../layouts/buttons/WhiteBtn'

import './paymeny-popup.css';
import {showErrorAlert, showTransactionSuccessAlert} from "../../../alerts";
import ReactNotification from "react-notifications-component";
import paymentClient from "../../../payment-client";

export default class TransactionPopup extends Component {
    constructor(props) {
        super(props);
        this.notificationDOMRef = React.createRef();
    };

    state = {
        from: '',
        to: '',
        amount: '',
    };

    onHandleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    onConfirmClick = (e) => {
        this.props.onClick(e, this.state);
        if (this.state.from === "") {
            showErrorAlert(
                this.notificationDOMRef,
                "from should not be empty",
                400
            );
            return
        }
        if (this.state.to === "") {
            showErrorAlert(
                this.notificationDOMRef,
                "to should not be empty",
                400
            );
            return
        }
        if (this.state.amount === "") {
            showErrorAlert(
                this.notificationDOMRef,
                "amount should not be empty",
                400
            );
            return
        }

        const amount = this.state.amount.toString();
        paymentClient.post("/user/payment", {
            receiver: this.state.to,
            sender: this.state.from,
            amount: amount
        }).then(res => {
            showTransactionSuccessAlert(this.notificationDOMRef)
        }).catch(error => {
            if (error.message === "Network Error") {
                showErrorAlert(
                    this.notificationDOMRef,
                    error.message,
                    500
                );
                return
            }

            showErrorAlert(
                this.notificationDOMRef,
                error.response.data.error,
                error.response.status
            )
        })
    };

    onCancelClick = (e) => {
        this.setState({
                from: '',
                to: '',
                // privateKey: '',
                amount: '',
            },
            () => this.props.onClick(e, this.state));
    };

    render() {
        const className = `popup-bg ${this.props.open ? 'show' : ''}`;

        return (
            <div className={className}>
                <ReactNotification ref={this.notificationDOMRef}/>
                <div className='paymeny-popup'>
                    <h2 className="popup-header">
                        <div className='popup-header__message'>Create Payment transaction</div>
                        <img
                            src='/images/card-img@2x.png'
                            alt='card-png'
                            className='blue-card-logo'
                        />
                    </h2>
                    <Input
                        placeholder='From'
                        onChange={this.onHandleChange}
                        type='text'
                        name='from'
                        value={this.state.from}
                    />
                    <Input
                        placeholder='To'
                        onChange={this.onHandleChange}
                        type='text'
                        name='to'
                        value={this.state.to}
                    />
                    <Input
                        placeholder='Amount'
                        onChange={this.onHandleChange}
                        type='number'
                        name='amount'
                        value={this.state.amount}
                    />
                    <div className="popup-btns">
                        <WhiteBtn name='Cancel' onClick={this.onCancelClick}/>
                        <DefaultBtn name='Confirm' onClick={this.onConfirmClick}/>
                    </div>
                </div>
            </div>
        )
    }
}
