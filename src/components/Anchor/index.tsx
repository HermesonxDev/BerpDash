import { AnchorHTMLAttributes } from "react";
import { Container } from "./styles";

type IAnchorProps = AnchorHTMLAttributes<HTMLAnchorElement>

const Anchor: React.FC<IAnchorProps> = ({ children, ...rest }) => (
    <Container {...rest}>
        { children }
    </Container>
)

export default Anchor