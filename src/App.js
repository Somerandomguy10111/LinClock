import './App.css';
import Line from 'src/components/Line';
import DateDisplay from 'src/components/DateDisplay';
// import TimeInputFields from "src/components/timeinput";


function fillTimeGaps(segments) {
    const filledSegments = [];
    const dayStart = '00:00';
    const dayEnd = '24:00';
    const freeSegment = { title: 'Free', color: '#00FF00' };

    let previousEnd = dayFormat(dayStart);

    segments.forEach(segment => {
        const start = dayFormat(segment.start);
        if (previousEnd < start) {
            filledSegments.push({
                ...freeSegment,
                start: minToTime(previousEnd),
                end: segment.start
            });
        }
        filledSegments.push(segment);
        previousEnd = dayFormat(segment.end);
    });

    if (previousEnd < dayFormat(dayEnd)) {
        filledSegments.push({
            ...freeSegment,
            start: minToTime(previousEnd),
            end: dayEnd
        });
    }

    return filledSegments;
}

function dayFormat(time) {
    const [hour, minute] = time.split(':').map(Number);
    return hour * 60 + minute;
}

function minToTime(minutes) {
    const hour = Math.floor(minutes / 60).toString().padStart(2, '0');
    const minute = (minutes % 60).toString().padStart(2, '0');
    return `${hour}:${minute}`;
}

function App() {
    const segments = [
        { title: 'Work', start: '12:45', end: '17:45', color: '#3333FF' },
        { title: 'Break', start: '17:45', end: '18:30', color: '#00FF00' },
        { title: 'Work', start: '23:30', end: '00:30', color: '#3333FF' },
        { title: 'Break', start: '00:30', end: '00:45', color: '#00FF00' },
        { title: 'Work', start: '00:45', end: '02:45', color: '#3333FF' },
    ];

    const filledSegments = fillTimeGaps(segments)

    const content = (
        <div className="App">
            <DateDisplay />
            <Line segments={filledSegments} />
        </div>
    );

    return content;
}

export default App;
