import React from 'react';
import Timer from './Timer';

// As parent component of Timer

const CountdownTimer = () => {
  return (
    <div className="countdown-container">
      <Timer />
    </div>
  );
};

export default CountdownTimer;
