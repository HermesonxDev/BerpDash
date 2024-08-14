import { Container, Content } from "./styles"
import Button from "../../components/Button"
import ContentHeader from "../../components/ContentHeader"

const Admin: React.FC = () => {
    return (
        <Container>
            <ContentHeader title="Administração" lineColor="#1A73E8">
                    <Button>Adicionar</Button>
            </ContentHeader>

            <Content>
                
            </Content>
        </Container>
    )
}

export default Admin