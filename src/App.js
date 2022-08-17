import { React, useState, useReducer } from 'react';
import { StartScreen } from './screenComponents/StartScreen';
import { PlayScreen } from './screenComponents/PlayScreen';
import { EndScreen } from './screenComponents/EndScreen';

import {
    reducer, 
    selectRounds,
    changeGameState,
    init,
    changeCount,
    changeName,
    onOpen as open,
    onConnecting as connecting,
    onMessage as message,
    onClose as onclose,
    deleteFromOngoing as deleteOngoing
} from "./reducermodule/appReducer"

export const App = (props) => {
    const [allGames, setAllGames] = useState([]);
    const [state, dispatch] = useReducer(reducer, undefined, init)
    const [currentGame, setCurrentGame] = useState({});
    const setRound = (round) => dispatch(selectRounds(round));
    const setGameState = (gameState) => dispatch(changeGameState(gameState));
    const setCount = (newCount) => dispatch(changeCount(newCount));
    const setName = (name) => dispatch(changeName(name));
    const onOpen = () => dispatch(open());
    const onConnecting = (websocketconnection) => dispatch(connecting(websocketconnection));
    const onMessage = (parsedMessage) => dispatch(message(parsedMessage));
    const onClose = (reason) => dispatch(onclose(reason))

    return (
        <div>
            {state.gameState === 0 && (
                <StartScreen 
                    allGames={allGames}
                    setGameState={setGameState} 
                    round={state.round} 
                    setRound={setRound} 
                    setCurrentGame={setCurrentGame}
                    name={state.name}
                    setName={setName}
                />
            )}

            {state.gameState === 1 && (
                <PlayScreen 
                    count = {state.count}
                    setCount = {setCount}
                    name = {state.name}
                    // round={state.round}
                    setGameState={setGameState}
                    currentGame={currentGame}
                    setCurrentGame={setCurrentGame}   
                    setAllGames={setAllGames}
                    onOpen={onOpen}
                    onClose={onClose}
                    onConnecting={onConnecting}
                    onMessage={onMessage}
                    // connectWebSocket = {props.connectWebSocket}
                    state={state}
                />
            )}
        
            {state.gameState === 2 && (
                <EndScreen
                    name = {state.name}
                    count = {state.count}
                    setCount = {setCount} 
                    setRound = {setRound}
                    setGameState={setGameState}  
                    allGames={allGames} 
                    setAllGames={setAllGames}
                />
            )}
        </div>
    );
};