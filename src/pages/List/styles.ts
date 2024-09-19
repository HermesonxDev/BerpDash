import styled from "styled-components";

export const Container = styled.div `
`;

export const Filters = styled.div `
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 30px;

    .tag-filter {
        font-size: 20px;
        font-weight: 500;
        background: none;
        color: ${props => props.theme.colors.white};
        margin: 0 10px;
        opacity: .3;
        transition: opacity .3s;

        &:hover {
            opacity: .7;
        }
    }

    .tag-filter-recurrent::after {
        content: '';
        display: block;
        width: 55px;
        margin: 0 auto;
        border-bottom: 10px solid ${props => props.theme.colors.success};
    }

    .tag-filter-eventual::after {
        content: '';
        display: block;
        width: 55px;
        margin: 0 auto;
        border-bottom: 10px solid ${props => props.theme.colors.warning};
    }

    .tag-actived {
        opacity: 1;
    }
`;

export const TotalRow = styled.div`
    background-color: ${props => props.theme.colors.tertiary};
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 30px;
    padding: 10px 10px;
    border-radius: 10px;

    > h2 {
        font-size: 25px;
        margin: auto 0;
    }

    /*
    * --> MEDIA QUERY CELULAR
    *      Dispositivos usados:
    *           iPhone 6/7/8 Plus (414x736)
    */
    @media(max-width: 420px) {
        flex-direction: column;

        > h2 {
            font-size: 23px;
            display: flex;
            justify-content: center;
            margin-top: 5px;
        }
    }
`;

export const SubHeader = styled.div`
    /*
    * --> MEDIA QUERY CELULAR
    *      Dispositivos usados:
    *           iPhone 6/7/8 Plus (414x736)
    */
    @media(max-width: 420px) {
        background-color: ${props => props.theme.colors.primary};
        padding-bottom: 1px;
        position: sticky;
        top: 0;

        /*
        * --> Z-INDEX 998
        *      Faz com que o SubHeader acompanhe o scroll do usuário pela página
        *      inteira, mantendo ele acima dos outros componentes do Content e abaixo
        *      dos componentes de Modal e Aside.
        */
        z-index: 998;
    }
`;

export const Content = styled.div `
    display: flex;
    flex-direction: column;
    gap: 10px;
    
    > h3 {
        display: flex;
        justify-content: center;
        padding: 12px 10px;
        border-radius: 10px;
        background-color: ${props => props.theme.colors.tertiary};
    }
`;