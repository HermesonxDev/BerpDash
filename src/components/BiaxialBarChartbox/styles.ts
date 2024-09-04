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
    min-height: 260px;
    margin: 10px 0;
    background-color: ${props => props.theme.colors.tertiary};
    color: ${props => props.theme.colors.white};
    border-radius: 7px;
    display: flex;
    animation: ${animate} .5s;
    
    /* --> MEDIA QUERY DO MOBILE <-- */
    @media(max-width: 1200px) {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: auto;
    }
`;

export const HeaderRow = styled.div``;

export const MainRow = styled.div``;

export const FooterRow = styled.div``;