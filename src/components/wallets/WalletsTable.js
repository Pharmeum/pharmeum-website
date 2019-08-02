import React, {Component} from 'react';

import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemPanel,
    AccordionItemButton,
} from 'react-accessible-accordion';

import "./wallets.css";
import paymentClient from "../../payment-client";
import {showErrorAlert} from "../../alerts";
import ReactNotification from "react-notifications-component";

// import TrashBtn from '../layouts/buttons/TrashButton';

export default class WalletsTable extends Component {
    constructor(props) {
        super(props);
        this.notificationDOMRef = React.createRef();
    };

    state = {
        balance: "0"
    };

    getBalance = (publicKey) => {
        paymentClient.get("/user/wallet_balance?pk=".concat(publicKey))
            .then(res => {
                this.setState({balance: res.data.balance})
            })
            .catch(error => {
                if (error.message === "Network Error") {
                    showErrorAlert(
                        this.notificationDOMRef,
                        error.message,
                        500
                    );
                    return
                }

                this.setState({balance: "failed to get wallet balance, please try again later"});
                showErrorAlert(
                    this.notificationDOMRef,
                    error.response.data.error,
                    error.response.status
                );
            })
    };

    render() {
        return (
            <Accordion className='wallets__table'>
                <ReactNotification ref={this.notificationDOMRef}/>
                <div>
                    {
                        this.props.wallets
                            ? this.props.wallets.map((wallet, index) => (
                                <AccordionItem onClick={() => this.getBalance(wallet.public_key)}>
                                    <AccordionItemHeading key={index} className={index % 2 === 0 ? 'blue__tr' : ''}>
                                        <AccordionItemButton>
                                            {wallet.public_key}
                                        </AccordionItemButton>
                                    </AccordionItemHeading>
                                    <AccordionItemPanel className='wallets__table__tbody'>
                                        Balance: {this.state.balance}
                                    </AccordionItemPanel>
                                </AccordionItem>
                            ))
                            : <div>Loading...</div>
                    }
                </div>
            </Accordion>
        )
    }
}