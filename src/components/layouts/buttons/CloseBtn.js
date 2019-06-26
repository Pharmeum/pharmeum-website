import React from 'react';

import './close-btn.css';

export default (props) => (
  <img className='close-btn' onClick={props.onClick} src='/images/cancel.png' alt='cancel-img' />
)
