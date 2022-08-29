import React, { useEffect, useState } from 'react';
import { useGlobalState } from "../StateContext";

export function StartScreen(props) {
  const stateManager = useGlobalState();
  const { state, setRound, setGameState, setName } = stateManager;
  const { round, name, allGames } = state;

  const { setCurrentGame } = props;
  const [isLoading, setIsLoading] = useState(false)
  const [requestStatus, setRequestStatus] = useState("");

  const CONTAINS_GAMES = allGames.length > 0

  useEffect(() => {
    if(CONTAINS_GAMES){
      startGame()
    }
  }, [])

  const successful = requestStatus === "success";
  const failure = requestStatus === "error"

  const startGame = async (e) => { 
    setIsLoading(true);
      if (e) {
        e.preventDefault(); 
      }

      console.log('about to start'); 
      await fetch("http://localhost:8081/games ", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        type: "mathemagician",
        rounds: round
      })
    })
    .then((res) => res.json())
    .then((data) => {
      setRequestStatus("success");
      setCurrentGame(data)
      console.log("Data", data)
    })
    .catch((error) => {
      setRequestStatus("error");
      console.log("error.message")
    })
        setGameState(1);
        setIsLoading(false);
  }

    const handleChange = ({ target })=> {
        const newRound = target.value;
          setRound(newRound);
       };

    const handleNameChange=(e) =>{
        setName(e.target.value);
    };
     

  return (
    <>
    {CONTAINS_GAMES ? (<></>) :
    (
    <div>
      <h1>
        Hi, this is Tobi's math game,<br />
        choose your parameters and get to calculating!
      </h1>
      {requestStatus && (
        <div className={`feedback-message ${failure && "error"} ${successful && "success"}`}>
          <p>{successful && "Yay! you can now play your game"}</p>
          <p>{failure && "oopsies"}</p>
        </div>
      )}
     <div className='rounds'>
      <label>Name: </label>
        <input type="text" id="nameInput" value={name} onChange={handleNameChange}></input>
      <form onSubmit={startGame}>
         <label>Select number of rounds:</label>
          <input autoFocus value={round} onChange={handleChange} type='number' id='rounds-input' min="1" max="20" required/>
          <button id="start" type="submit" disabled={isLoading}>
           {isLoading ? "loading...":"Start Game"}
          </button> 
      </form>
        </div>
    </div>)}
  </>
  )
}
