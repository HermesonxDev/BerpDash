import styled from 'styled-components'

export const Container = styled.label `
    font-size: 16px;
    width: 10%;
    margin: 7px 0;
    padding: 10px;
    border-radius: 5px;
    font-weight: bold;
    color: ${props => props.theme.colors.white};
`;