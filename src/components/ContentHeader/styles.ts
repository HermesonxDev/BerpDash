import styled from 'styled-components';

interface ITitleContainerProps {
    lineColor: string
}

export const Container = styled.div `
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 25px;


    /*
    * --> MEDIA QUERY CELULAR
    *      Dispositivos usados:
    *           iPhone 6/7/8 Plus (414x736)
    */
    @media(max-width: 420px) {
        flex-direction: column;
        background-color: ${props => props.theme.colors.primary};
        padding: 15px 0;
        margin-bottom: 10px;
        position: sticky;
        top: 0;

        /*
        * --> Z-INDEX 998
        *      Faz com que o ContentHeader acompanhe o scroll do usuário pela página
        *      inteira, mantendo ele acima dos outros componentes do Content e abaixo
        *      dos componentes de Modal e Aside.
        */
        z-index: 998;
    }
`;

export const TitleContainer = styled.div<ITitleContainerProps> `
    > h1 {
        color: ${props => props.theme.colors.white};

        &::after {
            content: '';
            display: block;
            width: 55px;
            border-bottom: 10px solid ${props => props.lineColor};
        }
    }


    /*
    * --> MEDIA QUERY CELULAR
    *      Dispositivos usados:
    *           iPhone 6/7/8 Plus (414x736)
    */
    @media(max-width: 420px) {
        > h1 {
            font-size: 25px;

            &::after {
                content: '';
                display: block;
                width: 55px;
                border-bottom: 5px solid ${props => props.lineColor};
            }
        }
    }
`;

export const Controllers = styled.div `
    display: flex;

    
    /*
    * --> MEDIA QUERY CELULAR
    *      Dispositivos usados:
    *           iPhone 6/7/8 Plus (414x736)
    */
    @media(max-width: 420px) {
        width: 100%;
        justify-content: space-around;
        margin-top: 20px;
    }
`;