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
    min-height: 700px;
    margin: 10px 0;
    background-color: ${props => props.theme.colors.tertiary};
    color: ${props => props.theme.colors.white};
    border-radius: 7px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 15px 10px;
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
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const TotalRow = styled.div`
    background-color: ${props => props.theme.colors.secondary};
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 10px 10px;
    border-radius: 10px;

    > h2 {
        font-size: 25px;
        margin: auto 0;
    }

    /*
    * --> MEDIA QUERY CELULAR
    *      Dispositivos usados:
    *           iPhone 6/7/8 Plus (414x736)
    */
    @media(max-width: 420px) {
        flex-direction: column;

        > h2 {
            font-size: 23px;
            display: flex;
            justify-content: center;
            margin-top: 5px;
        }
    }
`;

export const Filters = styled.div `
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 10px;
    overflow: scroll;

    .tag-filter {
        font-size: 20px;
        font-weight: 500;
        background: none;
        color: ${props => props.theme.colors.white};
        margin: 0 10px;
        opacity: .3;
        transition: opacity .3s;

        &:hover {
            opacity: .7;
        }
    }

    .tag-filter-recurrent::after {
        content: '';
        display: block;
        width: 55px;
        margin: 0 auto;
        border-bottom: 10px solid ${props => props.theme.colors.success};
    }

    .tag-filter-eventual::after {
        content: '';
        display: block;
        width: 55px;
        margin: 0 auto;
        border-bottom: 10px solid ${props => props.theme.colors.warning};
    }

    .tag-actived {
        opacity: 1;
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

export const MainRow = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    
    > h3 {
        display: flex;
        justify-content: center;
        padding: 12px 10px;
        border-radius: 10px;
        background-color: ${props => props.theme.colors.tertiary};
    }
`;
