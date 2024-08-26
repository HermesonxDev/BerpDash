import { Container, HeaderModal, WarningIcon, ContentModal, AlertText, FooterModal, Controllers, Backdrop } from "./styles";

import Button from "../Button";

import capitalizeFirstLetter from "../../utils/capitalizeFirstLetter";

interface ModalProps {
    title: string,
    action: string,
    backgroundColor?: string,
    onAction: () => void,
    onClose: () => void
}

const Modal: React.FC<ModalProps> = ({ title, action, backgroundColor, onAction, onClose }) => (
    <>
        <Backdrop />
        <Container>
            <HeaderModal backgroundColor={backgroundColor}>
                <h2>{title}</h2>
                <WarningIcon />
            </HeaderModal>

            <ContentModal>
                <AlertText>Tem certeza que deseja {action} esse usuário?</AlertText>
            </ContentModal>

            <FooterModal>
                <Controllers>
                    <Button
                        backgroundColor="info"
                        onClick={onAction}
                    >
                        {capitalizeFirstLetter(action)}
                    </Button>
                    
                    <Button
                        backgroundColor="info"
                        onClick={onClose}
                    >
                        Cancelar
                    </Button>
                </Controllers>
            </FooterModal>
        </Container>
    </>
);

export default Modal;
