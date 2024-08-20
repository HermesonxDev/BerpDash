import { Container } from "./styles"
import AdminGridList from "../../components/AdminGridList"
import useFirestore from "../../hooks/firestore"
import Loading from "../../components/Loading"

const Admin: React.FC = () => {

    const { documents, loading } = useFirestore('users')

    if (loading) {
        return <Loading />
    }
    
    return (
        <Container>
            <AdminGridList data={documents}/>
        </Container>
    )
}

export default Admin