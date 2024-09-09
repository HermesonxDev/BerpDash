import styled from "styled-components";
import { MdOutlineAccessTime } from "react-icons/md";

export const Container = styled.div `
`;

export const Filters = styled.div `
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 30px;

    .tag-filter {
        font-size: 20px;
        font-weight: 500;
        background: none;
        color: ${props => props.theme.colors.white};
        margin: 0 10px;
        opacity: .3;
        transition: opacity .3s;

        &:hover {
            opacity: .7;
        }
    }

    .tag-filter-recurrent::after {
        content: '';
        display: block;
        width: 55px;
        margin: 0 auto;
        border-bottom: 10px solid ${props => props.theme.colors.success};
    }

    .tag-filter-eventual::after {
        content: '';
        display: block;
        width: 55px;
        margin: 0 auto;
        border-bottom: 10px solid ${props => props.theme.colors.warning};
    }

    .tag-actived {
        opacity: 1;
    }
`;

export const TotalRow = styled.div`
    background-color: ${props => props.theme.colors.tertiary};
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 30px;
    padding: 10px 10px;
    border-radius: 10px;

    > h2 {
        font-size: 25px;
        margin: auto 0;
    }
`;

export const HeaderTotalRow = styled.div`
    > div {
        display: flex;
        flex-direction: row;
        gap: 5px;

        > h5 {
            margin-top: 9px;
            color: ${props => props.theme.colors.gray};
        }

        > p {
            font-size: 14px;
            color: ${props => props.theme.colors.gray};
        }
    }
`;

export const Clock = styled(MdOutlineAccessTime)`
    width: 15px;
    height: 15px;
    color: ${props => props.theme.colors.gray};
`;

export const Content = styled.div `
    display: flex;
    flex-direction: column;
    gap: 10px;
    
    > h3 {
        display: flex;
        justify-content: center;
        padding: 12px 10px;
        border-radius: 10px;
        background-color: ${props => props.theme.colors.tertiary};
    }
`;