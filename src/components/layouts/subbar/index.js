import React from 'react';
import { NavLink } from 'react-router-dom';

import './custom-subbar.css';

export default () => (
  <ul className='custom-subbar__menu'>
    <li className='custom-subbar__menu__item'>
      <NavLink to='/transactions/payment'>payment transactions</NavLink>
    </li>
    <li className='custom-subbar__menu__item'>
      <NavLink to='/transactions/erc20-tokens'>erc20 tokens</NavLink>
    </li>
    <li className='custom-subbar__menu__item'>
      <NavLink to='/transactions/open-auction'>open auction transactions</NavLink>
    </li>
    <li className='custom-subbar__menu__item'>
      <NavLink to='/transactions/platform-initialization'>platform initialization transactions</NavLink>
    </li>
  </ul>
);
