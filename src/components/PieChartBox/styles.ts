import styled, { keyframes } from 'styled-components';

const animate = keyframes`
    0% {
        transform: translateX(100px);
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
    width: 49%;
    height: 800px;
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
    * --> MEDIA QUERY TABLET
    *      Dispositivo usado: iPad (768x1024)
    */
    @media(max-width: 770px) {
        display: flex;
        width: 100%;
    }

    /*
    * --> MEDIA QUERY CELULAR
    *      Dispositivo usado: iPhone X (375x812)
    */
    @media(max-width: 420px) {
        height: 600px;
        gap: 15px;
    }
`;

export const HeaderRow = styled.div `
    display: flex;
    flex-direction: row;
    height: 60%;
`;

export const SideLeft = styled.aside `

`;

export const SideRight = styled.main `
    display: flex;
    flex: 1;
    justify-content: center;
    
    /*
    * --> MEDIA QUERY PC
    *      Dispositivo usado: Laptop (1280x950)
    */
    @media(max-width: 1345px) {
        height: 100%;
    }
`;

export const LegendContainer = styled.ul `
    list-style: none;
    height: 80%;
    overflow: scroll;

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

    /*
    * --> MEDIA QUERY PC
    *      Dispositivo usado: Laptop (1280x950)
    */
    @media(max-width: 1345px) {
        display: flex;
        flex-direction: column;
    }
`;

export const Legend = styled.li<ILegendProps> `
    display: flex;
    align-items: center;

    > div {
        font-size: 13px;
        text-align: center;
        width: 40px;
        height: 40px;
        line-height: 40px;
        background-color: ${props => props.color};
        border-radius: 5px;
    }

    > span {
        margin-left: 5px;
    }

    
    /*
    * --> MEDIA QUERY PC
    *      Dispositivo usado: Laptop (1280x950)
    */
    @media(max-width: 1345px) {
        margin: 3px 0;

        > div {
            width: 35px;
            height: 35px;
            line-height: 35px;
        }

        > span {
            margin-left: 7px;
        }
    }

    /*
    * --> MEDIA QUERY CELULAR
    *      Dispositivo usado: iPhone X (375x812)
    */
    @media(max-width: 420px) {
        > div {
            width: 32px;
            height: 32px;
            line-height: 32px;
        }
    }
`;

export const Controllers = styled.div `
    display: flex;
    flex-direction: row;
    gap: 10px;

    > button {
        border: 1px solid ${props => props.theme.colors.white};
    }

    .tag-deactivate {
        opacity: 0.7;
        border: unset;
    }
`;

export const FooterRow = styled.div `
    overflow: scroll;

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
`;

export const Descriptions = styled.div `
    display: flex;
    flex-direction: column;
    gap: 5px;
`;