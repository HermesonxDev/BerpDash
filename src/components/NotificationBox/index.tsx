import { Container, NotificationHeader, EmailIcon, CloseIcon, Content } from "./styles";
import { useAuth } from "../../hooks/auth";

const NotificationBox: React.FC = () => {
    const { removeEmailNotification } = useAuth()
    
    return (
        <Container>
            <NotificationHeader>
                <EmailIcon />
            </NotificationHeader>

            <Content>
                <CloseIcon onClick={removeEmailNotification}/>
                <h4>Confirmação de email</h4>
                <p>Acesse o link que enviamos para redefinir sua senha!</p>
            </Content>
        </Container>
    )
}

export default NotificationBox