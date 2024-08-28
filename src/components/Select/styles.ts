import styled from 'styled-components'

export const Container = styled.select<{ isPlaceholder: boolean }> `
    width: 100%;
    margin: 7px 0;
    padding: 10px;
    border-radius: 5px;
    color: ${({ isPlaceholder }) => (isPlaceholder && "#A9A9A9")};

    /* --> MEDIA QUERY DO MOBILE <-- */
    @media(max-width: 770px) {
       width: 80%;
    }

    /* --> MEDIA QUERY DO MOBILE <-- */
    @media(max-width: 420px) {
       width: 70%;
    }

    /* --> MEDIA QUERY DO MOBILE <-- */
    @media(max-width: 400px) {
       width: 68%;
    }
`;