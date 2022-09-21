export const init = () => ({
    round: 3,
    gameState: 0,
    count: 1,
    allGames:[],
    currentGame:{},
    name: "",
    connecting: false,
    connected: false,
    connectionError: null,
    id: null,
    webSocketConnection: null,
    data: [],
});

const messageReceived = (state, parsedMessage) => {
    if (parsedMessage.eventName === 'online-players') {
        return {
            ...state,
            data: parsedMessage.payload
        };
    } else {
        return {
            ...state,
            playerId: parsedMessage.payload.playerId
        };
    }
};

const updateAllGames = (state, gamesForSession) => ({
    ...state,
    allGames: [...state.allGames, gamesForSession],
})

export const reducer = (state, action) => {
    switch (action.type) {
        case "selectRounds":
            return {...state, round: action.payload};
        case "changeGameState":
            return  {...state, gameState: action.payload};
        case "changeCount":
            return {...state, count: state.count + 1 };
        case "changeName":
            return {...state, name: action.payload};
        case "changeAllGames": 
            return updateAllGames(state, action.payload);
        case "updateCurrentGame":
            return {...state, currentGame: action.payload};
        case "CONNECTING":
            return {
                ...state,
                connecting: true,
                connected: false,
                webSocketConnection: action.payload,
                connectionError: null
            };
        case "CONNECTED":
            return {
                ...state, 
                connecting: false, 
                connected: true,
                connectionError: null
            };
        case "DISCONNECTED":
            return {...state, connecting: false, connected: false, connectionError: action.payload};
        case "MESSAGE_RECEIVED":
            return messageReceived(state, action.payload);
        default:
            throw new Error("Invalid reducers reducer usage");
    }
}; 


export const selectRounds = (newRound) => ({
    type: "selectRounds",
    payload: newRound
});

export const changeGameState = (newGameState) => ({
    type: "changeGameState",
    payload: newGameState
});

export const changeCount = (newCount) => ({
    type: "changeCount",
    payload: newCount
})

export const changeName = (name) => ({
    type: "changeName",
    payload: name
});
export const changeAllGames = (gamesForSession) => ({
    type: "changeAllGames",
    payload: gamesForSession
});

export const updateCurrentGame = (currentGame) => ({
    type: "updateCurrentGame",
    payload: currentGame
});

export const onWebsocketOpen = () => ({
    type: "CONNECTED",
    payload: null
});

 export const onWebsocketConnecting = (websocketConnection) => ({
    type: "CONNECTING",
    payload: websocketConnection
});

 export const onWebsocketMessage = (parsedMessage) => ({
    type: "MESSAGE_RECEIVED",
    payload: parsedMessage
});
// note that reason is an object of format {reason: string}
export const onWebsocketClose = ( reason ) => ({
    type: "DISCONNECTED",
    payload: reason
});



