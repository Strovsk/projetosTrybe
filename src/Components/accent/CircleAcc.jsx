import React from 'react';
// import PropTypes from 'prop-types'; TODO change svg via props
import '../../styles/accent/CircleAcc.css';

export default function CircleAcc() {
  return (
    <div className="CircleAcc">
      <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 118.5 118.5">
        <g id="circle_type_2">
          <path
            id="circle4"
            className="cls-1"
            d="M92.25,59.25c0,32.58-.42,59-33,59a59,59,0,1,1,59-59"
          />
          <path
            id="circle3"
            className="cls-1"
            d="M102.25,59.25c0,28-15.22,50.5-43.25,50.5A50.75,50.75,0,1,1,109.75,59"
          />
          <path
            id="circle2"
            className="cls-1"
            d="M117.75,59c0,23.61-35.14,42.75-58.75,42.75A42.75,42.75,0,1,1,101.75,59"
          />
          <path
            id="circle1"
            className="cls-1"
            d="M110.25,59.25c0,18.23-32.77,33-51,33a33,33,0,1,1,33-33"
          />
        </g>
      </svg>
    </div>
  );
}
