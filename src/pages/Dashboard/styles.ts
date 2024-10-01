import styled from "styled-components";

export const Container = styled.div `
    
`;

export const Content = styled.div `
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    > h3 {
        width: 100%;
        display: flex;
        justify-content: center;
        padding: 12px 10px;
        border-radius: 10px;
        background-color: ${props => props.theme.colors.tertiary};
    }
`;