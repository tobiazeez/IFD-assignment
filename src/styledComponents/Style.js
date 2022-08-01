import styled from "styled-components";

export const Style = styled.div`
    background-color: white;
       color: ${(props) => {
        const { speed, actualAnswer, ans } = props;
        let textColor = "";
        if (actualAnswer == ans) {
            if(speed < 3){
                textColor = "green";
            } else {
                textColor = "orange";
            }
        } else {
            textColor ="red";
        }
            return textColor;
       }};
`;