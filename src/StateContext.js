import { createContext, useReducer, useContext } from "react";
//  import useReducerWithMiddleware from "./hooks/useReducerWithMiddleware";
//  import LoggingMiddleware from "./loggingMiddleware";
 import {
    reducer, 
    selectRounds,
    changeGameState,
    init,
    changeCount,
    changeName,
    onWebsocketOpen,
    onWebsocketClose,
    onWebsocketConnecting,
    onWebsocketMessage
} from "./reducermodule/appReducer"

 
  export const StateContext = createContext();
 export const useGlobalState = () => useContext(StateContext);

  export const StateProvider = ({ children}) => {
    const [state, dispatch] = useReducer(reducer, undefined, init)
    const setRound = (round) => dispatch(selectRounds(round));
    const setGameState = (gameState) => dispatch(changeGameState(gameState));
    const setCount = (newCount) => dispatch(changeCount(newCount));
    const setName = (name) => dispatch(changeName(name));
    const onOpen = () => dispatch(onWebsocketOpen());
    const onConnecting = (websocketconnection) => dispatch(onWebsocketConnecting(websocketconnection));
    const onMessage = (parsedMessage) => dispatch(onWebsocketMessage(parsedMessage));
    const onClose = (reason) => dispatch(onWebsocketClose(reason))

  const stateManager = {
     state, 
     setRound,
     setCount,
     setName,
     setGameState,
     onOpen,
     onConnecting,
     onMessage,
     onClose
  };

  return (
     <StateContext.Provider value = {stateManager}>
         { children }
     </StateContext.Provider>
 );

  };