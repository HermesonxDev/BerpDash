import styled, { keyframes } from "styled-components";

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
    width: 49%;
    min-height: 800px;
    margin: 10px 0;
    padding: 15px 10px;
    background-color: ${props => props.theme.colors.tertiary};
    color: ${props => props.theme.colors.white};
    border-radius: 7px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    animation: ${animate} .5s;
    
    /*
    * --> MEDIA QUERY PC
    *      Dispositivo usado: Laptop (1280x950)
    */
    @media(max-width: 1200px) {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: auto;
    }
`;

export const HeaderRow = styled.div`
    height: 10%;
`;

export const MainRow = styled.div`
    height: 73%;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const Controllers = styled.div `
    display: flex;
    flex-direction: row;
    gap: 10px;
    height: 7%;
    overflow: scroll;

    > button {
        border: 1px solid ${props => props.theme.colors.white};
    }

    .tag-deactivate {
        opacity: 0.7;
        border: unset;
    }


    &::-webkit-scrollbar {
        width: 0.5px;
        height: 0.5px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: ${props => props.theme.colors.secondary};
        border-radius: 10px;
    }

    &::-webkit-scrollbar-track {
        background-color: ${props => props.theme.colors.tertiary};
        border-radius: 10px;
    }

    &::-webkit-scrollbar-corner {
        background-color: none;
    }
`;

export const FooterRow = styled.div`
    margin-top: 5px;
    height: 10%;
`;