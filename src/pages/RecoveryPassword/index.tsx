import { useState } from "react";
import { Container, Logo, Form, FormTitle } from "./styles";
import LogoIMG from "../../assets/logo.svg"
import Input from "../../components/Input";
import Button from "../../components/Button";

import { useAuth } from "../../hooks/auth";
import { useNavigate } from "react-router-dom";
import Anchor from "../../components/Anchor";

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

                <Input
                    type="email"
                    placeholder="Digite seu email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <Button type="submit">Confirmar</Button>
                <Button>
                    <Anchor href="/">Voltar</Anchor>
                </Button>
            </Form>
        </Container>
    )
}

export default RecoveryPassword;