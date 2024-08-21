import styled from 'styled-components'

export const Container = styled.a `
    text-align: center;
    font-size: 14px;
    width: 100%;
    margin: 7px 0;
    padding: 10px;
    border-radius: 5px;
    font-weight: bold;
    color: ${props => props.theme.colors.white};
    background-color: ${props => props.theme.colors.warning};
    transition: opacity .3s;
    text-decoration: none;

    &:hover {
        opacity: .7;
        cursor: pointer;
    }
`;