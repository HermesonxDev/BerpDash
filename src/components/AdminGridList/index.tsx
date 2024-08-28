import { Container, GridContainer, GridItem, HeaderRow, HeaderGridItem, GridActionItem, UserRow, Icon } from "./styles";
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
                    <HeaderGridItem>Nome</HeaderGridItem>
                    <HeaderGridItem>Email</HeaderGridItem>
                    <HeaderGridItem>Função</HeaderGridItem>
                    <HeaderGridItem>Qtd. Unid</HeaderGridItem>
                    <HeaderGridItem>Status</HeaderGridItem>
                    <HeaderGridItem>Ações</HeaderGridItem>
                </HeaderRow>

                {data.map(user => (
                    user.deleted_at ? null : (
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
                            <GridActionItem>
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
                                
                            </GridActionItem>
                        </UserRow>
                    )
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
