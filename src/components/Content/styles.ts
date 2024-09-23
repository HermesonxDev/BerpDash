import styled from "styled-components";

export const Container = styled.div `
    grid-area: CT;
    color: ${props => props.theme.colors.white};
    background: ${props => props.theme.colors.primary};
    padding: 25px;
    height: calc(100vh - 70px);
    overflow-y: scroll;

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

    
    /*
    * --> MEDIA QUERY CELULAR
    *      Dispositivos usados:
    *           iPhone 6/7/8 Plus (414x736)
    */
    @media(max-width: 420px) {
        padding-top: 0;
    }
`;