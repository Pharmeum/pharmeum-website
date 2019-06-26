import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './input.css';

export default class Input extends Component {
  render() {
    const className = `input-control ${this.props.value !== '' ? 'input-blue' : ''}`;

    return (
      <div className={className}>
        {
          this.props.icon &&
          <FontAwesomeIcon
            icon={this.props.icon}
            size='lg'
            className='input-icon'
          />
        }
        <input
          type={this.props.type}
          placeholder={this.props.placeholder}
          onChange={this.props.onChange}
          name={this.props.name}
          value={this.props.value}
          pattern={this.props.pattern}
          className='input'
        />
      </div>
    )
  }
}
