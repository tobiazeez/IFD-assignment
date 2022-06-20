import React from 'react'


export function EndScreen() {

  return (
    <div>
     <p id="game_over">Game Over,</p>
        <p id="time_spent">you spent {Date.now()} ms. </p>;
    </div>
  )
}
