import { useState } from "react";

const Problem1 = () => {
  const [count, setCount] = useState(0);
  const [intervalId, setIntervalId] = useState(0);
  const [counting, setCounting] = useState(false);

  function start() {
    setCounting(true);
    const theIntervalId = setInterval(() => {
      setCount((previousValue) => {
        return previousValue + 1;
      });
    }, 1000);
    setIntervalId(theIntervalId);
  }

  const stop = () => {
    clearInterval(intervalId);
    setCounting(false);
  };

  const reset = () => {
    stop();
    setCount(0);
  };

  return (
    <>
      <output>{count}</output>
      <div>
        <button className="btn btn-primary mx-2" onClick={start} disabled={counting}>
          Start
        </button>
        <button className="btn btn-secondary mx-2" onClick={stop} disabled={!counting}>
          Stop
        </button>
        <button className="btn btn-secondary mx-2" onClick={reset} disabled={count === 0}>
          Reset
        </button>
      </div>
    </>
  );
};

export default Problem1;
