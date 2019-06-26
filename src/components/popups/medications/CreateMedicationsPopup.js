import React, {Component} from 'react';

import Input from '../../layouts/inputs';
import DefaultBtn from '../../layouts/buttons/DefaultBtn'
import WhiteBtn from '../../layouts/buttons/WhiteBtn'

import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';

import './medications-popup.css';

export default class CreateMedicationsPopup extends Component {
    state = {
        amount: '',
        name: '',
        public_key: '',
        recommendations: '',
    };

    onHandleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    onConfirmClick = (e) => {
        this.props.onClick(e, this.state);
        this.setState({
            amount: '',
            name: '',
            public_key: '',
            recommendations: ''
        })
    };

    onCancelClick = (e) => {
        this.setState({
                amount: '',
                name: '',
                public_key: '',
                recommendations: ''
            },
            () => this.props.onClick(e, this.state));
    };

    render() {
        const className = `popup-bg ${this.props.open ? 'show' : ''}`;

        return (
            <div className={className}>
                <div className='medications-popup'>
                    <h2 className="popup-header">
                        <div className='popup-header__message'>Create medications</div>
                        <img
                            src='/images/card-img@2x.png'
                            alt='card-png'
                            className='blue-card-logo'
                        />
                    </h2>
                    <Input
                        placeholder='Public key'
                        onChange={this.onHandleChange}
                        type='text'
                        name='public_key'
                        value={this.state.public_key}
                    />
                    <Select
                        placeholder={'Medication name'}
                        options={[
                            {label: "Amoxicillin", value: 1},
                            {label: "Metformin", value: 2},
                            {label: "Fexofenadine", value: 3},
                        ]}/>
                    <Input
                        placeholder='Amount'
                        onChange={this.onHandleChange}
                        type='number'
                        name='amount'
                        value={this.state.amount}
                    />
                    <Input
                        placeholder='Recommendations'
                        onChange={this.onHandleChange}
                        type='text'
                        name='recommendations'
                        value={this.state.recommendations}
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
