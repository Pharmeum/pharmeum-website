import React from 'react';

import WhiteLogo from '../white-logo';

import './blue-card.css';

export default (props) => (
  <div className='blue-card'>
    <WhiteLogo width='171' />
    {props.children}
  </div>
);
