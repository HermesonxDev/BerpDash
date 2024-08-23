import { useState } from "react";
import { Container, Profile, Welcome, UserName } from "./styles";
import Toggle from "../Toggle";

import { useTheme } from "../../hooks/theme";
import { useFirestore } from "../../hooks/firestore";

const MainHeader: React.FC = () => {

    const { toggleTheme, theme } = useTheme()
    const { user } = useFirestore()

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
                <UserName>{user.name}</UserName>
            </Profile>
        </Container>
    )
}

export default MainHeader;