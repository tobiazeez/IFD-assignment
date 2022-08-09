import styled from "styled-components";

export const Style = styled.div`
    background-color: white;
       color: ${(props) => {
        const { speed, correct } = props;
        let textColor = "";
        if (correct) {
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
`