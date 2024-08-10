import { useState } from "react";
import { Container, Logo, Form, FormTitle } from "./styles";
import LogoIMG from "../../assets/logo.svg"
import Input from "../../components/Input";
import Button from "../../components/Button";

import { useAuth } from "../../hooks/auth";

const SignIn: React.FC = () => {

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const { signIn } = useAuth()

    return (
        <Container>
            <Logo>
                <img src={LogoIMG} alt="Dashboard" />
                <h2>Dashboard</h2>
            </Logo>

            <Form onSubmit={() => signIn(email, password)}>
                <FormTitle>Entrar</FormTitle>

                <Input
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <Input
                    type="password"
                    placeholder="Senha"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <Button type="submit">Acessar</Button>
            </Form>
        </Container>
    )
}

export default SignIn;