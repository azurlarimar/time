import React from 'react';
import { useCountdown } from '../../contexts/CountdownContext';
import { useColor } from '../../contexts/ColorContext';

// This component handles title input, check on changes and sets new value
// also if timer is "plus", title is blue else if timer is "minus", title is red

const TitleControl = () => {
  const { handleTitleChange, title } = useCountdown();
  const { plus, minus } = useColor();

  return (
    <>
      <input
        className={`title-control ${
          plus ? 'title-plus' : minus ? 'title-minus' : ''
        }`}
        value={title}
        onChange={handleTitleChange}
        placeholder={'-'}
      />
    </>
  );
};

export default TitleControl;
