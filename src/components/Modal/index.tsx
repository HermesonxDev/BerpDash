import React from 'react';
import Button from "../Button";
import { Container, HeaderModal, WarningIcon, ContentModal, AlertText, FooterModal, Controllers, Backdrop } from "./styles";

interface ModalProps {
    onClose: () => void;
    onDelete: () => void;
}

const Modal: React.FC<ModalProps> = ({ onClose, onDelete }) => (
    <>
        <Backdrop />
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
                    <Button onClick={onDelete}>Excluir</Button>
                    <Button onClick={onClose}>Cancelar</Button>
                </Controllers>
            </FooterModal>
        </Container>
    </>
);

export default Modal;
