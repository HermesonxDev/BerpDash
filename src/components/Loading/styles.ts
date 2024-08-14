import styled, { keyframes } from "styled-components";
import { AiOutlineLoading } from "react-icons/ai";

const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
`;

export const Container = styled.div `
    margin-top: 100px;
    display: flex;
    justify-content: center;
`;

export const LoadingIcon = styled(AiOutlineLoading) `
    animation: ${rotate} 2s linear infinite;
    font-size: 5rem;
    color: ${props => props.theme.colors.white};
`;