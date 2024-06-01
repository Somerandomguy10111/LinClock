import React, { useState, useEffect } from 'react';
import './Line.css';
import triangleImage from 'src/img/triangle.png';  // Make sure the path is correct


const Line = () => {
  const [leftPosition, setLeftPosition] = useState('0%');

  useEffect(() => {
    const updatePosition = () => {
      const now = new Date();
      // For fraction of the day:
      const secondsSinceMidnight = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
      const secondsInADay = 86400; // 24 * 60 * 60
      const fraction = (secondsSinceMidnight / secondsInADay) * 100;

      // For fraction of the minute:
      // const secondsInMinute = now.getSeconds();
      // const fractionOfMinute = (secondsInMinute / 60) * 100;

      setLeftPosition(`${fraction}%`);
    };

    const timerId = setInterval(updatePosition, 1000); // Update every second

    return () => clearInterval(timerId); // Cleanup on component unmount
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
