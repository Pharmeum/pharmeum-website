import React, {Component} from 'react';
import {Table} from 'react-bootstrap';

// import TrashBtn from '../layouts/buttons/TrashButton';

export default class MedicationsTable extends Component {
    recommendations;

    render() {
        return (
            <Table className='medications__table' responsive>
                <thead>
                <tr className='medications__table__tr'>
                    <th>Name</th>
                    <th>Amount</th>
                    <th>Recommendations</th>
                    {/* <th>Actions</th> */}
                </tr>
                </thead>
                <tbody className='medications__table__tbody'>
                {
                    this.props.medications
                        ? this.props.medications.map((medications, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'blue__tr' : ''}>
                                <td>{medications.name}</td>
                                <td>{medications.amount}</td>
                                <td>{medications.recommendations}</td>
                            </tr>
                        ))
                        : <div> No medications...</div>
                }
                </tbody>
            </Table>
        )
    }
}
