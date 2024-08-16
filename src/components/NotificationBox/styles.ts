import styled, { keyframes } from 'styled-components';
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { IoClose } from "react-icons/io5";

const animate = keyframes`
    0% {
        transform: translateX(100px);
        opacity: 0;
    }

    50% {
        opacity: .3;
    }

    100% {
        transform: translateX(0px);
        opacity: 1;
    }
`;

export const Container = styled.div `
    display: flex;
    max-width: 24rem;
    margin: 0 auto;
    padding: 1.5rem;
    border-radius: 0.5rem;
    background-color: #ffffff;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    animation: ${animate} .5s;
    position: absolute;
    right: 20px;
    bottom: 30px;

    /* --> MEDIA QUERY DO MOBILE <-- */
    @media(max-width: 400px) {
        max-width: 20rem;
        bottom: 500px;
    }
`;

export const NotificationHeader = styled.div `
    flex-shrink: 0;
`;

export const EmailIcon = styled(MdOutlineMarkEmailRead) `
    width: 3.5rem;
    height: 3.5rem;
    margin-top: 12px;

    /* --> MEDIA QUERY DO MOBILE <-- */
    @media(max-width: 400px) {
        margin-top: 10px;
    }
`;

export const CloseIcon = styled(IoClose) `
    position: absolute;
    top: 12px;
    right: 12px;
    
    &:hover {
        cursor: pointer;
    }
`;

export const Content = styled.div `
    margin-left: 1.5rem;
    padding-top: 0.25rem;

    > h4 {
        color: #1a202c;
        font-size: 1.25rem;
        line-height: 1.25; 
    }

    > p {
        color: #718096;
        font-size: 1rem;
        line-height: 1.5; 
    }

    /* --> MEDIA QUERY DO MOBILE <-- */
    @media(max-width: 400px) {
        > h4 {
            font-size: 1rem;
            line-height: 1; 
            margin-bottom: 5px;
        }

        > p {
            font-size: 1rem;
            line-height: 1; 
        }
    }
`;