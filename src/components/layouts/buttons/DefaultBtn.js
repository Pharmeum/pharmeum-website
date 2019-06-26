import React from 'react';

import './default-btn.css';

export default (props) => (
  <button
    className="default-btn"
    onClick={props.onClick}
  >
    {props.name}
  </button>
);
