import styled from "styled-components";

export const Container = styled.div `
    grid-area: CT;
    color: ${props => props.theme.colors.white};
    background: ${props => props.theme.colors.primary};
    padding: 25px;
    height: calc(100vh - 70px);
    overflow-y: scroll;

    &::-webkit-scrollbar {
        width: 10px;
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

    /* --> MEDIA QUERY DO MOBILE <-- */
    @media(max-width: 400px) {
        padding-top: 0;
    }
`;