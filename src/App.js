import React, { useState, useEffect } from 'react';
import './App.css';
import BaseGame from './components/BaseGame';
import ExtendedBaseGame from './components/ExtendedBaseGame';

function App() {
  const [gameMode, setGameMode] = useState('extendedBase');

  useEffect(() => {
    function handleKeyDown(e) {
      e.preventDefault();
      if (e.keyCode === 49) {
        setGameMode('base');
      }

      if (e.keyCode === 50) {
        setGameMode('extendedBase');
      }
    }

    document.addEventListener('keydown', handleKeyDown, false);

    return () => document.removeEventListener('keydown', handleKeyDown, false);
  }, []);

  return (
      <div className="App">
        {gameMode === 'base' && <BaseGame />}
        {gameMode === 'extendedBase' && <ExtendedBaseGame />}
      </div>
  );
}

export default App;
