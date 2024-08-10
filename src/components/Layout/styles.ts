import styled from "styled-components";

export const Grid = styled.div `

    display: grid;
    height: 100vh;
    min-width: 315px;

    /**
    * Grid Desktop:
    *     Tamanho de 2x2
    *     Colunas: 250px Restante
    *     Linhas: 70px Restante
    *  
    * Componentes do Grid:
    *     MainHeader (MH)
    *     Aside (AS)
    *     Content (CT)
    *
    * Preview:
    *        |
    *  Aside |    MainHeader
    * --------------------------
    *        |
    *        |
    *  Aside |     Content
    *        |
    *        |
    *        |
    *        |
    */
    grid-template-columns: 250px auto;
    grid-template-rows: 70px auto;
    grid-template-areas: "AS MH" "AS CT";
    

    /**
    * Grid Mobile:
    *     Tamanho de 1x1
    *     Colunas: 100%
    *     Linhas: 70px Restante
    *  
    * Componentes do Grid:
    *     MainHeader (MH)
    *     Aside (AS)
    *     Content (CT)
    *
    * Preview:
    * |                |
    * |   MainHeader   |
    * |----------------|
    * |                |
    * |                |
    * |    Content     |
    * |                |
    * |                |
    * |                |
    * |                |
    */
    @media(max-width: 600px) {
        grid-template-columns: 100%;
        grid-template-rows: 70px auto;
        grid-template-areas: "MH" "CT";
    }
`;