import { Container } from "./styles";

const Content: React.FC<React.PropsWithChildren<{}>> = ({ children }) => (
    <Container>
        { children }
    </Container>
)

export default Content;