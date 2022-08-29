import React from 'react';
import './App.css';
import { CountdownContextProvider } from './contexts/CountdownContext';
import { ColorContextProvider } from './contexts/ColorContext';
import ClockPage from './pages/ClockPage';

function App() {
  return (
    <div className="App">
      <CountdownContextProvider>
        <ColorContextProvider>
          <ClockPage />
        </ColorContextProvider>
      </CountdownContextProvider>
    </div>
  );
}

export default App;
