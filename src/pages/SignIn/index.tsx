import { useState } from "react";
import { Container, Logo, Form, FormTitle, Message } from "./styles";
import LogoIMG from "../../assets/logo.svg"
import LoginInput from "../../components/LoginInput";
import Button from "../../components/Button";

import { useAuth } from "../../hooks/auth";
import NotificationBox from "../../components/NotificationBox";

const SignIn: React.FC = () => {

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const { signIn, showNotification, message } = useAuth()

    return (
        <Container>
            <Logo>
                <img src={LogoIMG} alt="Dashboard" />
                <h2>Dashboard</h2>
            </Logo>

            <Form onSubmit={(event) => signIn(event, email, password)}>
                <FormTitle>Entrar</FormTitle>

                <LoginInput
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <LoginInput
                    type="password"
                    placeholder="Senha"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                

                <Button type="submit">Acessar</Button>

                <p>Esqueceu a senha? <a href="/recovery-password">Acesse.</a></p>
            </Form>
            
            {
                showNotification && <NotificationBox />
            }

            {
                message && <Message>{message}</Message>
            }
        </Container>
    )
}

export default SignIn;