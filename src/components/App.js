
import React, { useEffect, useState, useRef } from "react";
import './../styles/App.css';

const App = () => {


  const [time, setTime] = useState(0);
  const [laps, setLaps] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const timeRef = useRef(null);

  function formattedTime(csc) {
    const min = Math.floor(csc / 6000);
    const sec = Math.floor((csc % 6000) / 100);
    const cs = csc % 100;

    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}:${cs.toString().padStart(2, '0')}`;
  }

  function startTime() {
    if (!isRunning) {
      setIsRunning(true);
      timeRef.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 10); // every 10ms = 1 centisecond
    }
  }

  function stopTime() {
    if (isRunning) {
      setIsRunning(false);
      clearInterval(timeRef.current);
    }
  }

  function resetTime() {
    clearInterval(timeRef.current);
    timeRef.current = null;
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  }

  function lapsTime() {
    setLaps((prevLaps) => [...prevLaps, time]);
  }

  // Cleanup when unmounting
  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div>
      {/* Do not remove the main div */}
      <p>{formattedTime(time)}</p>
      <button onClick={startTime} disabled={isRunning}>start</button>
      <button onClick={stopTime} disabled={!isRunning}>stop</button>
      <button onClick={lapsTime} disabled={!isRunning}>lap</button>
      <button onClick={resetTime} disabled={isRunning}>reset</button>
      <ul>
        {laps.map((lap, index) => (
          <li key={index}>{formattedTime(lap)}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
