import React from 'react';
import Clock from '../components/Clock/Clock';
import CountdownTimer from '../components/CountdownTimer/CountdownTimer';
import TitleControl from '../components/TitleControl/TitleControl';
import { useCountdown } from '../contexts/CountdownContext';
import { useClock } from '../hooks/useClock';

const ClockPage = () => {
  const { timeFormat, formatTo12, formatTo24 } = useCountdown();
  const time = useClock();

  return (
    <div className="clock-page-container">
      <div className="top-panel-container">
        <div className="time-format-wrapper">
          <button onClick={formatTo12}>12</button>
          <button onClick={formatTo24}>24</button>
        </div>
        <TitleControl />
        <button className="btn-theme-switcher">&bull;</button>
      </div>
      <Clock time={time} format={timeFormat} />
      <CountdownTimer />
    </div>
  );
};

export default ClockPage;
