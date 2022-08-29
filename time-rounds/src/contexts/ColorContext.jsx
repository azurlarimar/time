import React, { useContext, createContext, useState } from 'react';

// ColorContext is context that provides us global state through other components
// this global state is then used when we need it, when we don't have
// direct contact in components tree

// create new context named "ColorContext"
const ColorContext = createContext();

// create and export context provider for our ColorContext
export const ColorContextProvider = ({ children }) => {
  const [plus, setPlus] = useState(false);
  const [minus, setMinus] = useState(false);

  return (
    // our provider accepts components which later get access to this global state
    <ColorContext.Provider value={{ plus, setPlus, minus, setMinus }}>
      {children}
    </ColorContext.Provider>
  );
};

// here we export custom context hook as "useColor"
export const useColor = () => useContext(ColorContext);
