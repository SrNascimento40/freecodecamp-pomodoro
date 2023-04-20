import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [breakTime, setBreakTime] = useState(5*60);
  const [seconds, setSeconds] = useState(0);
  const [sessionTime, setSessionTime] = useState(25*60);
  const [start, setStart] = useState(false)

  function increaseBreakTime() {
    setBreakTime(breakTime + 60)
  }

  function decreaseBreakTime() {
    setBreakTime(breakTime - 60)
  }

  function increaseSessionTime() {
    setSessionTime(sessionTime + 60)
  }

  function decreaseSessionTime() {
    setSessionTime(sessionTime - 60)
  }

  useEffect(() => {
    let intervalId = null;
    while (start) {
      intervalId = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds - 1);
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [start]);
  

  return (
    <body>
      <h1>POMODORO</h1>
      <div class="controls">
        <div className="control-time">
          <h3 id="session-label">session time</h3>
          <button onClick={() => decreaseSessionTime()} id="session-decrement">-</button>
          <div id="session-length">{sessionTime/60}</div>
          <button onClick={() => increaseSessionTime()} id="session-increment">+</button>
        </div>
        <div className="control-time">
          <h3 id="break-label">break time</h3>
          <button onClick={() => decreaseBreakTime()} id="break-decrement">-</button>
          <div id="break-length">{breakTime/60}</div>
          <button onClick={() => increaseBreakTime()} id="break-increment">+</button>
        </div>
      </div>
      <div id="display">
        <h2 id="time-left">{sessionTime/60}:{seconds.toString().padStart(2, '0')}</h2>
        <button className="controlPomo" id="start_stop" onClick={() => setStart(!start)}>{start ? "Start" : "Stop"}</button>
        <button className="controlPomo" id="reset" onClick={() => setSessionTime(25)}>Reset</button>
      </div>
    </body>
  );
}

export default App;
