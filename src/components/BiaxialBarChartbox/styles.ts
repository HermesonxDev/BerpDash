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

export const Container = styled.div `
    width: 49%;
    min-height: 700px;
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
    height: 10%;

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
    height: 80%;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const Controllers = styled.div `
    display: flex;
    flex-direction: row;
    gap: 15px;

    > button {
        border: 1px solid ${props => props.theme.colors.white};
    }

    .tag-deactivate {
        opacity: 0.7;
        border: unset;
    }
`;

export const FooterRow = styled.div`
    height: 10%;
`;