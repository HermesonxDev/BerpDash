import { Container, GridContainer, GridItem, HeaderRow, UserRow, Icon } from "./styles";
import { FaPen } from "react-icons/fa";
import { MdDelete, MdAppBlocking  } from "react-icons/md";

import Loading from "../Loading";
import ContentHeader from "../ContentHeader";
import Anchor from "../Anchor";
import { useFirestore } from "../../hooks/firestore";
import { useState } from "react";
import Modal from "../Modal";

const AdminGridList: React.FC = () => {

    const { getFirestore, deleteUserFirebase } = useFirestore()
    const { documents: data, loading } = getFirestore('users')

    const [deleteModal, setDeleteModal] = useState(false);
    const [deactiveModal, setDeactiveModal] = useState(false);

    const [userIdToDelete, setUserIdToDelete] = useState<string | null>(null)

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

    const handleDeleteUser = async () => {
        if (userIdToDelete) {
            const result = await deleteUserFirebase(userIdToDelete);

            if (result.success) {
                alert(result.message);
                setUserIdToDelete(null);
                setDeleteModal(false);
            } else {
                alert(`Erro ao deletar usuário: ${result.message}`);
            }
        }
    }

    const handleOpenDeleteModal = (userId: string) => {
        setUserIdToDelete(userId);
        setDeleteModal(true);
    }

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
                                onClick={() => handleOpenDeleteModal(user.id)}
                            />
                            <Icon
                                as={MdAppBlocking}
                                onClick={() => setDeactiveModal(true)}
                            />
                        </GridItem>
                    </UserRow>
                ))}
            </GridContainer>

            {deleteModal && 
                <Modal
                    title="Excluir Usuário"
                    action="excluir"
                    onAction={handleDeleteUser}
                    onClose={() => setDeleteModal(false)}
                />
            }

            {deactiveModal && 
                <Modal
                    title="Desativar Usuário"
                    action="desativar"
                    backgroundColor="info"
                    onAction={() => {}}
                    onClose={() => setDeactiveModal(false)}
                />
            }
        </Container>
    );
};

export default AdminGridList;
