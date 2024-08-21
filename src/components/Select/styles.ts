import styled from 'styled-components'

export const Container = styled.select<{ isPlaceholder: boolean }> `
    width: 100%;
    margin: 7px 0;
    padding: 10px;
    border-radius: 5px;
    color: ${({ isPlaceholder }) => (isPlaceholder && "#A9A9A9")};
`;