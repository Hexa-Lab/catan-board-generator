import React, { useState, useEffect } from 'react';
import './App.css';
import BaseGame from './modes/base/game';
import ExtendedBaseGame from './modes/extended-base/game';
import FourIslands from './modes/four-islands/game';
import BarbarianTracker from './components/BarbarianTracker';

function App() {
  const [gameMode, setGameMode] = useState('base');
  const [twoTwelve, setTwoTwelve] = useState(false);
  const [showBarbarianTracker, setShowBarbarianTracker] = useState(false);

  useEffect(() => {
    function handleKeyDown(e) {
      e.preventDefault();

      // Key: 1
      if (e.keyCode === 49) {
        setGameMode('base');
      }

      // Key: 2
      if (e.keyCode === 50) {
        setGameMode('extendedBase');
      }

      // Key: 3
      if (e.keyCode === 51) {
        setGameMode('fourIslands')
      }

      // Key: T
      if (e.keyCode === 84) {
        setTwoTwelve(!twoTwelve);
      }

      // Key: V
      if (e.keyCode === 86) {
        setShowBarbarianTracker(!showBarbarianTracker);
      }
    }

    document.addEventListener('keydown', handleKeyDown, false);

    return () => document.removeEventListener('keydown', handleKeyDown, false);
  }, [twoTwelve, showBarbarianTracker]);

  return (
      <div className="App">
        {gameMode === 'base' && <BaseGame twoTwelve={twoTwelve}/>}
        {gameMode === 'extendedBase' && <ExtendedBaseGame twoTwelve={twoTwelve}/>}
        {gameMode === 'fourIslands' && <FourIslands twoTwelve={twoTwelve}/>}
        {showBarbarianTracker && <BarbarianTracker />}
      </div>
  );
}

export default App;
