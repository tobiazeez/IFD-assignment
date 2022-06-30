import React from 'react'


export const EndScreen = (props) => {
    const timeSpent = Date.now() - props.time;

    return (
    <div>
     <p id="game_over">Game Over,</p>
        <p id="time_spent">you spent {timeSpent} ms. </p>
    </div>
  )
}
