import { React, useState, useReducer } from 'react';
import { StartScreen } from './components/StartScreen';
import { PlayScreen } from './components/PlayScreen';
import { EndScreen } from './components/EndScreen';
import { Expressions } from './components/Expressions';
import {
    reducer, 
    selectRounds,
    changeGameState,
    startTime,
    init
} from "./reducermodule/reducer"

export const App = (props) => {
    const [count, setCount] = useState(1);
    // const [display, setDisplay] = useState([]);
    const [allGames, setAllGames] = useState([]);
    const [state, dispatch] = useReducer(reducer, undefined, init)
    const [currentGame, setCurrentGame] = useState({});
    const setRound = (round) => dispatch(selectRounds(round));
    const setGameState = (gameState) => dispatch(changeGameState(gameState));
    // const setTime = () => dispatch(startTime());
    

    console.log("All games", allGames);
    // const goToNextScreen = () => {
    //     setGameState((prevState) => prevState + 1)
    // };

    return (
        <div>
            {state.gameState === 0 && (
                <StartScreen 
                    allGames={allGames}
                    setGameState={setGameState} 
                    round={state.round} 
                    setRound={setRound} 
                    // setTime={setTime}
                    setCurrentGame={setCurrentGame}
                />
            )}

            {state.gameState === 1 && (
                <PlayScreen 
                    count = {count}
                    setCount = {setCount}
                    // round={state.round}
                    setGameState={setGameState}
                    currentGame={currentGame}
                    setCurrentGame={setCurrentGame}   
                    setAllGames={setAllGames}
                />
            )}
        
            {state.gameState === 2 && (
                <EndScreen
                    count = {count}
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