import {Style} from "../styledComponents/Style";
export const Expressions = (props) => {
    const { correct, timeSpentMillis, nextExpression, ans } = props;

    const { lhs, rhs, operator } = nextExpression;
    const speed = Math.round(timeSpentMillis/1000);
    return (
        <div>
        <Style correct={correct} speed={speed}> 
            <p>{lhs} {operator} {rhs} = {ans} [{timeSpentMillis}]</p>
        </Style>
        </div> 
    );

};