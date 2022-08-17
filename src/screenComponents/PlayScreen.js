import React from "react"
import {useState, useEffect} from "react";
import { connect as defaultConnectWebSocket} from "../WebSocket";
 

export const PlayScreen = (props) => {
    const { count, setCount, setGameState, currentGame, setCurrentGame, setAllGames, name, state, onOpen, onClose, onConnecting, onMessage, } = props;
    const connectWebSocket = props.connectWebSocket || defaultConnectWebSocket;

    useEffect(() => {
      const websocketconnection = 
      (connectWebSocket)({onOpen, onClose, onMessage, parameters: {playerName: name}});
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
        if (ans.length === nextExpression.correctAnswerLength){
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
        setGameState(0)
      }

      const handleChange = (e) => {
        setAns(e.target.value)
      }
      
      const handleDisconnect = async () => {  
       
        state.webSocketConnection.close();
       
        // deleteFromOngoing(state.id);
    };
    
    return (
      <div className="gameplay">
           {!state.connectionError ? <button onClick = {handleDisconnect}>
                 { state.connecting ? <span>connecting...</span> : <span>disconnect</span> }
             </button> : connectionError.reason === 'player-name-taken'? <span>Player Name Taken</span> : null}
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
       </div>
   )
   
}