import { LabelHTMLAttributes } from "react";
import { Container } from "./styles";

type ILabelProps = LabelHTMLAttributes<HTMLLabelElement>

const Label: React.FC<ILabelProps> = ({ children, ...rest }) => (
    <Container {...rest}>
        { children }
    </Container>
)

export default Label