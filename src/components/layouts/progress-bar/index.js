import React from 'react';

import './progress-bar.css';

export default (props) => (
  <div className='progress-bar-custom'>
    {
      [1, 2, 3].map((item, index) => {
        let className = 'progress-bar__item';
        if (index === props.which) {
          className = `${className} blue`;
        }
        return <div key={index} className={className}></div>
      })
    }
  </div>
);
