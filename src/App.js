import React, { useState } from "react";
import "./App.css";

function App() {
  const [breakTime, setBreakTime] = useState(5 * 60);
  const [sessionTime, setSessionTime] = useState(25 * 60);
  const [displayTime, setDisplayTime] = useState(25 * 60);
  const [start, setStart] = useState(false);
  const [pause, setPause] = useState(false);

  function increaseBreakTime() {
    setBreakTime(breakTime + 10);
  }

  function decreaseBreakTime() {
    if (breakTime < 5) {
      alert("tempo mínimo atingido!");
      return;
    }
    setBreakTime(breakTime - 10);
  }

  function increaseSessionTime() {
    setSessionTime(sessionTime + 10);
    if (!start) {
      setDisplayTime(sessionTime + 10);
    }
  }

  function decreaseSessionTime() {
    if (sessionTime < 5) {
      alert("tempo mínimo atingido!");
      return;
    }
    setSessionTime(sessionTime - 10);
    if (!start) {
      setDisplayTime(sessionTime - 10);
    }
  }

  function formatTime(time) {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    return (
      (minutes < 10 ? "0" + minutes : minutes) +
      ":" +
      (seconds < 10 ? "0" + seconds : seconds)
    );
  }

  function resetTimer() {
    if (start) {
      setDisplayTime(sessionTime);
      setStart(false);
    } else {
      setSessionTime(25 * 60);
      setDisplayTime(25 * 60);
      setBreakTime(5 * 60);
    }
  }

  function controlTime() {
    setStart(!start);
    console.log("banana 1");
    if (displayTime <= 0 && start) {
      console.log("banana 2");
      setStart(false);
      setPause(true);
      setDisplayTime(breakTime);
    }
    if (displayTime <= 0 && pause) {
      console.log("banana 3");
      setStart(true);
      setPause(false);
      setDisplayTime(sessionTime);
    }
  }

  return (
    <body>
      <h1>POMODORO</h1>
      <div class="controls">
        <div className="control-time">
          <h3 id="session-label">session time</h3>
          <button onClick={() => decreaseSessionTime()} id="session-decrement">
            -
          </button>
          <div id="session-length">{formatTime(sessionTime)}</div>
          <button onClick={() => increaseSessionTime()} id="session-increment">
            +
          </button>
        </div>
        <div className="control-time">
          <h3 id="break-label">break time</h3>
          <button onClick={() => decreaseBreakTime()} id="break-decrement">
            -
          </button>
          <div id="break-length">{formatTime(breakTime)}</div>
          <button onClick={() => increaseBreakTime()} id="break-increment">
            +
          </button>
        </div>
      </div>
      <div id="display">
        <h2 id="time-left">{formatTime(displayTime)}</h2>
        <button
          className="controlPomo"
          id="start_stop"
          onClick={() => controlTime()}
        >
          {start ? "Stop" : "Start"}
        </button>
        <button className="controlPomo" id="reset" onClick={() => resetTimer()}>
          Reset
        </button>
      </div>
    </body>
  );
}

export default App;
