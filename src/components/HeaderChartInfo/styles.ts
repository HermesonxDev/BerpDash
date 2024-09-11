import styled from "styled-components";
import { MdOutlineAccessTime } from "react-icons/md";

export const Container = styled.div`
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
    }`;

export const Clock = styled(MdOutlineAccessTime)`
    color: ${props => props.theme.colors.gray};
`;