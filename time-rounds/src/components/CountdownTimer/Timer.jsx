import React, { useEffect } from 'react';
import { useCountdown } from '../../contexts/CountdownContext';
import { useColor } from '../../contexts/ColorContext';

// Timer handles inputs for time values, also buttons as controllers
// if we want change the state of start, stop or reset the timer

const Timer = () => {
  // import states and functions from useCountdown context hook
  const {
    hours,
    setHours,
    minutes,
    setMinutes,
    seconds,
    setSeconds,
    paused,
    setPaused,
    setQueryReset,
    handleReset,
    handleTimeResume,
    handleTimeStart,
    handleTimeCount,
    setPie,
  } = useCountdown();

  // import states from useColor context hook
  const { plus, setPlus, minus, setMinus } = useColor();

  // handle function for checking change in value of hours state
  const handleHours = (e) => {
    const { value } = e.target;

    setHours(value);
  };

  // handle function for checking change in value of minutes state
  const handleMinutes = (e) => {
    const { value } = e.target;

    setMinutes(value);
  };

  // handle function for checking change in value of seconds state
  const handleSeconds = (e) => {
    const { value } = e.target;

    setSeconds(value);
  };

  // handle function for switching paused state and resume time if time was paused
  const handleStartStop = () => {
    setPie(true);
    setQueryReset(false);
    setPaused(!paused);
    handleTimeResume();
    handleTimeStart();
    handleTimeCount();
  };

  // handle function for reset state of Timer and also for reset of useColor context
  // values
  const handleResetState = () => {
    handleReset();
    setPlus(false);
    setMinus(false);
  };

  // check if timer values are < than 0 or > than 0 and if so
  // set state as minus or plus, this causes red or blue color of
  // Timer inputs and Clock hands
  useEffect(() => {
    if (hours < 0 || minutes < 0 || seconds < 0) {
      setMinus(true);
      setPlus(false);
    } else if (hours > 0 || minutes > 0 || seconds > 0) {
      setPlus(true);
      setMinus(false);
    }
  });

  const disabled = !paused ? true : false;

  return (
    <div className="countdown-wrapper">
      <button className="btn-timer-control" onClick={handleResetState}>
        <img className="img-stop" src="/icons/control--round-stop.svg" />
      </button>

      <input
        type="number"
        placeholder="x1"
        step="1"
        min="-24"
        max="24"
        className={`timer-input input-hours ${
          plus ? 'plus' : minus ? 'minus' : ''
        }`}
        name="hours"
        value={hours}
        onChange={handleHours}
        disabled={disabled}
      />

      <span className="timer-splitter">&#58;</span>

      <input
        type="number"
        placeholder="x1"
        step="1"
        min="-60"
        max="60"
        className={`timer-input input-minutes	${
          plus ? 'plus' : minus ? 'minus' : ''
        }`}
        name="minutes"
        value={minutes}
        onChange={handleMinutes}
        disabled={disabled}
      />

      <span className="timer-splitter">&#x3a;</span>

      <input
        type="number"
        placeholder="x1"
        step="1"
        min="-60"
        max="60"
        className={`timer-input input-seconds	${
          plus ? 'plus' : minus ? 'minus' : ''
        }`}
        name="seconds"
        value={seconds}
        onChange={handleSeconds}
        disabled={disabled}
      />

      <button className="btn-timer-control" onClick={handleStartStop}>
        {paused ? (
          <img className="img-play" src="/icons/control--round-play.svg" />
        ) : (
          <img className="img-pause" src="/icons/control--round-pause.svg" />
        )}
      </button>
    </div>
  );
};

export default Timer;
