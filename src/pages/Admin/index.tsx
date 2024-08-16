import { Container, Content } from "./styles"
import Button from "../../components/Button"
import ContentHeader from "../../components/ContentHeader"
import AdminGridList from "../../components/AdminGridList"

const Admin: React.FC = () => {
    return (
        <Container>
            <ContentHeader title="Administração" lineColor="#1A73E8">
                <Button>Adicionar</Button>
            </ContentHeader>

            <Content>
                <AdminGridList />
            </Content>
        </Container>
    )
}

export default Admin