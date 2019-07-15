import React, {Component} from "react";
import paymentClient from "../../payment-client";

import {
    showErrorAlert,
    showTransactionPendingAlert,
    showTransactionSuccessAlert,
    showWalletPendingAlert,
    showWalletSuccessAlert,
    showWalletsLoadingAlert
} from "../../alerts";
import ReactNotification from "react-notifications-component";

import BlueHeader from "../layouts/blue-header";
import NavBar from "../layouts/navbar";
import TransactionsHeader from "../layouts/transactions-header";
import DefaultBtn from "../layouts/buttons/DefaultBtn";
import WalletsTable from "./WalletsTable";
import TransactionPopup from "../popups/wallet/TransactionPopup";

import "./wallets.css";

export default class Wallets extends Component {
    constructor(props) {
        super(props);

        this.state = {};
        this.state.openPopup = false;
        this.state.wallets = [];
        this.notificationDOMRef = React.createRef();
    }

    componentDidMount() {
        showWalletsLoadingAlert(this.notificationDOMRef);
        this.getWallet()
            .then(res => this.updateState(res))
            .catch(error => {
                if (error.response.status === 401) {
                    this.props.history.push('/login');
                    return
                }

                showErrorAlert(
                    this.notificationDOMRef,
                    error.response.data.error,
                    error.response.status
                )
            });
    }

    getWallet() {
        return paymentClient.get("/user/wallets");
    }

    updateState(res) {
        if (res) {
            const data = res.data;
            return this.setState(() => {
                return {
                    wallets: data,
                    openPopup: false
                };
            });
        }
        return false;
    }

    onHandleClick = (e, state) => {
        this.setState({
            openPopup: !this.state.openPopup
        });
    };

    onCreateClick = e => {
        e.preventDefault();
        showWalletPendingAlert(this.notificationDOMRef);
        paymentClient
            .post("/user/create_wallet")
            .then(() => this.getWallet())
            .then(res => this.updateState(res))
            .then(() => showWalletSuccessAlert(this.notificationDOMRef))
            .catch(error =>
                showErrorAlert(
                    this.notificationDOMRef,
                    error.response.data.error,
                    error.response.status
                )
            );
    };

    render() {
        return (
            <div className="wallets">
                <ReactNotification ref={this.notificationDOMRef}/>
                <BlueHeader/>
                <NavBar/>
                <div className="after__navbar">
                    <TransactionsHeader>Wallets</TransactionsHeader>
                    <div className="transactions-header">
                        <DefaultBtn name="Create Wallet" onClick={this.onCreateClick}/>
                        <DefaultBtn
                            name="Create Transaction"
                            onClick={this.onHandleClick}
                        />
                        <TransactionPopup
                            open={this.state.openPopup}
                            onClick={this.onHandleClick}
                        />
                    </div>
                </div>
                <WalletsTable wallets={this.state.wallets}/>
            </div>
        );
    }
}
