import styled from 'styled-components';
import { IconType } from 'react-icons';

interface IIconButtonProps {
  as: IconType
}

export const Container = styled.div `

`;

export const GridContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr 1fr 1fr 1fr 1fr 1fr;
    gap: 5px;
    padding: 20px 0;
    
    
    /*
    * --> MEDIA QUERY TABLET
    *      Dispositivo usado: iPad (768x1024)
    */
    @media (max-width: 770px) {
        margin-top: 15px;
        grid-template-columns: 1fr;
        
        border-radius: 5px;
        padding: 0;
    }
`;

export const HeaderRow = styled.div`
    display: contents;
    font-weight: bold;


    /*
    * --> MEDIA QUERY TABLET
    *      Dispositivo usado: iPad (768x1024)
    */
    @media(max-width: 770px) {
        display: flex;
        flex-direction: row;
    }


    /*
    * --> MEDIA QUERY CELULAR
    *      Dispositivos usados:
    *           iPhone 6/7/8 Plus (414x736)
    */
    @media(max-width: 420px) {
        grid-template-columns: 1fr;
    }
`;

export const HeaderGridItem = styled.div`
    padding: 10px;
    display: flex;
    justify-content: center;
    background-color: ${props => props.theme.colors.tertiary};
    border-radius: 5px;

    > a {
        text-decoration: none;
        color: unset;
    }


    /*
    * --> MEDIA QUERY TABLET
    *      Dispositivo usado: iPad (768x1024)
    */
    @media(max-width: 770px) {
        padding: 10px 5px;
        width: 30%;
        text-align: center;
        border: 1px solid ${props => props.theme.colors.primary};
    }


    /*
    * --> MEDIA QUERY CELULAR
    *      Dispositivos usados:
    *           iPhone 6/7/8 Plus (414x736)
    */
    @media(max-width: 420px) {
        padding: 7px;
    }


    /*
    * --> MEDIA QUERY CELULAR
    *      Dispositivo usado: iPhone X (375x812)
    */
    @media(max-width: 400px) {
        padding: 4.5px;
    }
`;

export const UserRow = styled.div`
    display: contents;


    /*
    * --> MEDIA QUERY TABLET
    *      Dispositivo usado: iPad (768x1024)
    */
    @media(max-width: 770px) {
        display: flex;
        flex-direction: row;
    }


    /*
    * --> MEDIA QUERY CELULAR
    *      Dispositivos usados:
    *           iPhone 6/7/8 Plus (414x736)
    */
    @media(max-width: 420px) {
        grid-template-columns: 1fr;
    }
`;

export const GridItem = styled.div`
    padding: 15px 0;
    display: flex;
    justify-content: center;
    background-color: ${props => props.theme.colors.tertiary};
    border-radius: 5px;

    > a {
        text-decoration: none;
        color: unset;
    }


    /*
    * --> MEDIA QUERY TABLET
    *      Dispositivo usado: iPad (768x1024)
    */
    @media(max-width: 770px) {
        display: unset;
        font-size: 17px;
        width: 97px;
        max-width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        border: 1px solid ${props => props.theme.colors.primary};
        padding: 20px 10px;
    }


    /*
    * --> MEDIA QUERY CELULAR
    *      Dispositivos usados:
    *           iPhone 6/7/8 Plus (414x736)
    */
    @media(max-width: 420px) {
        padding: 10px;
        text-align: center;
    }
`;

export const GridActionItem = styled.div `
    padding: 10px 0;
    display: flex;
    justify-content: center;
    background-color: ${props => props.theme.colors.tertiary};
    border-radius: 5px;

    > a {
        text-decoration: none;
        color: unset;
    }


    /*
    * --> MEDIA QUERY TABLET
    *      Dispositivo usado: iPad (768x1024)
    */
    @media(max-width: 770px) {
        padding: 0;
        border: 1px solid ${props => props.theme.colors.primary};
        padding: 5px 3px;
    }
`;

export const Icon = styled.button<IIconButtonProps> `
    width: 30px;
    height: 30px;
    padding: 5px;
    margin-right: 5px;
    border-radius: 5px;
    background-color: ${props => props.theme.colors.warning};
    transition: opacity .3s;

    &:hover {
        opacity: .7;
        cursor: pointer;
    }


    /*
    * --> MEDIA QUERY TABLET
    *      Dispositivo usado: iPad (768x1024)
    */
    @media(max-width: 770px) {
        padding: 3px;
        width: 25px;
        height: 25px;
        margin-right: 0;
        margin-left: 5px;
    }


    /*
    * --> MEDIA QUERY CELULAR
    *      Dispositivos usados:
    *           iPhone 6/7/8 Plus (414x736)
    */
    @media(max-width: 420px) {
        
    }
`;