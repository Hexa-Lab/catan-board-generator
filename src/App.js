import React, { useState, useEffect } from 'react';
import './App.css';
import BaseGame from './modes/base/game';
import ExtendedBaseGame from './modes/extended-base/game';
import FourIslands from './modes/four-islands/game';

function App() {
  const [gameMode, setGameMode] = useState('base');
  const [twoTwelve, setTwoTwelve] = useState(false);

  useEffect(() => {
    function handleKeyDown(e) {
      e.preventDefault();
      if (e.keyCode === 49) {
        setGameMode('base');
      }

      if (e.keyCode === 50) {
        setGameMode('extendedBase');
      }

      if (e.keyCode === 51) {
        setGameMode('fourIslands')
      }

      if (e.keyCode === 84) {
        setTwoTwelve(!twoTwelve);
      }
    }

    document.addEventListener('keydown', handleKeyDown, false);

    return () => document.removeEventListener('keydown', handleKeyDown, false);
  }, [twoTwelve]);

  return (
      <div className="App">
        {gameMode === 'base' && <BaseGame twoTwelve={twoTwelve}/>}
        {gameMode === 'extendedBase' && <ExtendedBaseGame twoTwelve={twoTwelve}/>}
        {gameMode === 'fourIslands' && <FourIslands twoTwelve={twoTwelve}/>}
      </div>
  );
}

export default App;
