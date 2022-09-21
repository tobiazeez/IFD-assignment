import { React, useState, useReducer,useContext } from 'react';
import { StartScreen } from './screenComponents/StartScreen';
import { PlayScreen } from './screenComponents/PlayScreen';
import { EndScreen } from './screenComponents/EndScreen';
import { useGlobalState } from "./StateContext";

export const StateApp = (props) => {
    const stateManager = useGlobalState();
    const { state} = stateManager;

    return (
        <div>
            {state.gameState === 0 && (<StartScreen />)}

            {state.gameState === 1 && (<PlayScreen />)}
        
            {state.gameState === 2 && (<EndScreen />)}
        </div>
    );
};