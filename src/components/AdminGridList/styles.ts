import styled from 'styled-components';
import { IconType } from 'react-icons';

interface IIconButtonProps {
  as: IconType
}

export const Container = styled.div `

`;

export const GridContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr 1fr 1fr 1fr 1fr;
    gap: 5px;
    padding: 20px 0;
    
    /* --> MEDIA QUERY PARA MOBILE <-- */
    @media (max-width: 770px) {
        margin-top: 15px;
        grid-template-columns: 1fr;
        background-color: ${props => props.theme.colors.tertiary};
        border-radius: 5px;
        padding: unset;
    }
`;

export const HeaderRow = styled.div`
    display: contents;
    font-weight: bold;

    /* --> MEDIA QUERY DO MOBILE <-- */
    @media(max-width: 770px) {
        display: flex;
        flex-direction: row;
    }

    /* --> MEDIA QUERY DO MOBILE <-- */
    @media(max-width: 420px) {
        grid-template-columns: 1fr;
    }
`;

export const HeaderGridItem = styled.div`
    padding: 10px;
    background-color: ${props => props.theme.colors.tertiary};
    border-radius: 5px;

    > a {
        text-decoration: none;
        color: unset;
    }

    /* --> MEDIA QUERY DO MOBILE <-- */
    @media(max-width: 770px) {
        width: 30%;
        text-align: center;
        background-color: unset;
        border-radius: unset;
    }

    /* --> MEDIA QUERY DO MOBILE <-- */
    @media(max-width: 420px) {
        padding: 7px;
    }

    /* --> MEDIA QUERY DO MOBILE <-- */
    @media(max-width: 400px) {
        padding: 4.5px;
    }
`;

export const UserRow = styled.div`
    display: contents;

    /* --> MEDIA QUERY DO MOBILE <-- */
    @media(max-width: 770px) {
        display: flex;
        flex-direction: row;
    }

    /* --> MEDIA QUERY DO MOBILE <-- */
    @media(max-width: 420px) {
        grid-template-columns: 1fr;
    }
`;

export const GridItem = styled.div`
    padding: 10px;
    background-color: ${props => props.theme.colors.tertiary};
    border-radius: 5px;

    > a {
        text-decoration: none;
        color: unset;
    }

    /* --> MEDIA QUERY DO MOBILE <-- */
    @media(max-width: 770px) {
        width: 90px;
        max-width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    /* --> MEDIA QUERY DO MOBILE <-- */
    @media(max-width: 420px) {
        padding: 6px;
        text-align: center;
    }
`;

export const GridActionItem = styled.div `
    padding: 10px;
    background-color: ${props => props.theme.colors.tertiary};
    border-radius: 5px;

    > a {
        text-decoration: none;
        color: unset;
    }

    /* --> MEDIA QUERY DO MOBILE <-- */
    @media(max-width: 770px) {
        padding: 0;
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

    /* --> MEDIA QUERY DO MOBILE <-- */
    @media(max-width: 770px) {
        
    }

    /* --> MEDIA QUERY DO MOBILE <-- */
    @media(max-width: 420px) {
        
    }
`;