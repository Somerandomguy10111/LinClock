import React, { useState, useEffect } from 'react';
import './Line.css';
import triangleImage from 'src/img/triangle.png';  // Make sure the path is correct


const Line = () => {
  const calculatePositionFromDate = (date) => {
    const secondsSinceMidnight = date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();
    const secondsInADay = 86400;
    return `${(secondsSinceMidnight / secondsInADay) * 100}%`;
  };

  const [leftPosition, setLeftPosition] = useState(calculatePositionFromDate(new Date()));

  useEffect(() => {
    const updatePosition = () => {
      setLeftPosition(calculatePositionFromDate(new Date()));
    };

    const timerId = setInterval(updatePosition, 1000);

    return () => clearInterval(timerId);
  }, []);


    const segments = [
    { title: 'Work', start: '08:00', end: '13:00' },
    { title: 'Break', start: '13:00', end: '14:00' },
    { title: 'Work', start: '14:00', end: '19:00' },
  ];

 const calculatePosition = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes;
    return (totalMinutes / (24 * 60)) * 100;
  };

  const contents = (
    <div className="lineContainer">
      <div className="verticalBar"></div>
      <div className="line">
        {segments.map((segment, index) => (
          <React.Fragment key={index}>
            <div
              className="segmentSeparator"
              style={{ left: `${calculatePosition(segment.start)}%` }}
            >
              <div className="timeLabel">{segment.start}</div>
            </div>
            <div
              className="segmentSeparator"
              style={{ left: `${calculatePosition(segment.end)}%` }}
            >
              <div className="timeLabel">{segment.end}</div>
            </div>
          </React.Fragment>
        ))}
      </div>
      <div className="verticalBar"></div>
      <img src={triangleImage} className="triangle" style={{ left: leftPosition }} alt="Triangle pointer" />
    </div>
  );

  return contents;
};

export default Line;
