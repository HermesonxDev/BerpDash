import { Container } from "./styles"
import { useParams } from "react-router-dom";

import AdminGridList from "../../components/AdminGridList"
import AdminGridCreation from "../../components/AdminGridCreation";

const Admin: React.FC = () => {
    
    const { type } = useParams();

    if (type === 'create-user') {
        return (
            <Container>
                <AdminGridCreation />
            </Container>
        )
    }

    return (
        <Container>
            <AdminGridList />
        </Container>
    )
}

export default Admin