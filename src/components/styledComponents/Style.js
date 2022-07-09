import styled from "styled-components";

export const Style = styled.div`
    background-color: white;
    color: ${props => props.speed <= 3 ? "green" : "orange"};
    // color: ${props => props.actualAnswer == props.ans? "red" : ""}   
`;