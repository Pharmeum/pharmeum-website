import React from 'react';

import './on-board-link.css';

export default (props) => (
  <button 
    className='on-board__link'
    onClick={props.onClick}
    style={props.style}
  >
    {props.name}
  </button>
)
