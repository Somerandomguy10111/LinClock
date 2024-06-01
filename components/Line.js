import React from 'react';
import './Line.css';
import triangleImage from 'img/triangle.png';  // Make sure the path is correct


const Line = () => (
  <div className="lineContainer">
    <img src={triangleImage} className="triangle" alt="Triangle pointer" />
    <div className="verticalBar"></div>
    <div className="line"></div>
    <div className="verticalBar"></div>
  </div>
);

export default Line;
