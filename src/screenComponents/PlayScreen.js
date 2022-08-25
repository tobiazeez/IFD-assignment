import React from "react"
import {useState, useEffect, useContext} from "react";
import { connect as defaultConnectWebSocket} from "../WebSocket";
import { useGlobalState } from "../StateContext";
 

export const PlayScreen = (props) => {
    const {currentGame, setCurrentGame, setAllGames} = props;
    const stateManager = useGlobalState();
    const { onOpen, setName, setCount, setRound, onConnecting, onMessage, onClose, state, setGameState } = stateManager;
    const { count, name, connectionError } = state;

    const connectWebSocket = props.connectWebSocket || defaultConnectWebSocket;

    useEffect(() => {
      const websocketconnection = connectWebSocket({
        onOpen, 
        onClose, 
        onMessage,
        parameters: {playerName: name}
      });
      onConnecting(websocketconnection);
      return () => websocketconnection.close();
  }, []);

    const [gamesInSession, setGamesInSession] = useState([]); 
    const [ ans, setAns ] = useState("");
    const [checkingAnswer, setCheckingAnswer] = useState(false)

    const { nextExpression, skipsRemaining } = currentGame;
    const { lhs, rhs, operator } = nextExpression;

      const handleSkip = () => {
        calculateGame(true);
      };

      const playGame = (e) => {
        e.preventDefault();
        if (ans.length === nextExpression.correctAnswerLength ){
           calculateGame();
           setCheckingAnswer(true)
        }
      }


    const calculateGame = async (skip = false) => {
        const gameId = currentGame?.id;
          // console.log('started'); 
          await fetch(`http://localhost:8081/games/${gameId}/moves`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            guess: skip ? "skip" : ans,
          }),
        })
        .then((res) => res.json())
        .then((data) => {
          const { game, move } = data;

          const gameJustPlayed = {
            ...currentGame,
            ...move,
            ans: ans
          };

          setGamesInSession((allPrevGamesInSession) => [
            ...allPrevGamesInSession, {...gameJustPlayed}
          ]);

          const {nextExpression} = game;
         if(nextExpression) {
          setCurrentGame(game);
          setAns("");
          setCount((count) => count + 1);
          setCheckingAnswer(false)
         } else {
          setAllGames((allPrevGames) => [...allPrevGames, [...gamesInSession, gameJustPlayed]]);
          setGameState(2);
         }
        })
        .catch((error) => {
          console.log(error)
        })
      };

      const goHome = () => {
        setAllGames([])
        setCurrentGame([]);
        setGameState(0)
        setCount(1);
        setRound(count)
      }

      const handleChange = (e) => {
        setAns(e.target.value)
      }
      
      const handleDisconnect = async () => {  
        state.webSocketConnection.close();
        goHome();
        setName('');
        setCount(1);
        setRound(count);
    };
    
  return (
    <>
    {connectionError ? 
      <div>
    <span>Player Name Taken</span> 
    <button id="start" type="button" onClick={goHome}>Home</button>
    </div> :
    (
      <div className="gameplay">
        {!state.connectionError ? (
          <button onClick={handleDisconnect}>
            {state.connecting ? <span>connecting...</span> : <span>disconnect</span>}
             </button> 
         ) 
        // : connectionError.reason === 'player-name-taken' ? 
        //   (// <span>Player Name Taken</span>
        //   setGameState(0)
        //  
        : null}
       {console.log(state)}
       {state.data.map((key) => {
          return (
            <p>
              <span>{key.name}</span>
                { key.id === state.playerId ? <span>(you)</span> : null}
            </p>
          );
        })}
        <form onSubmit={playGame}>
             <h2>{lhs} {operator} {rhs}</h2>
             <input autoFocus value={ans} onChange={handleChange}/>
             <button type="submit"  disabled={checkingAnswer}>{checkingAnswer? "Checking":"Play"}</button> <br></br> 
            {Boolean(skipsRemaining) && <button onClick={handleSkip}>Skip</button>}   
        </form> 
       <p>Rounds:{count}</p>
       <button id="start" type="button" onClick={goHome}>Home</button>
       </div>)}
    </>
  )
}