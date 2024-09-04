import styled, { DefaultTheme, keyframes } from 'styled-components';

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

interface ITagProps {
    color?: string
}

interface IContainerProps {
    backgroundColor?: keyof DefaultTheme['colors']
}

export const Container = styled.li<IContainerProps> `
    background-color: ${(props) =>
        props.backgroundColor
        ? props.theme.colors[props.backgroundColor]
        : props.theme.colors.tertiary};
    list-style: none;
    border-radius: 10px;
    padding: 12px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    transition: all .3s;
    position: relative;
    animation: ${animate} .5s ease;

    &:hover {
        opacity: .7;
        transform: translateX(10px);
    }

    > div {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-left: 10px;
    }

    > div span {
        font-size: 18px;
        font-weight: 500;
    }
`;

export const Tag = styled.div<ITagProps> `
    width: 10px;
    height: 60%;
    border-radius: 0 5px 5px 0;
    background-color: ${props => props.color || 'transparent'};
    position: absolute;
    left: 0;
`;