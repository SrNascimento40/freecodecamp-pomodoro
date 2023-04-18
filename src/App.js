import { useState } from "react";
import "./App.css";

function App() {
  const [breakTime, setBreakTime] = useState(5);
  const [sessionTime, setSessionTime] = useState(25);
  const [start, setStart] = useState(false)

  function increaseBreakTime() {
    setBreakTime(breakTime + 1)
  }

  function decreaseBreakTime() {
    setBreakTime(breakTime - 1)
  }

  function increaseSessionTime() {
    setSessionTime(sessionTime + 1)
  }

  function decreaseSessionTime() {
    setSessionTime(sessionTime - 1)
  }

  return (
    <body>
      <h1>POMODORO</h1>
      <div class="controls">
        <div className="control-time">
          <h3 id="session-label">session time</h3>
          <button onClick={() => decreaseSessionTime()} id="session-decrement">-</button>
          <div id="session-length">{sessionTime}</div>
          <button onClick={() => increaseSessionTime()} id="session-increment">+</button>
        </div>
        <div className="control-time">
          <h3 id="break-label">break time</h3>
          <button onClick={() => decreaseBreakTime()} id="break-decrement">-</button>
          <div id="break-length">{breakTime}</div>
          <button onClick={() => increaseBreakTime()} id="break-increment">+</button>
        </div>
      </div>
      <div id="display">
        <h2 id="time-left">{sessionTime}:00</h2>
        <button id="start_stop" onClick={() => setStart(!start)}>{start ? "Start" : "Stop"}</button>
        <button id="reset" onClick={() => setSessionTime(25)}>Reset</button>
      </div>
    </body>
  );
}

export default App;
