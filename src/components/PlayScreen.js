import React from "react"
import { useState } from "react";




export const PlayScreen = (props) => {
    const [question, setQuestion] = useState(generateQuestion());
    const [ans, setAns] = useState('');
    const [count, setCount] = useState(1);
    const {round, setGameState} = props;

    function generateNumber(max) {
      return Math.floor(Math.random() * (max))
    }

    function generateQuestion() {
      return {
       int1: generateNumber(10),
       int2: generateNumber(10),
       operator: ["+", "x"][generateNumber(1)]
      }
    }


    const submit = (e) => {
        e.preventDefault();

        let actualAnswer
        if (question.operator == "+")
          actualAnswer = question.int1 + question.int2
        if (question.operator == "x")
          actualAnswer = question.int1 * question.int2

        if (actualAnswer == ans && count < round) {
            setAns('');
            setCount((count) => count + 1);
            setQuestion(generateQuestion());
        } else if (actualAnswer == ans && count == round) { 
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
              <h2>{question.int1} {question.operator}  {question.int2}</h2>
              <input value={ans} onChange={handleChange} />
              <button type="submit">Play</button> 
        </form> 
        <p>{count}</p>
        <button id="start" type="button" onClick={handleClick}>Home</button>
        </div>
    )
    
}
