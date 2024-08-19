import Button from "../Button";
import ContentHeader from "../ContentHeader";
import { Container, GridContainer, GridItem, HeaderRow, UserRow, Icon } from "./styles";
import { FaPen } from "react-icons/fa";
import { MdDelete, MdDisabledVisible } from "react-icons/md";

const AdminGridList: React.FC = () => (
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

            <UserRow>
                <GridItem>Francisco Hermeson</GridItem>
                <GridItem>hermesoninfo@gmail.com</GridItem>
                <GridItem>Dono</GridItem>
                <GridItem>5 Unidades</GridItem>
                <GridItem>Ativo</GridItem>
                <GridItem>
                    <Icon as={FaPen} />
                    <Icon as={MdDelete} />
                    <Icon as={MdDisabledVisible } />
                </GridItem>
            </UserRow>

            <UserRow>
                <GridItem>Francisco Hermeson</GridItem>
                <GridItem>hermesoninfo@gmail.com</GridItem>
                <GridItem>Dono</GridItem>
                <GridItem>5 Unidades</GridItem>
                <GridItem>Ativo</GridItem>
                <GridItem>
                    <Icon as={FaPen} />
                    <Icon as={MdDelete} />
                    <Icon as={MdDisabledVisible } />
                </GridItem>
            </UserRow>
            
            <UserRow>
                <GridItem>Francisco Hermeson</GridItem>
                <GridItem>hermesoninfo@gmail.com</GridItem>
                <GridItem>Dono</GridItem>
                <GridItem>5 Unidades</GridItem>
                <GridItem>Ativo</GridItem>
                <GridItem>
                    <Icon as={FaPen} />
                    <Icon as={MdDelete} />
                    <Icon as={MdDisabledVisible } />
                </GridItem>
            </UserRow>
        </GridContainer>
    </Container>
)

export default AdminGridList