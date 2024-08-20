import Button from "../Button";
import ContentHeader from "../ContentHeader";
import { Container, GridContainer, GridItem, HeaderRow, UserRow, Icon } from "./styles";
import { FaPen } from "react-icons/fa";
import { MdDelete, MdDisabledVisible } from "react-icons/md";

interface IAdminGridProps {
    data: {
        Devices: {
            lastacess: string,
            plataform: string,
            uid: string,
            useragent: string,
            vendor: string,
            version: string
        }[],
        data_criacao: string,
        email: string,
        id: string,
        nome: string,
        role: string[],
        status: boolean,
        uid_firebase: string,
        ultimo_acesso: string,
        units: {

        }[]
    }[]
}

const AdminGridList: React.FC<IAdminGridProps> = ({ data }) => (
    <Container>
        <ContentHeader title="Administração" lineColor="#1A73E8">
            <Button>Adicionar</Button>
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
                            <Icon as={FaPen} />
                            <Icon as={MdDelete} />
                            <Icon as={MdDisabledVisible } />
                        </GridItem>
                    </UserRow>
                ))
            }
        </GridContainer>
    </Container>
)

export default AdminGridList