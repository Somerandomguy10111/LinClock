import React, { useState, useEffect } from 'react';
import 'src/components/DateDisplay.css'; // If you have specific styles for the date display


const DateDisplay = () => {
  const formatDate = () => {
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return now.toLocaleDateString(undefined, options); // Customize the date format as needed
  };

  const [date, setDate] = useState(formatDate());

  useEffect(() => {
    const timerId = setInterval(() => {
      setDate(formatDate());
    }, 60000); // Update the date every minute

    return () => clearInterval(timerId); // Cleanup on unmount
  }, []);

  return (
    <div className="date-display">{date}</div>
  );
};

export default DateDisplay;