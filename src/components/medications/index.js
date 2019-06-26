import React, { Component } from 'react';
import axios from '../../axios';
import {
  showErrorAlert,
  showMedicationSuccessAlert,
  showMedicationPendingAlert,
  showMedicationTransactionPendingAlert,
  showMedicationTransactionSuccessAlert,
  showMedicationLoadingAlert,
} from "../../alerts";
import ReactNotification from "react-notifications-component";

import BlueHeader from '../layouts/blue-header';
import NavBar from '../layouts/navbar';
import TransactionsHeader from '../layouts/transactions-header';
import DefaultBtn from '../layouts/buttons/DefaultBtn';
import MedicationsTable from './MedicationTable';
import CreateMedicationsTransactionPopup from '../popups/medications/CreateMedicationsTransactionPopup';
import CreateMedicationsPopup from '../popups/medications/CreateMedicationsPopup';

import './medications.css';

export default class Medications extends Component {

  constructor(props) {
    super(props);

    this.state = {};
    this.state.openPopup = false;
    this.state.openPopupTransfer = false;
    this.state.medications = [];
    this.notificationDOMRef = React.createRef();

  }

  componentDidMount() {
    showMedicationLoadingAlert(this.notificationDOMRef);
    this.getMedications()
      .then(res => this.updateState(res))
      .catch(error =>
        showErrorAlert(
          this.notificationDOMRef,
         // error.response.data.error,
         // error.response.status
        )
      );
  }

  getMedications() {
    return axios.get('/user/prescriptions');
  }

    updateState(res) {
      if (res) {
        const data = res.data;
        return this.setState(() => {
          return {
            medications: data,
            openPopup: false
          };
        });
      }
      return false;
    }

  createMedications(transaction) {
    showMedicationPendingAlert(this.notificationDOMRef);
    axios.post('/user/issue_prescription', {
      public_key: transaction.public_key,
      assets: [
        {
          name: transaction.name,
          amount: +transaction.amount,
          type: transaction.type,
          payload: {
            type: transaction.payloadType,
            dimension: transaction.payloadDimension
          }
        }
      ]
    })
    .then(() => this.getMedications())
    .then(res => this.updateState(res))
    .then(() => showMedicationSuccessAlert(this.notificationDOMRef))
    .catch(error =>
      showErrorAlert(
        this.notificationDOMRef,
        error.response.data.error,
        error.response.status
      )
    );
  }

transferMedication(transaction) {
  showMedicationTransactionPendingAlert(this.notificationDOMRef)
  axios.post('/user/transfer_prescription', {
      from: transaction.from,
      to: transaction.to,
      name: +transaction.name,
    })
    .then(() => this.getMedications())
    .then(res => this.updateState(res))
    .then(() => showMedicationTransactionSuccessAlert(this.notificationDOMRef))
    .catch(error =>
      showErrorAlert(
        this.notificationDOMRef,
        error.response.data.error,
        error.response.status
      )
    );
}

  onHandleClick = (e, state) => {
    if(state) {
      if (state.name && state.medicationType && state.amount) {
        this.createMedications(state);
      }
    }

    this.setState({
      openPopup: !this.state.openPopup
    });
  }

    onHandleClickTransfer = (e, state) => {
      if (state) {
        if (state.from && state.to && state.name) {
          this.transferMedication(state);
        }
      }

      this.setState({
        openPopupTransfer: !this.state.openPopupTransfer
      });
    }

  onCreateClick = (e, state) => {
    this.setState({
      openPopup: !this.state.openPopup
    });
  }

    onCreateClickTransfer = (e, state) => {
      e.preventDefault();

      if (state) {
        if (state.from && state.to && state.name) {
          this.transferPrescription(state);
        }
      }

      this.setState({
        openPopupTransfer: !this.state.openPopupTransfer
      });
    }

  render() {
    return (
      <div className='medications'>
        <ReactNotification ref={this.notificationDOMRef} />
        <BlueHeader />
        <NavBar />
        <div className="after__navbar">
          <TransactionsHeader>Medications</TransactionsHeader>
          < div >
            <DefaultBtn name='Create medication' onClick={this.onCreateClick}/>
            <CreateMedicationsPopup open={this.state.openPopup} onClick={this.onHandleClick} />

            <DefaultBtn name='Transfer medication' onClick={this.onCreateClickTransfer}/>
            <CreateMedicationsTransactionPopup open={this.state.openPopupTransfer} onClick={this.onHandleClickTransfer} />
          </div>
        </div>
        <MedicationsTable medications={this.state.medications} />
      </div>
    )
  }
}
