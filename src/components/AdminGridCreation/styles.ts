import styled from "styled-components";

export const Container = styled.div ``;

export const Form = styled.form `
    width: 100%;
    height: 100%;
    padding: 30px;
    border-radius: 10px;
    background-color: ${props => props.theme.colors.tertiary};
`;

export const FormTitle = styled.h1 `
    margin-bottom: 40px;
    color: ${props => props.theme.colors.white};
    
    &:after {
        content: '';
        display: block;
        width: 55px;
        border-bottom: 10px solid ${props => props.theme.colors.warning};
    }
`;

export const FormDiv = styled.div `
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;