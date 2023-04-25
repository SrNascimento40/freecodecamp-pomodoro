import React, { useState } from "react";
import "./App.css";
import audio from "./scream.mp3";

function playScream() {
  const audioElement = new Audio(audio);
  audioElement.play();
}

function App() {
  const [breakTime, setBreakTime] = useState(5 * 60);
  const [sessionTime, setSessionTime] = useState(25 * 60);
  const [displayTime, setDisplayTime] = useState(25 * 60);
  const [start, setStart] = useState(false);
  const [pause, setPause] = useState(false);

  function increaseBreakTime() {
    if (breakTime >= (60*60)) {
      return;
    }
    setBreakTime(breakTime + 60);
  }

  function decreaseBreakTime() {
    if (breakTime < 65) {
      return;
    }
    setBreakTime(breakTime - 60);
  }

  function increaseSessionTime() {
    if (sessionTime >= (60*60)) {
      return;
    }
    setSessionTime(sessionTime + 60);
    if (!start) {
      setDisplayTime(sessionTime + 60);
    }
  }

  function decreaseSessionTime() {
    if (sessionTime < 65) {
      return;
    }
    setSessionTime(sessionTime - 60);
    if (!start) {
      setDisplayTime(sessionTime - 60);
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
    setSessionTime(25 * 60);
    setDisplayTime(25 * 60);
    setBreakTime(5 * 60);
    setStart(false);
    clearInterval(localStorage.getItem("interval-id"));
    setPause(false);
  }

  function controlTime() {
    let second = 1000;
    let date = new Date().getTime();
    let nextDate = new Date().getTime() + second;

    if (!start) {
      let interval = setInterval(() => {
        date = new Date().getTime();

        if (date > nextDate) {
          setDisplayTime((prev) => {
            if (prev <= 0 && !pause) {
              playScream();
              setPause(true);
              return breakTime;
            } else if (prev <= 0 && pause) {
              playScream();
              setPause(false);
              return sessionTime;
            }

            return prev - 1;
          });
          nextDate += second;
        }
      }, 30);
      localStorage.clear();
      localStorage.setItem("interval-id", interval);
    }

    if (start) {
      clearInterval(localStorage.getItem("interval-id"));
    }

    setStart(!start);
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
          <div id="session-length">{sessionTime / 60}</div>
          <button onClick={() => increaseSessionTime()} id="session-increment">
            +
          </button>
        </div>
        <div className="control-time">
          <h3 id="break-label">break time</h3>
          <button onClick={() => decreaseBreakTime()} id="break-decrement">
            -
          </button>
          <div id="break-length">{breakTime / 60}</div>
          <button onClick={() => increaseBreakTime()} id="break-increment">
            +
          </button>
        </div>
      </div>
      <div id="display">
        <h4 id="timer-label">{pause ? "Break" : "Session"}</h4>
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
