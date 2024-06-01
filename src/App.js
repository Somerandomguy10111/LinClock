import React from 'react';
import './App.css';
import Line from 'src/components/Line';
import DateDisplay from 'src/components/DateDisplay';
import TimeInputFields from "src/components/timeinput";

function App() {
  const content = (
    <div className="App">
      <DateDisplay />
      <Line />
        {/*<div className="time-inputs-container">*/}
        {/*    <TimeInputFields/>*/}
        {/*</div>*/}
    </div>
  );

    return content;
}

export default App;
