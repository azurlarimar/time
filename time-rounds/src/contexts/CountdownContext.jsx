import React, {
  useContext,
  createContext,
  useState,
  useEffect,
  useRef,
} from 'react';
import {
  seconds_to_hms,
  number_to_stringdigits,
} from '../helpers/secondsToHms';
import { useSearchParams } from 'react-router-dom';

// CountdownContext is context that provides us global state through other components
// this global state is then used when we need it, when we don't have
// direct contact in components tree

// create new context named "CountdownContext"
const CountdownContext = createContext();

// create and export context provider for our CountdownContext
export const CountdownContextProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // here we get query values for 'tc' which we set before
  // and accordingly reformat them
  const queryTotalSeconds = seconds_to_hms(searchParams.get('tc'));
  const queryHours = number_to_stringdigits(queryTotalSeconds.h);
  const queryMinutes = number_to_stringdigits(queryTotalSeconds.m);
  const querySeconds = number_to_stringdigits(queryTotalSeconds.s);

  // we get query value for time start
  const queryTimeStart = Number(searchParams.get('ts'));
  // we get query value for time count
  const queryTimeCount = Number(searchParams.get('tc'));

  // we define our states with useState hook
  const [hours, setHours] = useState(queryHours);
  const [minutes, setMinutes] = useState(queryMinutes);
  const [seconds, setSeconds] = useState(querySeconds);
  const [paused, setPaused] = useState(
    searchParams.get('s') === 'started' ? false : true
  );
  const [queryReset, setQueryReset] = useState(
    searchParams.get('s') === 'started' ? false : null
  );
  const [formatTwelve, setFormatTwelve] = useState(false);
  const [formatTwentyFour, setFormatTwentyFour] = useState(false);
  const [timeFormat, setTimeFormat] = useState(
    searchParams.get('ch') ? searchParams.get('ch') : 24
  );
  const [title, setTitle] = useState(
    searchParams.get('t') ? searchParams.get('t') : ''
  );
  const [time, setTime] = useState(new Date());
  const [timeStart, setTimeStart] = useState(
    queryTimeStart ? queryTimeStart : ''
  );
  const [timeCount, setTimeCount] = useState(
    queryTimeCount ? queryTimeCount : ''
  );
  const [pie, setPie] = useState(
    timeStart === ''
      ? false
      : searchParams.get('s') === 'started' || 'stopped'
      ? true
      : null
  );

  // reference for timeout of countdown function
  let countdownRef = useRef(null);
  // reference for timeout of time
  let timeRef = useRef(null);

  // run effect every 1 second only if time state changes
  useEffect(() => {
    timeRef.current = setTimeout(() => {
      setTime(() => new Date());
    }, 1000);
    return () => {
      clearTimeout(timeRef.current);
    };
    // here to dependency array added time to check for changes
  }, [time]);

  // if countdown timer is paused clear time
  useEffect(() => {
    if (paused) {
      clearTimeout(timeRef.current);
    }
  }, [paused]);

  // handler function for resuming time after click on start button
  const handleTimeResume = () => {
    setTimeout(setTime(new Date()), 1000);
  };

  const handleTimeStart = () => {
    let start = new Date().getTime();
    if (paused) setTimeStart(Math.floor(start / 1000));
  };

  // if state is paused we set timeCount new value
  const handleTimeCount = () => {
    setTimeCount(
      Number(hours) * 60 * 60 + Number(minutes) * 60 + Number(seconds)
    );
  };

  const timeNow = time.getTime() / 1000;
  const timeEnd = timeStart + timeCount;

  const countdown = () => {
    if (paused) return;

    // calculate the difference between the time we set and the current time
    const diff = Math.floor(timeEnd - timeNow);

    const formattedTime = seconds_to_hms(diff);
    const hrs = number_to_stringdigits(formattedTime.h);
    const min = number_to_stringdigits(formattedTime.m);
    const sec = number_to_stringdigits(formattedTime.s);

    // pass the new state
    setHours(hrs);
    setMinutes(min);
    setSeconds(sec);
  };

  // every second runs the effect
  useEffect(() => {
    countdownRef.current = setTimeout(() => countdown(), 1000);

    return () => clearTimeout(countdownRef.current);
  });

  useEffect(() => {
    countdown();
    window.addEventListener('load', countdown);
    return () => window.removeEventListener('load', countdown);
  }, []);

  const formatTo12 = () => {
    setTimeFormat(12);
    setFormatTwelve(true);
    setFormatTwentyFour(false);
  };

  const formatTo24 = () => {
    setTimeFormat(24);
    setFormatTwentyFour(true);
    setFormatTwelve(false);
  };

  const handleTitleChange = (e) => {
    const { value } = e.target;

    setTitle(value);
  };

  const handleReset = () => {
    clearTimeout(timeRef.current);
    clearTimeout(countdownRef.current);
    setHours('00');
    setMinutes('00');
    setSeconds('00');
    setTitle('');
    setPaused(true);
    setQueryReset(true);
    setTimeStart('');
    setTimeCount('');
    setPie(false);
  };

  const handleQueryReset = () => {
    searchParams.delete('theme');
    searchParams.delete('ts');
    searchParams.delete('tc');
    searchParams.delete('t');
    searchParams.delete('s');
    searchParams.delete('ch');
    setSearchParams(searchParams);
  };

  const handleParams = () => {
    const theme = 'white';
    const ts = timeStart;
    // if paused is true we set time count new value instead we let default value
    const tc = timeCount;
    const t = title;
    const s = paused ? 'stopped' : 'started';
    const ch = formatTwelve
      ? timeFormat
      : formatTwentyFour
      ? timeFormat
      : timeFormat;

    setSearchParams({ theme, ts, tc, t, s, ch });
  };

  useEffect(() => {
    if (queryReset) {
      handleQueryReset();
    } else handleParams();
  }, [paused, queryReset, timeFormat, title]);

  return (
    <CountdownContext.Provider
      value={{
        hours,
        setHours,
        minutes,
        setMinutes,
        seconds,
        setSeconds,
        paused,
        setPaused,
        setQueryReset,
        timeFormat,
        setTimeFormat,
        formatTo12,
        formatTo24,
        handleTitleChange,
        title,
        setTitle,
        handleReset,
        handleTimeResume,
        handleTimeStart,
        handleTimeCount,
        pie,
        setPie,
      }}
    >
      {children}
    </CountdownContext.Provider>
  );
};

export const useCountdown = () => useContext(CountdownContext);
