import styled, { DefaultTheme } from 'styled-components';

interface ButtonProps {
    backgroundColor?: keyof DefaultTheme['colors']
}

export const Container = styled.button<ButtonProps>`
    width: 100%;
    margin: 7px 0;
    padding: 10px;
    border-radius: 5px;
    font-weight: bold;
    color: ${(props) => props.theme.colors.white};
    background-color: ${(props) =>
        props.backgroundColor
        ? props.theme.colors[props.backgroundColor]
        : props.theme.colors.warning};
    transition: opacity 0.3s;

    &:hover {
        opacity: 0.7;
    }
`;

export type { ButtonProps };
