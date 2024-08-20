import { Container } from "./styles";

import Anchor from "../Anchor";
import ContentHeader from "../ContentHeader";

const AdminGridCreation: React.FC = () => (
    <Container>
        <ContentHeader title="Administração" lineColor="#1A73E8">
            <Anchor href="/administration/list-users">
                Voltar
            </Anchor>
        </ContentHeader>

        0
    </Container>
)

export default AdminGridCreation