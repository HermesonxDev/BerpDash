import styled, { keyframes, DefaultTheme } from 'styled-components';
import { IoWarningOutline } from "react-icons/io5";

interface IHeaderModalProps {
    backgroundColor?: keyof DefaultTheme['colors']
}

const animate = keyframes`
    0% {
        transform: translateY(100px);
        opacity: 0;
    }

    50% {
        opacity: .3;
    }

    100% {
        transform: translateY(0px);
        opacity: 1;
    }
`;

export const Backdrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
    z-index: 998;
`;

export const Container = styled.div`
    position: fixed;
    top: 250px;
    right: 300px;
    width: 600px;
    height: 175px;
    display: flex;
    flex-direction: column;
    background-color: ${props => props.theme.colors.white};
    border-radius: 8px;
    z-index: 999;
    animation: ${animate} .5s;
`;

export const HeaderModal = styled.div<IHeaderModalProps> `
    display: flex;
    flex-direction: row;
    gap: 10px;
    width: 100%;
    height: 50px;
    padding: 12px;
    background-color: ${(props) =>
        props.backgroundColor
        ? props.theme.colors[props.backgroundColor]
        : props.theme.colors.warning};
    border-radius: 8px 8px 0 0;
    box-shadow: 0 6px 6px -1px rgba(0, 0, 0, 0.1);
`;

export const WarningIcon = styled(IoWarningOutline) `
    width: 27px;
    height: 27px;
`;

export const ContentModal = styled.div `
    margin: 25px 10px;
`;


export const AlertText = styled.h3 `
    color: ${props => props.theme.colors.black};
`;

export const FooterModal = styled.div `
    display: flex;
    justify-content: flex-end;
    width: 100%;
    border-top: 1px solid ${props => props.theme.colors.gray};
`;

export const Controllers = styled.div `
    display: flex;
    flex-direction: row;
    gap: 10px;
    width: 30%;
    margin-right: 10px;
`;