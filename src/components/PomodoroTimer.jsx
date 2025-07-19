import React, { useState, useEffect } from "react";

const PomodoroCard = () => {
  const [focusTime, setFocusTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(focusTime * 60);
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
  const [totalFocus, setTotalFocus] = useState(0);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            if (!isBreak) {
              setCompletedPomodoros((prev) => prev + 1);
              setTotalFocus((prev) => prev + focusTime);
              setIsBreak(true);
              setSecondsLeft(breakTime * 60);
            } else {
              setIsBreak(false);
              setSecondsLeft(focusTime * 60);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, isBreak, focusTime, breakTime]);

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setSecondsLeft(isBreak ? breakTime * 60 : focusTime * 60);
  };

  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const seconds = String(secondsLeft % 60).padStart(2, "0");
  const percent =
    100 -
    (secondsLeft /
      ((isBreak ? breakTime : focusTime) * 60)) *
      100;

  return (
    <div className="pomodoro-card card">
      <h3>Pomodoro</h3>

      <div className="time-selection">
        <h4>Tempo de Foco</h4>
        <div className="card-options">
          {[15, 20, 25].map((min) => (
            <button
              key={min}
              className={`time-card ${focusTime === min ? "selected" : ""}`}
              onClick={() => {
                setFocusTime(min);
                setIsBreak(false);      // volta para modo foco
                setSecondsLeft(min * 60);
                setIsRunning(true);     // já inicia automático
              }}
            >
              {min} min
            </button>
          ))}
        </div>

        <h4>Tempo de Descanso</h4>
        <div className="card-options">
          {[5, 10, 15].map((min) => (
            <button
              key={min}
              className={`time-card ${breakTime === min ? "selected" : ""}`}
              onClick={() => {
                setBreakTime(min);
                if (isBreak) {
                  setSecondsLeft(min * 60);
                  setIsRunning(true);   // se já estiver no descanso, reinicia o timer automaticamente
                }
              }}
            >
              {min} min
            </button>
          ))}
        </div>
      </div>

      <div className="timer-display" style={{ color: isBreak ? "green" : "black" }}>
        <span>{minutes}</span>:<span>{seconds}</span>
      </div>

      <div className="timer-controls">
        {!isRunning ? (
          <button className="btn btn-primary" onClick={handleStart}>
            <i className="fas fa-play" /> {isBreak ? "Iniciar Descanso" : "Iniciar Foco"}
          </button>
        ) : (
          <button className="btn btn-secondary" onClick={handlePause}>
            <i className="fas fa-pause" /> Pausar
          </button>
        )}
        <button className="btn btn-secondary" onClick={handleReset}>
          <i className="fas fa-redo" /> Resetar
        </button>
      </div>

      <div className="pomodoro-status">
        <p>
          Status:{" "}
          <span id="pomodoro-status-text">
            {isBreak
              ? "HORA DE RELAXAR UM POUCO!"
              : isRunning
              ? "Foco Ativo"
              : "Pronto para Focar"}
          </span>
        </p>
        <div className="progress-bar-container">
          <div
            className="progress-bar"
            id="pomodoro-progress"
            style={{ width: `${percent}%` }}
          ></div>
        </div>
      </div>

      <div className="pomodoro-info">
        <p>
          Pomodoros Concluídos Hoje:{" "}
          <span id="pomodoros-completed">{completedPomodoros}</span>
        </p>
        <p>
          Total de Foco: <span id="total-focus-time">{totalFocus} min</span>
        </p>
      </div>
    </div>
  );
};

export default PomodoroCard;