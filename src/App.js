import { useState } from "react";
import "./App.css";

function App() {
  const [breakTime, setBreakTime] = useState(5);
  const [sessionTime, setSessionTime] = useState(25);

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
          <h3>session time</h3>
          <button onClick={() => decreaseSessionTime()}>-</button>
          <div id="session-label">{sessionTime}</div>
          <button onClick={() => increaseSessionTime()}>+</button>
        </div>
        <div className="control-time">
          <h3>break time</h3>
          <button onClick={() => decreaseBreakTime()}>-</button>
          <div id="break-label">{breakTime}</div>
          <button onClick={() => increaseBreakTime()}>+</button>
        </div>
      </div>
      <div id="display">
        <h2>25:00</h2>
      </div>
    </body>
  );
}

export default App;
