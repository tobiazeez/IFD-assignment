import React from "react"
import { useState, useEffect } from "react";

export const PlayScreen = (props) => {
    const {round, setGameState, display, setDisplay} = props;

    const [operator, setOperator] = useState(null);
    const [int1, setInt1] = useState(null);
    const [int2, setInt2] = useState(null);
    const [ans, setAns] = useState('');
    const [count, setCount] = useState(1);
    const [skipCount, setSkipCount] = useState(0);
    const time = Date.now();

    useEffect(() => generateQuestion(), []);
    const generateQuestion = () => {
    setOperator(["+", "-", "x","/"][Math.floor(Math.random() * 3)]);
    setInt1(Math.floor(Math.random() * 20));
    setInt2(Math.floor(Math.random() * 20));
}

      const handleSkip = () => {
        setSkipCount((skipCount) => skipCount + 1);
        setCount((count) => count + 1);
        generateQuestion();
      }

    const submit = (e) => {
        e.preventDefault();

        let actualAnswer
        if (operator == "+")
          actualAnswer = int1 + int2
        if (operator == "-")
          actualAnswer = int1 - int2
        if (operator == "x")
          actualAnswer = int1 * int2
        if (operator == "/")
          actualAnswer = int1 / int2 

          if (actualAnswer.toString().length === ans.toString().length && count < round) {
            setDisplay(() => [...display, {
              int1: int1,
              int2: int2,
              actualAnswer: actualAnswer,
              operator: operator,
              ans: ans,
              timeTaken: Date.now()-time,
              speed: Math.round((Date.now()-time)/1000)
          }]);
            setAns('');
            setCount((count) => count + 1);
            generateQuestion();
        } else if (actualAnswer.toString().length === ans.toString().length && count == round) {
          setDisplay(() => [...display, {
              int1: int1,
              int2: int2,
              actualAnswer: actualAnswer,
              operator: operator,
              ans: ans,
              timeTaken: Date.now()-time,
              speed: Math.round((Date.now()-time)/1000)
          }]);
          setGameState(2);
      }
      };
      const handleClick = () => {
        setGameState(0)
      }

      const handleChange = (e) => {
        setAns(e.target.value)
      }

    return (
        <div className="gameplay">
       <form onSubmit={submit}>
              <h2>{int1} {operator} {int2}</h2>
              <input value={ans} onChange={handleChange} />
              <button type="submit">Play</button> <br></br> 
              {skipCount < Math.floor(round / 3) ? <button onClick={handleSkip}>Skip</button> : ''}
              
              
        </form> 
        <p>{count}</p>
        <button id="start" type="button" onClick={handleClick}>Home</button>
        </div>
    )
    
}
