import React from "react"
import { useState } from "react";




export const PlayScreen = (props) => {
    // console.log(props)
    const [int1, setInt1] = useState('');
    const [int2, setInt2] = useState('');
    const [sum, setSum] = useState('');
    const [count, setCount] = useState(1);
    const {round, setGameState} = props;


    const generateQuestion = () => {
       setInt1(Math.floor(Math.random() * 10));
       setInt2(Math.floor(Math.random() * 10));
    }


    const submit = (e) => {
        e.preventDefault();
        const formValid = sum >= 0;
        if (!formValid) {
          return;}
        
        if (+int1 + +int2 === +sum) {
          setCount((count) => count + 1);
        
          if (count == round) {
            setGameState(2)
          }
          setSum('');
          generateQuestion();
          
        }  
    }

      const handleClick = () => {
        setGameState(0)
      }
  
  
    return (
        <div className="gameplay">
       <form onSubmit={submit}>
              <h2>{`${int1} +  ${int2}`}</h2>
              <input value={sum} onChange={(e) => setSum(e.target.value)} />
              <button type="submit">Play</button> <br/>
              <button type="submit" onClick={generateQuestion}>Begin Game</button> 

        </form> 
        <button id="start" type="button" onClick={handleClick}>Home</button>
        </div>
    )
    
}