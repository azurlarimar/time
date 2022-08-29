import React from 'react';

const MinuteHand = ({ minuteRotation, plus, minus, isMinute }) => {
  const style = {
    transform: `rotate(${minuteRotation + 'deg'})`,
    backgroundColor: `${
      isMinute && plus ? '#0000ff' : isMinute && minus ? '#ff0000' : ''
    }`,
  };

  return (
    <>
      <div style={style} className="minute-hand"></div>
    </>
  );
};

export default MinuteHand;
