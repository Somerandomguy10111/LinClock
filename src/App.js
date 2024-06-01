import React from 'react';
import './App.css';
import Line from 'src/components/Line';
import DateDisplay from 'src/components/DateDisplay';

function App() {
  const content = (
    <div className="App">
      <DateDisplay />
      <Line />
    </div>
  );

  return content;
}

export default App;
