import {
    MdDashboard,
    MdArrowDownward,
    MdArrowUpward,
    MdExitToApp,
    MdClose,
    MdMenu,
    MdAdminPanelSettings,
    MdDeliveryDining
} from 'react-icons/md';

import { RiLockPasswordFill } from "react-icons/ri";
import { FaDollarSign } from "react-icons/fa6"
import { FaCashRegister } from "react-icons/fa"

import { Container, LogoIMG, Title, HeaderContainer, MenuContainer, MenuItemLink, MenuItemButton, ToggleMenu, ThemeToggleFooter } from "./styles";
import Toggle from "../Toggle";
import logo from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';
import { useTheme } from '../../hooks/theme';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Aside: React.FC = () => {

    const { signOut, Admin } = useAuth()
    const { toggleTheme, theme } = useTheme()
    const navigate = useNavigate();

    const [toggleMenuIsOpened, setToggleMenuIsOpened] = useState(false)
    const [darkTheme, setDarkTheme] = useState(() => theme.title === 'dark' ? true : false)

    const handleToggleMenu = () => {
        setToggleMenuIsOpened(!toggleMenuIsOpened)
    }

    const handleChangeTheme = () => {
        setDarkTheme(!darkTheme)
        toggleTheme();
    }

    const HandleRecoveryPassword = () => {
        signOut()
        navigate('/recovery-password')
    }

    const HandleQuit = () => {
        signOut()
        navigate('/')
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

                <MenuItemLink href="/">
                    <FaDollarSign />
                    Vendas
                </MenuItemLink>
                
                <MenuItemLink href="/">
                    <FaCashRegister />
                    Caixa
                </MenuItemLink>

                <MenuItemLink href="/">
                    <MdDeliveryDining />
                    Delivery
                </MenuItemLink>

                {
                    Admin
                    &&
                    <MenuItemLink href="/administration/list-users">
                        <MdAdminPanelSettings  />
                        Administração
                    </MenuItemLink>
                }

                <MenuItemButton onClick={HandleRecoveryPassword}>
                    <RiLockPasswordFill />
                    Redefinir senha
                </MenuItemButton>

                <MenuItemButton onClick={HandleQuit}>
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