import React from 'react';


export const EndScreen = (props) => {
    const { time, setGameState, setRound,count } = props;
    const timeSpent = Date.now()-time;
  
    const handleClick = () => {
      setGameState(1)
      setAns('');
      setCount(1);
      setRound();
    }

    return (
    <div>
     <p id="game_over">Game Over,</p>
        <p id="time_spent">you spent {timeSpent} ms. </p>
        <button onClick={handleClick}>New Game</button> <br></br>
    </div>
  )
}
