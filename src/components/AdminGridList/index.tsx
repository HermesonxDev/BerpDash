import { Container, GridContainer, GridItem, HeaderRow, UserRow, Icon } from "./styles";
import { FaPen } from "react-icons/fa";
import { MdDelete, MdAppBlocking, MdAppShortcut  } from "react-icons/md";

import Loading from "../Loading";
import ContentHeader from "../ContentHeader";
import Anchor from "../Anchor";
import { useFirestore } from "../../hooks/firestore";
import { useState } from "react";
import Modal from "../Modal";

const AdminGridList: React.FC = () => {

    const {
        getFirestore,
        deactiveUserFirebase,
        activeUserFirebase,
        deleteUserFirebase
    } = useFirestore();

    const { documents: data, loading } = getFirestore('users');

    const [modalType, setModalType] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);

    const handleSetRole = (role: string) => {
        switch (role) {
            case 'owner':
                return 'Dono';
            case 'admin':
                return 'Admin';
            case 'manager':
                return 'Gerente';
            default:
                return role;
        }
    }

    const handleUserAction = async () => {
        if (!userId || !modalType) return;

        if (modalType === 'delete') {
            await deleteUserFirebase(userId);
            window.location.reload()

        } else if (modalType === 'deactivate') {
            await deactiveUserFirebase(userId);
            window.location.reload()

        } else if (modalType === 'activate') {
            await activeUserFirebase(userId);
            window.location.reload()
        }

        setUserId(null);
        setModalType(null);
    };

    const handleOpenModal = (
        actionType: "delete" | "deactivate" | "activate",
        userId: string
    ) => {
        setModalType(actionType);
        setUserId(userId);
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <Container>
            <ContentHeader title="Administração" lineColor="#1A73E8">
                <Anchor href="/administration/create-user">Adicionar</Anchor>
            </ContentHeader>

            <h2>Usuários</h2>

            <GridContainer>
                <HeaderRow>
                    <GridItem>Nome</GridItem>
                    <GridItem>Email</GridItem>
                    <GridItem>Função</GridItem>
                    <GridItem>Qtd. Unid</GridItem>
                    <GridItem>Status</GridItem>
                    <GridItem>Ações</GridItem>
                </HeaderRow>

                {data.map(user => (
                    <UserRow key={user.id}>
                        <GridItem>{user.name}</GridItem>
                        <GridItem>{user.email}</GridItem>
                        <GridItem>
                            {user.role.map((r: string, index: number) => (
                                <span key={index}>
                                    {handleSetRole(r)}
                                    {index < user.role.length - 1 ? ', ' : ''}
                                </span>
                            ))}
                        </GridItem>
                        <GridItem>{user.units.length} Unidades</GridItem>
                        <GridItem>{user.status ? "Ativo" : "Inativo"}</GridItem>
                        <GridItem>
                            <a href={`/administration/edit/user/${user.id}`}>
                                <Icon as={FaPen} />
                            </a>

                            <Icon
                                as={MdDelete}
                                onClick={() => handleOpenModal('delete', user.id)}
                            />

                            {user.status
                                ? <Icon
                                    as={MdAppBlocking}
                                    onClick={() => handleOpenModal('deactivate', user.id)}
                                  />

                                : <Icon
                                    as={MdAppShortcut}
                                    onClick={() => handleOpenModal('activate', user.id)}
                                  />
                            }
                            
                        </GridItem>
                    </UserRow>
                ))}
            </GridContainer>

            {modalType === 'delete' && 
                <Modal
                    title="Excluir Usuário"
                    action="excluir"
                    onAction={handleUserAction}
                    onClose={() => setModalType(null)}
                />
            }

            {modalType === 'deactivate' && 
                <Modal
                    title="Desativar Usuário"
                    action="desativar"
                    backgroundColor="info"
                    buttonColor="info"
                    onAction={handleUserAction}
                    onClose={() => setModalType(null)}
                />
            }

            {modalType === 'activate' && 
                <Modal
                    title="Reativar Usuário"
                    action="reativar"
                    backgroundColor="info"
                    buttonColor="info"
                    onAction={handleUserAction}
                    onClose={() => setModalType(null)}
                />
            }
        </Container>
    );
};

export default AdminGridList;
