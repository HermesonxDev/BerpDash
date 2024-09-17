import styled, { keyframes } from 'styled-components';

const animate = keyframes`
    0% {
        transform: translateY(-100px);
        opacity: 0;
    }

    50% {
        opacity: .3;
    }

    100% {
        transform: translateY(0px);
        opacity: 1;
    }
`;

interface ILegendProps {
    color: string
}

export const Container = styled.div `
    width: 100%;
    height: 360px;
    display: flex;
    flex-direction: column;
    background-color: ${props => props.theme.colors.tertiary};
    color: ${props => props.theme.colors.white};
    margin: 10px 0;
    padding: 30px 20px;
    border-radius: 7px;
    animation: ${animate} .5s;
`;

export const ChartContainer = styled.div `
    flex: 1;
`;

export const ChartHeader = styled.header `
    width: 100%;
    display: flex;
    justify-content: space-between;

    > h2 {
        margin-bottom: 20px;
        padding-left: 16px;
    }

    /*
    * --> MEDIA QUERY PC
    *      Dispositivo usado: Laptop (1280x950)
    */
    @media(max-width: 1200px) {
        flex-direction: column;
    }
`;

export const LegendContainer = styled.ul `
    list-style: none;
    padding-right: 20px;
    display: flex;
`;

export const Legend = styled.li<ILegendProps> `
    display: flex;
    align-items: center;
    margin-bottom: 7px;
    margin-left: 16px;

    > div {
        font-size: 14px;
        text-align: center;
        width: 30px;
        height: 30px;
        background-color: ${props => props.color};
        border-radius: 5px;
        line-height: 40px;
    }

    > span {
        margin-left: 5px;
    }

    /*
    * --> MEDIA QUERY PC
    *      Dispositivo usado: Laptop (1280x950)
    */
    @media(max-width: 1280px) {
        > div {
            width: 30px;
            height: 30px;
        }
    }
`;
