import Mathemagician from "game_lobby_server/src/games/Mathemagician";
import React from "react"
import { useState, useEffect } from "react";

export const PlayScreen = (props) => {
    const {count, setCount, round, setGameState, display, setDisplay} = props;

    const [operator, setOperator] = useState(null);
    const [int1, setInt1] = useState(null);
    const [int2, setInt2] = useState(null);
    const [ans, setAns] = useState('');
    const [skipCount, setSkipCount] = useState(0);
    const time = Date.now();

    useEffect(() => generateQuestion(), []);
    const generateQuestion = () => {

      const operators = ["+", "-", "x","/"]
      const noOfOperators = operators.length
      const operatorindex = [Math.floor(Math.random() * (noOfOperators - 1))]

    setOperator(operators[operatorindex]);
    setInt1(Math.floor(Math.random() * 20));
    setInt2(Math.floor(Math.random() * 20));
}

      const handleSkip = () => {
        setSkipCount((skipCount) => skipCount + 1);
        setCount((count) => count + 1);
        generateQuestion();
        if (count == round){
          setGameState(2); 
        }
      }

    const playGame = async (e) => {
        e.preventDefault();

          console.log('started'); 
          await fetch("http://localhost:8081/games/gameId/moves", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            // id: 
            guess: "skip"
          })
        })
        .then((res) => res.json())
        .then((data) => 
          console.log("Data", data)
        )
        .catch((error) => {
          console.log("error")
        })
        
    
       //  const handleSubmit = () => {
            // setGameState(1);
            // setTime(Date.now());
            // setIsLoading(false);
          
           

        // let actualAnswer
        // if (operator == "+")
        //   actualAnswer = int1 + int2
        // if (operator == "-")
        //   actualAnswer = int1 - int2
        // if (operator == "x")
        //   actualAnswer = int1 * int2
        // if (operator == "/")
        //   actualAnswer = int1 / int2 

        //   if (actualAnswer.toString().length === ans.toString().length) {
        //     if(count < round){
        //       setDisplay(() => [...display, {
        //         int1: int1,
        //         int2: int2,
        //         actualAnswer: actualAnswer,
        //         operator: operator,
        //         ans: ans,
        //         timeTaken: Date.now()-time,
        //         speed: Math.round((Date.now()-time)/1000)
        //     }]);
        //       setAns('');
        //       setCount((count) => count + 1);
        //       generateQuestion();
        //   }else if (count == round) {
        //   setDisplay(() => [...display, {
        //       int1: int1,
        //       int2: int2,
        //       actualAnswer: actualAnswer,
        //       operator: operator,
        //       ans: ans,
        //       timeTaken: Date.now()-time,
        //       speed: Math.round((Date.now()-time)/1000)
        //   }]);
          setGameState(2);
      }
    
      ;

      const goHome = () => {
        setGameState(0)
      }

      const handleChange = (e) => {
        setAns(e.target.value)
      }

    return (
        <div className="gameplay">
       <form onSubmit={playGame}>
              <h2>{int1} {operator} {int2}</h2>
              <input autoFocus value={ans} onChange={handleChange}/>
              <button type="submit">Play</button> <br></br> 
              {skipCount < Math.floor(round / 3) ? <button onClick={handleSkip}>Skip</button> : ''}
              
              
        </form> 
        <p>Rounds:{count}</p>
        <button id="start" type="button" onClick={goHome}>Home</button>
        </div>
    )
    
}
