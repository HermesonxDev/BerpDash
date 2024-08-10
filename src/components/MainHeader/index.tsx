import { useMemo, useState } from "react";
import { Container, Profile, Welcome, UserName } from "./styles";
import Toggle from "../Toggle";

import emojis from '../../utils/emojis';

import { useTheme } from "../../hooks/theme";
import { useAuth } from "../../hooks/auth";

const MainHeader: React.FC = () => {

    const { user } = useAuth()
    const { toggleTheme, theme } = useTheme()

    const [darkTheme, setDarkTheme] = useState(() => theme.title === 'dark' ? true : false)

    const handleChangeTheme = () => {
        setDarkTheme(!darkTheme)
        toggleTheme()
    }

    const emoji = useMemo(() => {
        const index = Math.floor(Math.random() * emojis.length)
        return emojis[index];
    }, [])

    return (
        <Container>
            <Toggle
                labelLeft="Light"
                labelRight="Dark"
                checked={darkTheme}
                onChange={handleChangeTheme}
            />

            <Profile>
                <Welcome>Olá, {emoji}</Welcome>
                <UserName>{ user.username }</UserName>
            </Profile>
        </Container>
    )
}

export default MainHeader;