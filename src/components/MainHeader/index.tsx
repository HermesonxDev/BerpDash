import { useState } from "react";
import { Container, Profile, Welcome, UserName } from "./styles";
import Toggle from "../Toggle";

import { useTheme } from "../../hooks/theme";

const MainHeader: React.FC = () => {

    const { toggleTheme, theme } = useTheme()

    const [darkTheme, setDarkTheme] = useState(() => theme.title === 'dark' ? true : false)

    const handleChangeTheme = () => {
        setDarkTheme(!darkTheme)
        toggleTheme()
    }

    return (
        <Container>
            <Toggle
                labelLeft="Light"
                labelRight="Dark"
                checked={darkTheme}
                onChange={handleChangeTheme}
            />

            <Profile>
                <Welcome>Olá</Welcome>
                <UserName>Administrador</UserName>
            </Profile>
        </Container>
    )
}

export default MainHeader;