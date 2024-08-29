import { useState } from "react";
import { Container, Logo, Form, FormTitle } from "./styles";
import LogoIMG from "../../assets/logo.svg"
import LoginInput from "../../components/LoginInput";
import Button from "../../components/Button";

import { useAuth } from "../../hooks/auth";
import { useNavigate } from "react-router-dom";

const RecoveryPassword: React.FC = () => {

    const { recoveryPassword } = useAuth()
    const navigate = useNavigate()
    
    const [email, setEmail] = useState<string>('')

    return (
        <Container>
            <Logo>
                <img src={LogoIMG} alt="Dashboard" />
                <h2>Berp Dashboard</h2>
            </Logo>

            <Form onSubmit={(event) => recoveryPassword(event, email, navigate)}>
                <FormTitle>Redefinir senha</FormTitle>

                <LoginInput
                    type="email"
                    placeholder="Digite seu email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <Button type="submit">Confirmar</Button>

                <p>Lembrou-se da senha? <a href="/">Acesse.</a></p>
            </Form>
        </Container>
    )
}

export default RecoveryPassword;