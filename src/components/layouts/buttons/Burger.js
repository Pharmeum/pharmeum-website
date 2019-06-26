import React, { Component } from 'react';

import './burger.css';

export default class Burger extends Component {
  render() {
    const className = `burger-menu ${this.props.isMenuOn ? 'menu-on' : ''}`

    return (
      <div className={className} onClick={this.props.onClick}>
        <div className='burger'></div>
      </div>
    )
  }
}
