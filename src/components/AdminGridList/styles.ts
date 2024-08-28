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

    /* --> MEDIA QUERY DO MOBILE <-- */
    @media(max-width: 770px) {

    }
`;

export const HeaderRow = styled.div`
    display: contents;
    font-weight: bold;
`;

export const GridItem = styled.div`
    padding: 10px;
    background-color: ${props => props.theme.colors.tertiary};
    border-radius: 5px;

    > a {
        text-decoration: none;
        color: unset;
    }
`;

export const UserRow = styled.div`
    display: contents;
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
`;