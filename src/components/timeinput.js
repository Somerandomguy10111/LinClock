import React from 'react';
import 'src/components/timeinput.css';

const TimeInputFields = () => {
   const TimeInput = ({ label, value, onChange }) => (
    <div className="time-input">
      <label>{label}</label>
      <input
        type="time"
        value={value}
        onChange={onChange}
      />
    </div>
  );

  return (
    <div className="time-inputs">
      <TimeInput />
      <TimeInput/>
    </div>
  );
};

export default TimeInputFields;
