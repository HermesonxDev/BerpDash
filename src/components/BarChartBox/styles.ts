import styled, { keyframes } from 'styled-components';

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
interface ILegendProps {
    color: string
}

export const Container = styled.div `
    width: 48%;
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

export const SideLeft = styled.aside `
    flex: 1;
    padding: 30px 20px;

    > h2 {
        padding-left: 16px;
        margin-bottom: 10px;
    }
`;

export const LegendContainer = styled.ul `
    list-style: none;
    height: 175px;
    padding-right: 15px;
    overflow: scroll;

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
    @media(max-width: 1200px) {
        height: auto;
        display: flex;
    }
`;

export const Legend = styled.li<ILegendProps> `
    display: flex;
    align-items: center;
    padding-left: 16px;
    margin-bottom: 7px;

    > div {
        font-size: 14px;
        text-align: center;
        width: 40px;
        height: 40px;
        background-color: ${props => props.color};
        border-radius: 5px;
        line-height: 40px;
    }

    > span {
        margin-left: 5px;
    }

    /* --> MEDIA QUERY DO MOBILE <-- */
    @media(max-width: 1200px) {
        > div {
            font-size: 10px;
            width: 30px;
            height: 30px;
            line-height: 30px;
        }
    }
`;

export const SideRight = styled.main `
    flex: 1;
    min-height: 150px;
    display: flex;
    justify-content: center;
    padding-top: 35px;
`;