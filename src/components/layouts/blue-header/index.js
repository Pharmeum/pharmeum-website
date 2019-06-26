import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import WhiteLogo from '../white-logo';
import Burger from '../buttons/Burger';

import './blue-header.css';

export default class BlueHeader extends Component {
  state = {
    isMenuOn: false,
  }

  toggleMenu = () => {
    this.setState({ isMenuOn: !this.state.isMenuOn });
  }

  render() {
    const className = `hidden-menu ${this.state.isMenuOn ? 'show-menu' : ''}`

    return (
      <div className='blue-header'>
        <WhiteLogo />
        <Burger onClick={this.toggleMenu} isMenuOn={this.state.isMenuOn} />
        <div className={className}>
          <ul className='hidden-menu__list'>
            <li className='hidden-menu__item'>
              <NavLink to='/wallets'>Wallets</NavLink>
            </li>
            <li className='hidden-menu__item'>
              <NavLink to='/transactions/payment'>Payment transactions</NavLink>
            </li>
            <li className='hidden-menu__item'>
              <NavLink to='/transactions/erc20-tokens'>ERC20 Tokens</NavLink>
            </li>
            <li className='hidden-menu__item'>
              <NavLink to='/transactions/open-auction'>Open Auction transactions</NavLink>
            </li>
            <li className='hidden-menu__item'>
              <NavLink to='/transactions/platform-initialization'>Platform initialization transactions</NavLink>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
