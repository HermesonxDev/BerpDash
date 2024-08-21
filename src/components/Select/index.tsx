import { SelectHTMLAttributes, useState } from "react";
import { Container } from "./styles";

type ISelectProps = SelectHTMLAttributes<HTMLSelectElement>;

const Select: React.FC<ISelectProps> = ({ children, ...rest }) => {
    
    const [isPlaceholder, setIsPlaceholder] = useState(true);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setIsPlaceholder(event.target.value === "");
    };

    return (
        <Container {...rest} isPlaceholder={isPlaceholder} onChange={handleChange}>
            {children}
        </Container>
    );
};

export default Select;