import { useState } from "react";
import { Container, Logo, Form, FormTitle } from "./styles";
import LogoIMG from "../../assets/logo.svg"
import Input from "../../components/Input";
import Button from "../../components/Button";

import { useAuth } from "../../hooks/auth";

const RecoveryPassword: React.FC = () => {

    const [email, setEmail] = useState<string>('')

    const { recoveryPassword } = useAuth()

    return (
        <Container>
            <Logo>
                <img src={LogoIMG} alt="Dashboard" />
                <h2>Berp Dashboard</h2>
            </Logo>

            <Form onSubmit={(event) => recoveryPassword(event, email)}>
                <FormTitle>Redefinir senha</FormTitle>

                <Input
                    type="email"
                    placeholder="Digite seu email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <Button type="submit">Confirmar</Button>
            </Form>
        </Container>
    )
}

export default RecoveryPassword;