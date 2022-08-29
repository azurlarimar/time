import React from 'react';
import HourHand from './HourHand/HourHand';
import MinuteHand from './MinuteHand/MinuteHand';

// Hands component handles MinuteHand and HourHand components
// and passes down them states through props

const Hands = ({
  hourRotation,
  minuteRotation,
  plus,
  minus,
  isHour,
  isMinute,
}) => {
  return (
    <>
      <MinuteHand
        minuteRotation={minuteRotation}
        plus={plus}
        minus={minus}
        isMinute={isMinute}
      />
      <HourHand
        hourRotation={hourRotation}
        plus={plus}
        minus={minus}
        isHour={isHour}
      />
      <div
        style={{
          backgroundColor: `${
            isMinute ? '' : plus ? '#0000ff' : minus ? '#ff0000' : ''
          }`,
        }}
        className="dot"
      ></div>
    </>
  );
};

export default Hands;
