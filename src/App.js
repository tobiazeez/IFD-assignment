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
    const [display, setDisplay] = useState([]);
    const [allGames, setAllGames] = useState([]);
    const [state, dispatch] = useReducer(reducer, undefined, init)
    const setRound = (round) => dispatch(selectRounds(round));
    const setGameState = (gameState) => dispatch(changeGameState(gameState));
    const setTime = () => dispatch(startTime());

    // const goToNextScreen = () => {
    //     setGameState((prevState) => prevState + 1)
    // };

    return (
        <div>
             {state.gameState === 2 && allGames.map((game, i) => {
                        return (
                        <div className="expressions-history">
                            <h4>Game {i+1}</h4> 
                            {
                                game.map((question)=>(
                                    <Expressions {...question} />
                                ))}
                        </div>
                        );
             }) }
             
            <div className='expressions-display'> 
                    {display.map((question) => {
                        return (
                        <div key={question.int1}>
                        <Expressions {...question}/>
                    </div> 
                     
                    )})}
            </div>
            {state.gameState === 0 && <StartScreen setGameState = {setGameState} round = {state.round} setRound = {setRound} setTime = {setTime}/>}

            {state.gameState === 1 && <PlayScreen setGameState = {setGameState}  count = {count} setCount = {setCount} round = {state.round} setRound = {setRound} display={display} setDisplay={setDisplay}/>}
        
            {state.gameState === 2 && <EndScreen setGameState = {setGameState}  count = {count} setCount = {setCount} time = {state.time}  setTime={setTime} round = {state.round} setRound = {setRound} display = {display} setDisplay = {setDisplay} allGames = {allGames} setAllGames = {setAllGames}/>}

        </div>
    );
    

};