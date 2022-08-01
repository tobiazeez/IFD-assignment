export const selectRounds = (newRound) => ({
    type: "selectRounds",
    payload: newRound
});

export const changeGameState = (newGameState) => ({
    type: "changeGameState",
    payload: newGameState
});

export const startTime = () => ({
    type: "startTime"
});

export const init = () => ({
    round: 3,
    gameState: 0,
    time: null,
});

const setRound = (state, newRound) => ({
    ...state, 
    round: newRound
});

const setGameState = (state, newGameState) => ({
    ...state,
    gameState: newGameState
});

const setTime = (state) => ({
    ...state,
    time: Date.now()
});

export const reducer = (state, action) => {
    switch (action.type) {
        case "selectRounds":
            return setRound(state, action.payload);
        case "changeGameState":
            return setGameState(state, action.payload);
        case "startTime":
            return setTime(state);
        default:
            throw new Error("Invalid reducers reducer usage");
    }
}; 
