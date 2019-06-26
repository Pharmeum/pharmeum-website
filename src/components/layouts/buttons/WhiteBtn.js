import React from 'react';

import './white-btn.css';

export default (props) => (
  <button
    onClick={props.onClick}
    className='white-btn'
  >
    {props.name}
  </button>
);
