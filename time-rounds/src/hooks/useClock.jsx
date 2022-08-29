import React, { useState, useEffect, useRef } from 'react';

export const useClock = (initialTime = new Date()) => {
  const [time, setTime] = useState(initialTime);
  let timeoutRef = useRef();

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setTime(() => new Date());
    }, 1000);
    return () => clearTimeout(timeoutRef.current);
    // time pridaný do dependency array, efekt sa tak udeje, iba ak sa zmenil stav time
  }, [time]);

  return time;
};
