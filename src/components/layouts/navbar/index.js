import React, { Component } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';

import Subbar from '../subbar';

import './custom-navbar.css';

export default class Navbar extends Component {
  state = {
    toggleSubbar: false,
  }

  onHandleNavbarClick = (e) => {
    e.preventDefault();

    this.setState({ toggleSubbar: !this.state.toggleSubbar });
  }

  render() {
    // const className = `custom-navbar__menu__item ${this.state.toggleSubbar && 'is-active-subbar'}`;

    return (
      <div className='custom-navbar'>
        <ul className='custom-navbar__menu'>
          <li className='custom-navbar__menu__item'>
            <NavLink activeClassName='is-active' to='/wallets'>
              wallets
            </NavLink>
          </li>
          <li className='custom-navbar__menu__item'>
            <NavLink activeClassName='is-active' to='/medications'>
              Medications
            </NavLink>
          </li>
          {/* <li className={className} onClick={this.onHandleNavbarClick}>
            transactions
              <FontAwesomeIcon
              icon='sort-down'
              size='lg'
              className='down-arrow'
            />
          </li> */}
        </ul>
        {
          this.state.toggleSubbar &&
          <Subbar />
        }
      </div>
    )
  }
}
