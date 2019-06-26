import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

export default class PaymentTable extends Component {
  render() {
    return (
      <Table className='wallets__table' responsive>
        <thead>
          <tr className='wallets__table__tr'>
            <th>Transaction id</th>
            <th>Date</th>
            <th>Amount</th>
            <th>From</th>
            <th>To</th>
          </tr>
        </thead>
        <tbody className='wallets__table__tbody'>
          {
            this.props.payments
              ? this.props.payments.map((payment, index) => (
                <tr key={index} className={index % 2 === 0 ? 'blue__tr' : ''}>
                  <td>{payment.id}</td>
                  <td>{payment.date}</td>
                  <td>{payment.amount}</td>
                  <td>{payment.from}</td>
                  <td>{payment.to}</td>
                </tr>
              ))
              : <div>Loading...</div>
          }
        </tbody>
      </Table>
    )
  }
}
