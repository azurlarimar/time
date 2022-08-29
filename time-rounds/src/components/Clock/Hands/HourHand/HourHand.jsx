import React from 'react';

const HourHand = ({ hourRotation, plus, minus, isHour }) => {
  const style = {
    transform: `rotate(${hourRotation + 'deg'})`,
    backgroundColor: `${
      isHour && plus ? '#0000ff' : isHour && minus ? '#ff0000' : ''
    }`,
  };
  return (
    <>
      <div style={style} className="hour-hand"></div>
    </>
  );
};

export default HourHand;
