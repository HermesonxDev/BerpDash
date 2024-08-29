import styled, { keyframes } from 'styled-components';

const animate = keyframes`
    0% {
        transform: translateY(-100px);
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
interface IContainerProps {
    color: string
}

export const Container = styled.div<IContainerProps> `
    width: 32%;
    height: 150px;
    margin: 10px 0;
    background-color: ${props => props.color};
    color: ${props => props.theme.colors.white};
    border-radius: 7px;
    padding: 10px 20px;
    position: relative;
    overflow: hidden;
    animation: ${animate} .5s;

    > img {
        height: 110%;
        position: absolute;
        top: -10px;
        right: -30px;
        opacity: .3;
    }

    > span {
        font-size: 18px;
        font-weight: 500;
    }

    > small {
        font-size: 12px;
        position: absolute;
        bottom: 10px;
    }


    /*
    * --> MEDIA QUERY TABLET
    *      Dispositivo usado: iPad (768x1024)
    */
    @media(max-width: 770px) {
        > span {
            font-size: 14px;
        }

        > h1 {
            word-wrap: break-word;
            font-size: 22px;

            strong {
                font-size: 16px;
                display: inline-block;
                width: 100%;
            }
        }
    }


    /*
    * --> MEDIA QUERY CELULAR
    *      Dispositivos usados:
    *           iPhone 6/7/8 Plus (414x736)
    */
    @media(max-width: 420px) {
        width: 100%;

        > h1 {
            display: flex;

            strong {
                position: initial;
                font-size: 22px;
                width: auto;
                padding-right: 0.3rem;
            }

            /* strong::after {
                content: '';
                width: 3px;
                height: 3px;
                position: inline-block;
            } */
        }
    }
`;