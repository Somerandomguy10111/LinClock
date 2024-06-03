import React, { useState, useEffect, useRef } from 'react';
import './Line.css';
import triangleImage from 'src/img/triangle.png';  // Make sure the path is correct


const SegmentSeparator = ({ time, position }) => {
  return (
    <div className="segmentSeparator" style={{ left: `${position}%` }}>
      <div className="timeLabel">{time}</div>
    </div>
  );
};


const Timeline = ({ segments }) => {
    function calculatePosition(time) {
        const [hours, minutes] = time.split(':').map(Number);
        const totalMinutes = hours * 60 + minutes;
        return (totalMinutes / (24 * 60)) * 100;
    };

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

const TriangleCanvas = ({ imageSrc, rgbColor, triangleCoords, className, style }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = new Image();

        img.onload = function() {
            // Draw the image on the canvas
            ctx.drawImage(img, 0, 0);

            // Fill the triangle with the specified color
            ctx.fillStyle = rgbColor;
            ctx.beginPath();
            ctx.moveTo(triangleCoords[0].x, triangleCoords[0].y);
            ctx.lineTo(triangleCoords[1].x, triangleCoords[1].y);
            ctx.lineTo(triangleCoords[2].x, triangleCoords[2].y);
            ctx.closePath();
            ctx.fill();
        };

        img.src = imageSrc;
    }, [imageSrc, rgbColor, triangleCoords]);

    return <canvas ref={canvasRef} width="200" height="200" className={className} style={style}></canvas>;
};


const Line = ({ segments }) => {


    const pos = calculatePointerPos(new Date())
    const [leftPosition, setLeftPosition] = useState(pos);
    const [color, setColor] = useState(getCurrentSegment().color)

    function calculatePointerPos(date) {
        const secondsSinceMidnight = date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();
        const secondsInADay = 86400;
        // const secondsSinceMidnight = date.getSeconds();
        // const secondsInADay = 60;
        return `${(secondsSinceMidnight / secondsInADay) * 100}%`;
    };

    function getCurrentSegment() {
        const currentTime = new Date().toTimeString().slice(0, 5);
        for (let segment of segments) {
            if (currentTime >= segment.start && currentTime < segment.end) {
                return segment;
            }
        }
        return segments[0];
    }

    function registerUpdate() {
        function updatePosition() {
            setLeftPosition(calculatePointerPos(new Date()));
            setColor(getCurrentSegment().color)
            console.log(`Current color is ${getCurrentSegment().color}`);

    };

        const timerId = setInterval(updatePosition, 1000)
        return () => clearInterval(timerId)
    };



    useEffect(registerUpdate);

    const contents = (
        <div className="lineContainer">
            <div className="verticalBar"></div>
            <Timeline segments={segments}/>
            <div className="verticalBar"></div>
            <TriangleCanvas
                imageSrc={triangleImage}
                rgbColor={color}
                triangleCoords={[
                    { x: 37, y: 45 },
                    { x: 100, y: 157 },
                    { x: 163, y: 45 }
                ]}
                className="triangle"
                style={{ left: leftPosition }}
            />
        </div>
    );


    return contents;
};

export default Line;
