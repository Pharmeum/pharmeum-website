import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './trash-btn.css';


export default (props) => (
  <button className='trash-btn'>
    <FontAwesomeIcon
      icon='trash-alt'
      size='sm'
      className='trash-icon'
      onClick={props.onClick}
    />
  </button>
);
