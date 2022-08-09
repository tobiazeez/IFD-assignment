import React from 'react';
import { Expressions } from './Expressions';


export const EndScreen = (props) => {
    const {  count, setCount, setRound, setGameState, allGames} = props;
  
    const startNewGame = () => {
      setGameState(0);
      setCount(1);
      setRound(count);
    }


    return (
    <div>
        {allGames.map((gamesForSession, i) => {
            const timeSpent = gamesForSession.reduce((total,game) => total + game.timeSpentMillis, 0);
                    return (
                        <div className="expressions-history" key={i}>
                            <h4>Game {i+1}</h4> 
                            {gamesForSession.map((game, i) => 
                            <Expressions {...game} key={`game_in_session_${i}`} />
                            )}
                            <p id="time_spent">you spent {timeSpent} ms. </p>
                        </div>
                    );
                })}
     <p id="game_over">Game Over,</p>
        <button onClick={startNewGame}>New Game</button>
    </div>
  );
        }