import { useState, useEffect } from "react";
import styles from '../src/stopwatch.module.css'



export default function Stopwatch() {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval = null;

    if (running) {
      interval = setInterval(() => {
        setElapsedTime((elapsedTime) => elapsedTime + 1);
      }, 1000);
    } else if (!running && elapsedTime !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [running, elapsedTime]);

  const handleStartStop = () => {
    setRunning(!running);
  };

  const handleReset = () => {
    setRunning(false);
    setElapsedTime(0);
  };

  const formatTime = (elapsedTime) => {
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;
    return `${minutes.toString().padStart(1, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div >
      <h1>Stopwatch</h1>
      <div className={styles.stopclock}>Time: {formatTime(elapsedTime)}</div>
      <div className={styles.bttn}>
        <button onClick={handleStartStop}>{running ? "Stop" : "Start"}</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}
