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
    min-height: 350px;
    margin: 10px 0;
    padding: 15px 10px;
    background-color: ${props => props.theme.colors.tertiary};
    color: ${props => props.theme.colors.white};
    border-radius: 7px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    animation: ${animate} .5s;
    
    /* --> MEDIA QUERY DO MOBILE <-- */
    @media(max-width: 1200px) {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: auto;
    }

    /*
    * --> MEDIA QUERY CELULAR
    *      Dispositivo usado: iPhone X (375x812)
    */
    @media(max-width: 420px) {
        min-height: 330px;
    }
`;

export const HeaderRow = styled.div`
    margin-bottom: 15px;
    height: 20%;
`;

export const MainRow = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    height: 40%;

    > h2 {
        font-size: 35px;
        display: flex;
        justify-content: center;
    }

    > p {
        display: flex;
        justify-content: center;
    }

    /*
    * --> MEDIA QUERY CELULAR
    *      Dispositivo usado: iPhone X (375x812)
    */
    @media(max-width: 420px) {
        > h2 {
            font-size: 26px;
        }
    }
`;

export const FooterRow = styled.div`
    height: 40%;
    display: flex;
    justify-content: center;
    gap: 5px;
    overflow: hidden;

    > div {
        height: 90%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 15px 5px;
        border: 1px solid ${props => props.theme.colors.gray};
        border-radius: 5px;

        > h3 {
            font-size: 18px;
            display: flex;
            justify-content: center;
        }

        > p {
            display: flex;
            justify-content: center;
            hyphens: auto;
        }
    }

    /*
    * --> MEDIA QUERY CELULAR
    *      Dispositivo usado: iPhone X (375x812)
    */
    @media(max-width: 420px) {
        flex-direction: row;
        justify-content: unset;
        overflow: scroll;

        > div {
            height: 70%;
            padding: 10px 5px;

            > p {
                font-size: 14px;
            }
        }

        &::-webkit-scrollbar {
            width: 0.5px;
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
    }
`;
