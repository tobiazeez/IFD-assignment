import { React, useState } from 'react';
import { StartScreen } from './components/StartScreen';
import { PlayScreen } from './components/PlayScreen';
import { EndScreen } from './components/EndScreen';



export const App = () => {
    const [gameState, setGameState] = useState(0);
    const [round, setRound] = useState('3');
    const [time, setTime] = useState(Date.now());


    return (
        <div>
            {gameState === 0 && <StartScreen setGameState = {setGameState} round = {round} setRound = {setRound} setTime = {setTime}/>}

            {gameState === 1 && <PlayScreen setGameState = {setGameState} round = {round} setRound = {setRound}/>}
        
            {gameState === 2 && <EndScreen setGameState = {setGameState} time = {time}/>}
        </div>
    );
    

};
