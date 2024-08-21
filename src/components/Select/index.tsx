import { SelectHTMLAttributes } from "react";
import { Container } from "./styles";

type ISelectProps = SelectHTMLAttributes<HTMLSelectElement>

const Select: React.FC<ISelectProps> = ({ children, ...rest }) => (
    <Container {...rest}>
        {children}
    </Container>
)

export default Select