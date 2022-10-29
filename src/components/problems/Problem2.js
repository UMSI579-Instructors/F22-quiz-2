import {useState} from "react";

const exercises = ['Jumping jacks', 'Wall sit', 'Push-up', 'Abdominal crunch', 'Step-up onto chair', 'Squat', 'Triceps dip', 'Plank', 'High knees running in place', 'Lunge', 'Push-up and rotation', 'Side plank']

const Problem2  = () => {
  const [intervalId, setIntervalId] = useState(0);
  const [tracker, setTracker] = useState({
    count: 0,
    step: 0,
  });

  const [counting, setCounting] = useState(false);

  const stop = () => {
    clearInterval(intervalId);
    setCounting(false);
  }

  const reset = () => {
    stop();
    setTracker({
      count: 0,
      step: 0,
    })
  }

  const start = () => {
    setCounting(true);
    const theIntervalId = setInterval(() => {
      setTracker((previousValue) => {
        if(previousValue.count === 10) {
          if (previousValue.step === exercises.length - 1) {
            clearInterval(theIntervalId)
            reset();
            return {
              count: 0,
              step: 0,
            }
          }
          return {
            count: 1,
            step: previousValue.step + 1,
          }
        }
        return {
          ...previousValue,
          count: previousValue.count + 1,
        }
      });
    }, 200);
    setIntervalId(theIntervalId);
  }

  return (
    <>
      <output>{tracker.step === 0 && tracker.count === 0 ? 'click start to exercise' : `${exercises[tracker.step]}: ${tracker.count}`}</output>
      <div>
        <button className='btn btn-primary mx-2' onClick={start()} disabled={counting}>Start</button>
        <button className='btn btn-secondary mx-2' onClick={stop} disabled={!counting}>stop</button>
        <button className='btn btn-secondary mx-2' onClick={reset} disabled={tracker.step === 0 && tracker.count === 0}>Reset</button>
      </div>
    </>
  )
}

export default Problem2;
