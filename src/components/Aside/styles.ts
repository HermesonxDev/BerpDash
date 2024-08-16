import styled, { css } from "styled-components";

interface IContainerProps {
    menuIsOpen: boolean
}

interface IThemeToggleFooterProps {
    menuIsOpen: boolean
}

export const Container = styled.div<IContainerProps> `
    grid-area: AS;
    background: ${props => props.theme.colors.secondary};
    padding-left: 20px;
    border-right: 1px solid ${props => props.theme.colors.gray};
    position: relative;

    /* --> MEDIA QUERY DO MOBILE <-- */
    @media(max-width: 600px) {
        width: 170px;
        padding-left: 20px;
        position: fixed;
        z-index: 1001;
        height: ${props => props.menuIsOpen ? '100vh' : '70px'};
        overflow: hidden;

        ${props => !props.menuIsOpen && css`
            border: none;
            border-bottom: 1px solid ${props => props.theme.colors.gray};
        `}
    }
`;

export const LogoIMG = styled.img `
    width: 40px;
    height: 40px;

    /* --> MEDIA QUERY DO MOBILE <-- */
    @media(max-width: 600px) {
        display: none;
    }
`;

export const Title = styled.h3 `
    color: ${props => props.theme.colors.white};
    margin: 10px;

    /* --> MEDIA QUERY DO MOBILE <-- */
    @media(max-width: 600px) {
        display: none;
    }
`;

export const HeaderContainer = styled.header `
    display: flex;
    align-items: center;
    height: 70px;
`;

export const MenuContainer = styled.nav `
    display: flex;
    flex-direction: column;
    margin-top: 50px;
`;

export const MenuItemLink = styled.a `
    color: ${props => props.theme.colors.info};
    text-decoration: none;
    margin: 7px 0;
    display: flex;
    align-items: center;
    transition: opacity .3s;

    &:hover {
        opacity: .7;
    }

    > svg {
        font-size: 18px;
        margin-right: 5px;
    }
`;

export const MenuItemButton = styled.button `
    font-size: 16px;
    color: ${props => props.theme.colors.info};
    border: none;
    background: none;
    margin: 7px 0;
    display: flex;
    align-items: center;
    transition: opacity .3s;

    &:hover {
        opacity: .7;
    }

    > svg {
        font-size: 18px;
        margin-right: 5px;
    }
`;

export const ToggleMenu = styled.button `
    height: 40px;
    width: 40px;
    border-radius: 5px;
    font-size: 22px;
    background-color: ${props => props.theme.colors.warning};
    color: ${props => props.theme.colors.white};
    transition: opacity .3s;
    display: none;

    &:hover{
        opacity: 0.7;
    }

    /* --> MEDIA QUERY DO MOBILE <-- */
    @media(max-width: 600px) {
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

export const ThemeToggleFooter = styled.footer<IThemeToggleFooterProps> `
    display: none;
    position: absolute;
    bottom: 30px;

    @media(max-width: 470px) {
        display: ${props => props.menuIsOpen ? 'flex' : 'none'};
    }
`;