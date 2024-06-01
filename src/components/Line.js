import React, { useState, useEffect } from 'react';
import './Line.css';
import triangleImage from 'src/img/triangle.png';  // Make sure the path is correct


const Line = () => {
  const [leftPosition, setLeftPosition] = useState('0%');

  useEffect(() => {
    const updatePosition = () => {
      const now = new Date();
      // For fraction of the day:
      // const secondsSinceMidnight = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
      // const secondsInADay = 86400; // 24 * 60 * 60
      // const fractionOfDay = (secondsSinceMidnight / secondsInADay) * 100;

      // For fraction of the minute:
      const secondsInMinute = now.getSeconds();
      const fractionOfMinute = (secondsInMinute / 60) * 100;

      setLeftPosition(`${fractionOfMinute}%`);
    };

    const timerId = setInterval(updatePosition, 1000); // Update every second

    return () => clearInterval(timerId); // Cleanup on component unmount
  }, []);

  return (
    <div className="lineContainer">
      <div className="verticalBar"></div>
      <div className="line"></div>
      <div className="verticalBar"></div>
      <img src={triangleImage} className="triangle" style={{ left: leftPosition }} alt="Triangle pointer" />
    </div>
  );
};

export default Line;
