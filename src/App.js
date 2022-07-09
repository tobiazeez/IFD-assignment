import { React, useState } from 'react';
import { StartScreen } from './components/StartScreen';
import { PlayScreen } from './components/PlayScreen';
import { EndScreen } from './components/EndScreen';
import { Expressions } from './components/Expressions';


export const App = (props) => {
    const [gameState, setGameState] = useState(0);
    const [round, setRound] = useState('3');
    const [time, setTime] = useState(null);
    const [display, setDisplay] = useState([]);
    // const questionsJsx = [];


    return (
        <div>
            <div className='expressions-display'>
                {/* {display.forEach((question, i) => (
                  setDisplay.push  questionsJsx.push( */}
                    {display.map((question, i) => (
                    <div key={question.int1 + question.int2}>
                        <Expressions int1={question.int1} int2={question.int2} actualAnswer={question.actualAnswer} timeTaken={question.timeTaken} ans={question.ans} operator={question.operator} speed={question.speed}/>
                    </div> 
                     
                ))}
            </div>
            {gameState === 0 && <StartScreen setGameState = {setGameState} round = {round} setRound = {setRound} setTime = {setTime}/>}

            {gameState === 1 && <PlayScreen setGameState = {setGameState} round = {round} setRound = {setRound} display={display} setDisplay={setDisplay}/>}
        
            {gameState === 2 && <EndScreen setGameState = {setGameState} time = {time}  setTime={setTime} round = {round} setRound = {setRound}/>}
        </div>
    );
    

};