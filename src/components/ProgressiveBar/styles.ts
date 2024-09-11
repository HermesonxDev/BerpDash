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

export const Container = styled.div`
    width: 49%;
    min-height: 100px;
    margin: 10px 0;
    background-color: ${props => props.theme.colors.tertiary};
    color: ${props => props.theme.colors.white};
    border-radius: 7px;
    display: flex;
    flex-direction: column;
    padding: 15px 10px;
    animation: ${animate} .5s;
    
    /* --> MEDIA QUERY DO MOBILE <-- */
    @media(max-width: 1200px) {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: auto;
    }
`;

export const HeaderRow = styled.div`
    height: 15%;
`;

export const MainRow = styled.div`
    height: 65%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 20px;

    > h2 {
        display: flex;
        justify-content: center;
    }
`;


export const FooterRow = styled.div`
    height: 20%;
    display: flex;
    flex-direction: column;

    > h2 {
        font-size: 30px;
    }

    > h2, p {
        display: flex;
        justify-content: center;
    }
`;
