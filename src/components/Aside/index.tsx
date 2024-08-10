import { MdDashboard, MdArrowDownward, MdArrowUpward, MdExitToApp, MdClose, MdMenu } from 'react-icons/md';
import { Container, LogoIMG, Title, HeaderContainer, MenuContainer, MenuItemLink, MenuItemButton, ToggleMenu, ThemeToggleFooter } from "./styles";
import Toggle from "../Toggle";
import logo from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';
import { useTheme } from '../../hooks/theme';
import { useState } from 'react';

const Aside: React.FC = () => {

    const { signOut } = useAuth()
    const { toggleTheme, theme } = useTheme()
    
    const [toggleMenuIsOpened, setToggleMenuIsOpened] = useState(false)
    const [darkTheme, setDarkTheme] = useState(() => theme.title === 'dark' ? true : false)

    const handleToggleMenu = () => {
        setToggleMenuIsOpened(!toggleMenuIsOpened)
    }

    const handleChangeTheme = () => {
        setDarkTheme(!darkTheme)
        toggleTheme();
    }

    return (
        <Container menuIsOpen={toggleMenuIsOpened}>
            <HeaderContainer>
                <ToggleMenu onClick={handleToggleMenu}>
                    { toggleMenuIsOpened ? <MdClose /> : <MdMenu /> }
                </ToggleMenu>
                <LogoIMG src={logo} alt="Logo Dashboard" />
                <Title>Dashboard</Title>
            </HeaderContainer>

            <MenuContainer>
                <MenuItemLink href="/">
                    <MdDashboard />
                    Dashboard
                </MenuItemLink>

                <MenuItemLink href="/list/entry-balance">
                    <MdArrowUpward />
                    Entradas
                </MenuItemLink>

                <MenuItemLink href="/list/exit-balance">
                    <MdArrowDownward />
                    Saidas
                </MenuItemLink>

                <MenuItemButton onClick={signOut}>
                    <MdExitToApp />
                    Sair
                </MenuItemButton>
            </MenuContainer>

            <ThemeToggleFooter menuIsOpen={toggleMenuIsOpened}>
                <Toggle
                    labelLeft="Light"
                    labelRight="Dark"
                    checked={darkTheme}
                    onChange={handleChangeTheme}
                />
            </ThemeToggleFooter>
        </Container>
    )
}

export default Aside;