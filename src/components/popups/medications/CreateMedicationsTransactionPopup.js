import React, { Component } from 'react';

import Input from '../../layouts/inputs';
import DefaultBtn from '../../layouts/buttons/DefaultBtn'
import WhiteBtn from '../../layouts/buttons/WhiteBtn'

import './medications-popup.css';

export default class CreateMedicationsTransactionPopup extends Component {
  state = {
    from: '',
    to: '',
    // privateKey: '',
    name: '',
  }

  onHandleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onConfirmClick = (e) => {
    this.props.onClick(e, this.state);
    this.setState({
          from: '',
          to: '',
          // privateKey: '',
          name: '',
        })
  }

  onCancelClick = (e) => {
    this.setState({
      from: '',
      to: '',
      // privateKey: '',
      name: '',
    },
    () => this.props.onClick(e, this.state));
  }

  render() {
    const className = `popup-bg ${this.props.open ? 'show' : ''}`;

    return (
      <div className={className}>
        <div className='medications-popup'>
          <h2 className="popup-header">
            <div className='popup-header__message'>Create medications transaction</div>
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
          {/* <Input
            placeholder='Private key'
            onChange={this.onHandleChange}
            type='text'
            name='privateKey'
            value={this.state.privateKey}
          /> */}
          <Input
            placeholder='Name'
            onChange={this.onHandleChange}
            type='text'
            name='name'
            value={this.state.name}
          />
          <div className="popup-btns">
            <WhiteBtn name='Cancel' onClick={this.onCancelClick} />
            <DefaultBtn name='Confirm' onClick={this.onConfirmClick} />
          </div>
        </div>
      </div>
    )
  }
}
