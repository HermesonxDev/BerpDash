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

    /*
    * --> Z-INDEX 1000
    *      Faz com que o desfoque do modal se mantenha acima de todos os outros
    *      componentes da página inteira, para dar foque no modal.
    */
    z-index: 1000;
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
    animation: ${animate} .5s;

    /*
    * --> Z-INDEX 1001
    *      Faz com que o Modal se mantenha acima de qualquer outro
    *      componente da página inteira.
    */
    z-index: 1001;

    
    /*
    * --> MEDIA QUERY TABLET
    *      Dispositivo usado: iPad (768x1024)
    */
    @media(max-width: 770px) {
        right: 80px;
    }

    
    /*
    * --> MEDIA QUERY CELULAR
    *      Dispositivos usados:
    *           iPhone 6/7/8 Plus (414x736)
    */
    @media(max-width: 420px) {
        width: 400px;
        height: 200px;
        right: 5px;
    }

    
    /*
    * --> MEDIA QUERY CELULAR
    *      Dispositivo usado: iPhone X (375x812)
    */
    @media(max-width: 400px) {
        width: 360px;
        right: 8px;
    }
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

    
    /*
    * --> MEDIA QUERY CELULAR
    *      Dispositivos usados:
    *           iPhone 6/7/8 Plus (414x736)
    */
    @media(max-width: 420px) {
        width: 50%;
    }
`;