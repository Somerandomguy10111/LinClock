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
        { title: 'Work', start: '10:45', end: '15:45', color: '#3333FF' },
        { title: 'Break', start: '15:45', end: '16:30', color: '#00FF00' },
        { title: 'Work', start: '16:30', end: '21:30', color: '#3333FF' },
        { title: 'Break', start: '21:30', end: '22:00', color: '#00FF00' },
        { title: 'Work', start: '22:00', end: '00:00', color: '#3333FF' },
    ]


    // let flex_segments = [
    //     { title: 'Work', color: '#3333FF' },
    //     { title: 'Break',color: '#00FF00' },
    //     { title: 'Work', color: '#3333FF' },
    //     { title: 'Break', color: '#00FF00' },
    //     { title: 'Work', color: '#3333FF' },
    // ];
    //
    // function setTimes(durations, startTime) {
    //     if (durations.length !== segments.length) {
    //         throw new Error('Number of durations do not match number of time segments')
    //     }
    //
    //     let currentTime = parseTime(startTime);
    //     console.log(`Current before re-formatting time: ${currentTime}`)
    //
    //
    //     segments.forEach((durations, index) => {
    //         segments[index].start = formatTime(currentTime)
    //         console.log(`Formatted current time = ${formatTime(currentTime)}`)
    //         currentTime = new Date(currentTime.getTime() + durations * 60000)
    //         segments[index].end = formatTime(currentTime)
    //     });
    // }
    //
    // function parseTime(time) {
    //     const [hours, minutes] = time.split(':').map(Number);
    //     const date = new Date();
    //     date.setHours(hours, minutes, 0, 0); // set time to today and input hours and minutes
    //     return date;
    // }
    //
    // function formatTime(date) {
    //     const hours = date.getHours();
    //     const minutes = date.getMinutes();
    //     const formattedTime = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0');
    //     // console.log(`formatTime: date object - ${date.toString()}, hours - ${hours}, minutes - ${minutes}, formatted time - ${formattedTime}`);
    //     return formattedTime;
    // }

    // let durations = [5.0, 0.75, 5.0, 0.5, 2]
    // console.log('about to call this thing')
    // setTimes(durations, "10:45")
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
