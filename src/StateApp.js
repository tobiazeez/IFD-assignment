import { React, useState, useReducer,useContext } from 'react';
import { StartScreen } from './screenComponents/StartScreen';
import { PlayScreen } from './screenComponents/PlayScreen';
import { EndScreen } from './screenComponents/EndScreen';
import { useGlobalState } from "./StateContext";

export const StateApp = (props) => {
    const [allGames, setAllGames] = useState([]);
    const [currentGame, setCurrentGame] = useState({});
    const stateManager = useGlobalState();
    const { state} = stateManager;

    return (
        <div>
            {state.gameState === 0 && (
                <StartScreen 
                    allGames={allGames}
                    setCurrentGame={setCurrentGame}
                />
            )}

            {state.gameState === 1 && (
                <PlayScreen 
                    currentGame={currentGame}
                    setCurrentGame={setCurrentGame}   
                    setAllGames={setAllGames}
                />
            )}
        
            {state.gameState === 2 && (
                <EndScreen 
                    allGames={allGames} 
                    setAllGames={setAllGames}
                />
            )}
        </div>
    );
};