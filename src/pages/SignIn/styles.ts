import styled, { keyframes } from 'styled-components'

const animate = keyframes`
    0% {
        transform: translateX(-100px);
        opacity: 0;
    }

    50% {
        opacity: .3;
    }

    100% {
        transform: translateX(0px);
        opacity: 1;
    }
`;

export const Container = styled.div `
    height: 100vh;
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.theme.colors.primary};
`;

export const Logo = styled.div `
    display: flex;
    align-items: center;
    margin-bottom: 30px;

    > h2 {
        color: ${props => props.theme.colors.white};
        margin-left: 7px;
    }

    > img {
        width: 40px;
        height: 40px;
    }
`;

export const Form = styled.form `
    display: flex;
    flex-direction: column;
    width: 300px;
    height: 320px;
    padding: 30px;
    border-radius: 10px;
    background-color: ${props => props.theme.colors.tertiary};

    > p {
        font-size: 15px;
        margin-top: 20px;
        color: ${props => props.theme.colors.white};
        opacity: .9;
    }

    > p a {
        font-size: 15px;
        color: ${props => props.theme.colors.white}
    }

    > p a:hover {
        color: #0000EE;
        opacity: 1;
    }
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

export const Message = styled.h3 `
    margin-top: 30px;
    color: ${props => props.theme.colors.white};
    animation: ${animate} .5s;
`;