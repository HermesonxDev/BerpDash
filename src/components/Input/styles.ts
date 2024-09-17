import styled from 'styled-components'

export const Container = styled.input `
    width: 100%;
    margin: 7px 0;
    padding: 10px;
    border-radius: 5px;

    &:read-only {
      color: ${props => props.theme.colors.gray};
    }
    
    /*
    * --> MEDIA QUERY TABLET
    *      Dispositivo usado: iPad (768x1024)
    */
    @media(max-width: 770px) {
       width: 80%;
    }

    
    /*
    * --> MEDIA QUERY CELULAR
    *      Dispositivos usados:
    *           iPhone 6/7/8 Plus (414x736)
    */
    @media(max-width: 420px) {
       width: 70%;
    }

    
    /*
    * --> MEDIA QUERY CELULAR
    *      Dispositivo usado: iPhone X (375x812)
    */
    @media(max-width: 400px) {
       width: 68%;
    }
`;