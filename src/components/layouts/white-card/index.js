import React from 'react';

import CloseBtn from '../buttons/CloseBtn';

import './white-card.css';

export default (props) => (
  <div className='white-card'>
    <CloseBtn onClick={props.onClick} />
    {props.children}
  </div>
)
