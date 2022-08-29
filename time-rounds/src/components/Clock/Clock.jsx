import React, { useState, useEffect, useRef } from 'react';
import Hands from './Hands/Hands';
import Mark from './Mark/Mark';
import { useCountdown } from '../../contexts/CountdownContext';
import { rotateHour_get } from '../../helpers/rotateHour_get';
import { rotateMinutes_get } from '../../helpers/rotateMinutes_get';
import { useColor } from '../../contexts/ColorContext';

const Clock = ({ format, time }) => {
  // The size of the window
  const [size, setSize] = useState([0, 0]);
  const { hours, minutes, seconds, pie } = useCountdown();
  const { plus, minus } = useColor();
  const [isHour, setIsHour] = useState(false);
  const [isMinute, setIsMinute] = useState(false);
  const canvasRef = useRef(null);

  let diff;
  let circle_hours = format;

  const hourStartRotate = rotateHour_get(
    circle_hours,
    time.getHours(),
    time.getMinutes(),
    time.getSeconds()
  );
  const hourEndRotate = Math.floor(
    hourStartRotate + rotateHour_get(circle_hours, hours, minutes, seconds)
  );

  const minuteStartRotate = rotateMinutes_get(
    time.getMinutes(),
    time.getSeconds()
  );
  // function sums up where minute hand starts its rotation + where minute hand should stop her rotation
  // as result we get overall trajectory of minute hand from start to end
  const minuteEndRotate = Math.floor(
    minuteStartRotate + rotateMinutes_get(minutes, seconds)
  );

  const clockSize = 650;
  const scaleRatio = size.width / size.height;

  const landscape = scaleRatio > 1;

  const scale = landscape
    ? ((70 / clockSize) * size.height) / 100
    : ((70 / clockSize) * size.width) / 100;

  // This function updates the state thus re-render components
  const resizeHandler = () => {
    const width = window.innerWidth;

    const height = window.innerHeight;

    setSize({
      width: width,
      height: height,
    });
  };

  // Listening for the window resize event
  useEffect(() => {
    resizeHandler();
    window.addEventListener('resize', resizeHandler);
    return () => window.removeEventListener('resize', resizeHandler);
  }, []);

  const pieDraw = () => {
    // total seconds which are sum up from states of hours, minutes, seconds
    const totalSeconds =
      Number(hours) * 60 * 60 + Number(minutes) * 60 + Number(seconds);
    // as difference we subtract current time from totalSeconds and divide by 1000
    // to get number in seconds
    diff = Math.round(totalSeconds - (((new Date() - time) / 1000) | 0));

    let angle_start;
    let angle_end;

    // pie counts for hour hand
    if (diff > 3599) {
      angle_start = hourStartRotate;
      angle_end = hourEndRotate;
      setIsHour(true);
      setIsMinute(false);
    }

    // pie counts for minute hand
    else if (diff < 3599) {
      angle_start = minuteStartRotate;
      angle_end = minuteEndRotate;
      setIsMinute(true);
      setIsHour(false);
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    const angle_diff = angle_end - angle_start;

    ctx.arc(
      325,
      325,
      325,
      ((angle_start - 90) / 180) * Math.PI,
      ((angle_start - 90 + angle_diff) / 180) * Math.PI
    );
    ctx.lineTo(325, 325);
    ctx.fillStyle = '#d4d4d4';
    ctx.fill();
  };

  const pieReset = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  useEffect(() => {
    if (!pie) {
      pieReset();
    } else pieDraw();
  });

  return (
    <div className="clock-container" style={{ transform: `scale(${scale})` }}>
      <div className="clock-wrapper">
        <Mark format={format} />
        <Hands
          hourRotation={hourStartRotate}
          minuteRotation={minuteStartRotate}
          isHour={isHour}
          isMinute={isMinute}
          plus={plus}
          minus={minus}
        />
        <canvas id="pie" ref={canvasRef} width="650" height="650" />
      </div>
    </div>
  );
};

export default Clock;
