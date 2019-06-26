import React, { Component } from "react";
import axios from "../../axios";

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
      .catch(error =>
        showErrorAlert(
          this.notificationDOMRef,
          error.response.data.error,
          error.response.status
        )
      );
  }

  getWallet() {
    return axios.get("/user/wallets");
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

  createTransaction(transaction) {
    showTransactionPendingAlert(this.notificationDOMRef);
    axios
      .post("/user/payment", {
        sender_address: transaction.from,
        receiver: transaction.to,
        amount: +transaction.amount
      })
      .then(() => this.getWallet())
      .then(res => this.updateState(res))
      .then(() => showTransactionSuccessAlert(this.notificationDOMRef))
      .catch(error =>
        showErrorAlert(
          this.notificationDOMRef,
          error.response.data.error,
          error.response.status
        )
      );
  }

  onHandleClick = (e, state) => {
    if (state) {
      if (state.from && state.to && state.amount) {
        this.createTransaction(state);
      }
    }

    this.setState({
      openPopup: !this.state.openPopup
    });
  };

  onCreateClick = e => {
    e.preventDefault();
    showWalletPendingAlert(this.notificationDOMRef);
    axios
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
        <ReactNotification ref={this.notificationDOMRef} />
        <BlueHeader />
        <NavBar />
        <div className="after__navbar">
          <TransactionsHeader>Wallets</TransactionsHeader>
          <div className="transactions-header">
            <DefaultBtn name="Create Wallet" onClick={this.onCreateClick} />
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
        <WalletsTable wallets={this.state.wallets} />
      </div>
    );
  }
}
