import React, {Component} from 'react';
import {Table} from 'react-bootstrap';

// import TrashBtn from '../layouts/buttons/TrashButton';

export default class WalletsTable extends Component {
    render() {
        return (
            <Table className='wallets__table' responsive>
                <thead>
                <tr className='wallets__table__tr'>
                    <th>Address</th>
                    <th>Token</th>
                    <th>Amount</th>
                    {/* <th>Actions</th> */}
                </tr>
                </thead>
                <tbody className='wallets__table__tbody'>
                {
                    this.props.wallets
                        ? this.props.wallets.map((wallet, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'blue__tr' : ''}>
                                <td>{wallet.public_key}</td>
                                <td>{wallet.assets[0].name}</td>
                                <td>{wallet.assets[0].amount}</td>
                                {/* <td><TrashBtn /></td> */}
                            </tr>
                        ))
                        : <div>Loading...</div>
                }
                </tbody>
            </Table>
        )
    }
}
