import React from 'react';

// Mark component renders marks on Clock component based of time format
// if time format is 24 => 24 marks on Clock else if time format is 12 => 12 marks on Clock

const Mark = ({ format }) => {
  if (format == 24) {
    return (
      <>
        <div className="mark-line mark-line-24 bold"></div>
        <div className="mark-line mark-line-1"></div>
        <div className="mark-line mark-line-2"></div>
        <div className="mark-line mark-line-3"></div>
        <div className="mark-line mark-line-4"></div>
        <div className="mark-line mark-line-5"></div>
        <div className="mark-line mark-line-6 bold"></div>
        <div className="mark-line mark-line-7"></div>
        <div className="mark-line mark-line-8"></div>
        <div className="mark-line mark-line-9"></div>
        <div className="mark-line mark-line-10"></div>
        <div className="mark-line mark-line-11"></div>
        <div className="mark-line mark-line-12 bold"></div>
        <div className="mark-line mark-line-13"></div>
        <div className="mark-line mark-line-14"></div>
        <div className="mark-line mark-line-15"></div>
        <div className="mark-line mark-line-16"></div>
        <div className="mark-line mark-line-17"></div>
        <div className="mark-line mark-line-18 bold"></div>
        <div className="mark-line mark-line-19"></div>
        <div className="mark-line mark-line-20"></div>
        <div className="mark-line mark-line-21"></div>
        <div className="mark-line mark-line-22"></div>
        <div className="mark-line mark-line-23"></div>
      </>
    );
  } else if (format == 12) {
    return (
      <>
        <div className="mark-line f-12--mark-line-1"></div>
        <div className="mark-line f-12--mark-line-2"></div>
        <div className="mark-line f-12--mark-line-3 bold"></div>
        <div className="mark-line f-12--mark-line-4"></div>
        <div className="mark-line f-12--mark-line-5"></div>
        <div className="mark-line f-12--mark-line-6 bold"></div>
        <div className="mark-line f-12--mark-line-7"></div>
        <div className="mark-line f-12--mark-line-8"></div>
        <div className="mark-line f-12--mark-line-9 bold"></div>
        <div className="mark-line f-12--mark-line-10"></div>
        <div className="mark-line f-12--mark-line-11"></div>
        <div className="mark-line f-12--mark-line-12 bold"></div>
      </>
    );
  }
};

export default Mark;
