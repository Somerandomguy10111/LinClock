import React, { useState, useEffect } from 'react';
import './Line.css';
import triangleImage from 'src/img/triangle.png';  // Make sure the path is correct


const SegmentSeparator = ({ time, position }) => {
  return (
    <div className="segmentSeparator" style={{ left: `${position}%` }}>
      <div className="timeLabel">{time}</div>
    </div>
  );
};


const Timeline = ({ segments, calculatePosition }) => {
    const contents = (
    <div className="line">
        {segments.map((segment, index) => (
            <React.Fragment key={index}>
                <SegmentSeparator time={segment.start} position={calculatePosition(segment.start)} />
                <SegmentSeparator time={segment.end} position={calculatePosition(segment.end)} />
            </React.Fragment>
        ))}
    </div>
  );

  return contents
};


const Line = ({ segments }) => {
    const pos = calculatePositionFromDate(new Date())
    const [leftPosition, setLeftPosition] = useState(pos);

    function calculatePositionFromDate(date) {
        const secondsSinceMidnight = date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();
        const secondsInADay = 86400;
        // const secondsSinceMidnight = date.getSeconds();
        // const secondsInADay = 60;
        return `${(secondsSinceMidnight / secondsInADay) * 100}%`;
    };


    function registerUpdate() {
        function updatePosition() {
          setLeftPosition(calculatePositionFromDate(new Date()));
    };

    const timerId = setInterval(updatePosition, 1000)
        return () => clearInterval(timerId)
    };

    const calculatePosition = (time) => {
        const [hours, minutes] = time.split(':').map(Number);
        const totalMinutes = hours * 60 + minutes;
        return (totalMinutes / (24 * 60)) * 100;
    };


    useEffect(registerUpdate);

    const contents = (
        <div className="lineContainer">
            <div className="verticalBar"></div>
            <Timeline segments={segments} calculatePosition={calculatePosition} />
            <div className="verticalBar"></div>
            <img src={triangleImage} className="triangle" style={{left: leftPosition}} alt="Triangle pointer"/>
        </div>
    );


    return contents;
};

export default Line;
