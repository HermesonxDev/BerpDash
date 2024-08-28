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

    /* --> MEDIA QUERY DO MOBILE <-- */
    @media(max-width: 770px) {
        margin-bottom: 20px;
    }

    /* --> MEDIA QUERY DO MOBILE <-- */
    @media(max-width: 400px) {
        font-size: 1.8rem;
    }
`;

export const FormDiv = styled.div `
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export const FormDivButton = styled.div `
    display: flex;
    flex-direction: row;
    gap: 10px;
    margin: 30px auto 0;
    width: 50%;

    /* --> MEDIA QUERY DO MOBILE <-- */
    @media(max-width: 770px) {
        width: auto;
    }
`;