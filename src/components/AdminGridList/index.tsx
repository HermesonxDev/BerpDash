import { Container, GridContainer, GridItem, HeaderRow, UserRow, Icon } from "./styles";
import { FaPen } from "react-icons/fa";
import { MdDelete, MdDisabledVisible } from "react-icons/md";

import useFirestore from "../../hooks/firestore";
import Loading from "../Loading";
import ContentHeader from "../ContentHeader";
import Anchor from "../Anchor";

const AdminGridList: React.FC = () => {
    
    const { documents: data, loading } = useFirestore('users')

    if (loading) {
        return <Loading />
    }

    return (
        <Container>
            <ContentHeader title="Administração" lineColor="#1A73E8">
                <Anchor href="/administration/create-user">
                    Adicionar
                </Anchor>
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

                {
                    data.map(user => (
                        <UserRow key={user.id}>
                            <GridItem>{user.nome}</GridItem>
                            <GridItem>{user.email}</GridItem>
                            <GridItem>{user.role[0]}</GridItem>
                            <GridItem>{user.units.length} Unidades</GridItem>
                            <GridItem>
                                {
                                    user.status ? "Ativo" : "Inativo"
                                }
                            </GridItem>
                            <GridItem>
                                <a href={`/administration/edit/user/${user.id}`}>
                                    <Icon as={FaPen} />
                                </a>
                                <Icon as={MdDelete} />
                                <Icon as={MdDisabledVisible } />
                            </GridItem>
                        </UserRow>
                    ))
                }
            </GridContainer>
        </Container>
    )
}

export default AdminGridList