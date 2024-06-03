import './App.css';
import Line from 'src/components/Line';
import DateDisplay from 'src/components/DateDisplay';
// import TimeInputFields from "src/components/timeinput";

function App() {
    const segments = [
        { title: 'Work', start: '08:00', end: '13:00', color: '#3333FF' },
        { title: 'Break', start: '13:00', end: '14:00', color: '#00FF00' },
        { title: 'Work', start: '14:00', end: '19:00', color: '#3333FF' },
    ];

  const content = (
    <div className="App">
      <DateDisplay />
      <Line segments={segments} />
    </div>
  );

    return content;
}

export default App;
