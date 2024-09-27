import {
    Container,
    LogoIMG,
    Title,
    HeaderContainer,
    MenuContainer,
    MenuItemLink,
    MenuItemButton,
    ToggleMenu,
    ThemeToggleFooter
} from "./styles";

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

import { RiLockPasswordFill } from "react-icons/ri"
import { FaDollarSign, FaCode } from "react-icons/fa6"
import { FaCashRegister, FaBoxes } from "react-icons/fa"
import { AiOutlineAudit } from "react-icons/ai"

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
                
                <MenuItemLink href="/discounts">
                    <MdArrowUpward />
                    Descontos
                </MenuItemLink>

                <MenuItemLink href="/expenses">
                    <MdArrowDownward />
                    Despesas
                </MenuItemLink>

                <MenuItemLink href="/storage">
                    <FaBoxes />
                    Estoque
                </MenuItemLink>

                <MenuItemLink href="/sales">
                    <FaDollarSign />
                    Vendas
                </MenuItemLink>
                
                <MenuItemLink href="/point-of-sale">
                    <FaCashRegister />
                    Caixa
                </MenuItemLink>

                <MenuItemLink href="/delivery">
                    <MdDeliveryDining />
                    Delivery
                </MenuItemLink>

                <MenuItemLink href="/audit">
                    <AiOutlineAudit />
                    Auditoria
                </MenuItemLink>

                {Admin &&
                    <>
                        <MenuItemLink href="/administration/list-users">
                            <MdAdminPanelSettings />
                            Administração
                        </MenuItemLink>

                        <MenuItemLink href="/development">
                            <FaCode />
                            Desenvolvimento
                        </MenuItemLink>
                    </>
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