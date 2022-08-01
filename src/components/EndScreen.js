import React from 'react';
import { Expressions } from './Expressions';


export const EndScreen = (props) => {
    const { count, setCount, time, setGameState, setRound, display, setDisplay, setTime, allGames, setAllGames } = props;
    const timeSpent = Date.now()-time;
  
    const handleClick = () => {
      setGameState(1);
      setCount(1);
      setRound(count);
      setAllGames([...allGames, display])
      setDisplay([]);
      setTime(Date.now());
    }


    return (
    <div>
     <p id="game_over">Game Over,</p>
        <p id="time_spent">you spent {timeSpent} ms. </p>
        <button onClick={handleClick}>New Game</button>
    </div>
  );
        }
