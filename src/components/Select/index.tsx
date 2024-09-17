import { SelectHTMLAttributes } from "react";
import { Container } from "./styles";

type ISelectProps = SelectHTMLAttributes<HTMLSelectElement>;

const Select: React.FC<ISelectProps> = ({ children, onChange, ...rest }) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (onChange) {
            onChange(event);
        }
    };

    return (
        <Container {...rest} onChange={handleChange}>
            {children}
        </Container>
    );
};

export default Select