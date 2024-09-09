import styled, { keyframes } from "styled-components";
import { MdOutlineAccessTime } from "react-icons/md";

const animate = keyframes`
    0% {
        transform: translateX(-100px);
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

export const Container = styled.div`
    width: 49%;
    min-height: 350px;
    margin: 10px 0;
    padding: 15px 10px;
    background-color: ${props => props.theme.colors.tertiary};
    color: ${props => props.theme.colors.white};
    border-radius: 7px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    animation: ${animate} .5s;
    
    /* --> MEDIA QUERY DO MOBILE <-- */
    @media(max-width: 1200px) {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: auto;
    }
`;

export const HeaderRow = styled.div`
    margin-bottom: 15px;
    height: 20%;

    > div {
        display: flex;
        flex-direction: row;
        gap: 5px;

        > h5 {
            margin-top: 9px;
            color: ${props => props.theme.colors.gray};
        }

        > p {
            color: ${props => props.theme.colors.gray};
        }
    }
`;

export const Clock = styled(MdOutlineAccessTime)`
    color: ${props => props.theme.colors.gray};
`;

export const MainRow = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    height: 50%;

    > h2 {
        font-size: 35px;
        display: flex;
        justify-content: center;
    }

    > p {
        display: flex;
        justify-content: center;
    }
`;

export const FooterRow = styled.div`
    border-top: 1px solid ${props => props.theme.colors.gray};
    height: 30%;
    display: flex;
    justify-content: center;
    overflow: scroll;

    > div {
        display: flex;
        flex-direction: column;
        padding: 15px 20px;
        margin-top: 10px;
        border-right: 1px solid ${props => props.theme.colors.gray};

        > p {
            word-wrap: break-word;
            overflow-wrap: break-word;
            word-break: break-all;
            hyphens: auto;
        }

    }

    &::-webkit-scrollbar {
        width: 0.5px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: ${props => props.theme.colors.secondary};
        border-radius: 10px;
    }

    &::-webkit-scrollbar-track {
        background-color: ${props => props.theme.colors.tertiary};
        border-radius: 10px;
    }

    &::-webkit-scrollbar-corner {
        background-color: none;
    }
`;
