export const init = () => ({
    round: 3,
    gameState: 0,
    count: 1,
    // allGames:[]
    name: "",
    connecting: false,
    connected: false,
    connectionError: null,
    id: null,
    webSocketConnection: null,
    data: []
});

const messageReceived = (state, parsedMessage) => {
    // parsed message is an object of the format {eventName: String, payload: Object}
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
// const deleteOngoing = (state, gameId) => {
//     const current = state.ongoing;
//     delete current[gameId];
//     return {
//         ...state, 
//         ongoing: current
//     };
// };

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
            return {
                ...state,
                connecting: false,
                connected: false,
                connectionError: action.payload.reason,
            };
        case "MESSAGE_RECEIVED":
            return messageReceived(state, action.payload);
        case "deleteFromOngoing":
                return deleteOngoing(state, action.payload);
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

export const onOpen = () => ({
    type: "CONNECTED",
    payload: null
});

 export const onConnecting = (websocketConnection) => ({
    type: "CONNECTING",
    payload: websocketConnection
});

 export const onMessage = (parsedMessage) => ({
    type: "MESSAGE_RECEIVED",
    payload: parsedMessage
});
// note that reason is an object of format {reason: string}
export const onClose = (reason) => ({
    type: "DISCONNECTED",
    payload: reason
});

 export const deleteFromOngoing = (gameId) => ({
    type: "deleteFromOngoing",
    payload: gameId
});

