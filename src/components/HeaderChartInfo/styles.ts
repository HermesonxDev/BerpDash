import styled from "styled-components";
import { MdOutlineAccessTime } from "react-icons/md";

export const Container = styled.div`
    display: flex;
    flex-direction: column;

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

    /*
    * --> MEDIA QUERY TABLET
    *      Dispositivo usado: iPad (768x1024)
    */
        @media(max-width: 770px) {
        > div {
            > h5 {
                margin-top: 9.5px;
            }
        }
    }

    /*
    * --> MEDIA QUERY CELULAR
    *      Dispositivo usado: iPhone X (375x812)
    */
    @media(max-width: 420px) {
        > div {
            > h2 {
                font-size: 1.3rem;
            }

            > h5 {
                margin-top: 7.2px;
            }
        }
    }

    /*
    * --> MEDIA QUERY CELULAR
    *      Dispositivo usado: iPhone X (375x812)
    */
    @media(max-width: 400px) {
        > div {
            > h2 {
                font-size: 1.2rem;
            }

            > h5 {
                font-size: 0.7rem;
            }
        }
    }
`;

export const Clock = styled(MdOutlineAccessTime)`
    color: ${props => props.theme.colors.gray};
`;