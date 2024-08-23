import styled from 'styled-components'
import { IoWarningOutline } from "react-icons/io5"

export const Container = styled.div `
    width: 500px;
    height: 175px;
    display: flex;
    flex-direction: column;
    background-color: ${props => props.theme.colors.white};
    border-radius: 8px;
`;

export const HeaderModal = styled.div `
    display: flex;
    flex-direction: row;
    gap: 10px;
    width: 100%;
    height: 50px;
    padding: 12px;
    background-color: ${props => props.theme.colors.warning};
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