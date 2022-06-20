import React from 'react'




export function StartScreen(props) {
    const {round, setRound, setGameState} = props;

    const handleChange = ({ target })=> {
        const newRound = target.value;
        const isValid = newRound >= 1 && newRound <= 20;
        if (isValid) {
          setRound(newRound);
        }
        // just ignore the event, when new value is invalid
       };

       const handleClick = () => {
        setGameState(1)
       }

  return (
    <div>
     <h1>Hi, this is Tobi's math game, choose your parameters and get to calculating!</h1>
     <div className='rounds'>
         <label>Select number of rounds:</label>
          <input value={round} onChange={handleChange} type='number' id='rounds-input' />
          <button id="start" type="button" onClick={handleClick}>
            Start Game 
          </button> 
        </div>
    </div>
  )
}

