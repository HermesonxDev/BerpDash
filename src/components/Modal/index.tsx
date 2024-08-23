import Button from "../Button";
import { Container, HeaderModal, WarningIcon, ContentModal, AlertText, FooterModal, Controllers } from "./styles";

const Modal: React.FC = () => (
    <Container>
        <HeaderModal>
            <h2>Excluir Usuário</h2>
            <WarningIcon />
        </HeaderModal>

        <ContentModal>
            <AlertText>Tem certeza que deseja excluir esse usuário?</AlertText>
        </ContentModal>

        <FooterModal>
            <Controllers>
                <Button>Excluir</Button>
                <Button>Cancelar</Button>
            </Controllers>
        </FooterModal>
    </Container>
)

export default Modal