import { ButtonHTMLAttributes } from "react";
import { Container, ButtonProps } from "./styles";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, ButtonProps {}

const Button: React.FC<IButtonProps> = ({ children, backgroundColor, ...rest }) => (
    <Container backgroundColor={backgroundColor} {...rest}>
        {children}
    </Container>
);

export default Button;
