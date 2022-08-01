import {Style} from "../styledComponents/Style";
export const Expressions = (props) => {
    const { int1, int2, operator, ans, timeTaken, actualAnswer, speed } = props;
    return (
        <div>
        <Style actualAnswer={actualAnswer} ans={ans} speed={speed}> 
            <p>{int1} {operator} {int2} = {ans} [{timeTaken}]</p>
        </Style>
        </div> 
    );

};