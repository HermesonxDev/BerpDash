import { useMemo } from "react";
import { Container } from "./styles";

import CountUp from "react-countup";

import ArrowDownIMG from '../../assets/arrow-down.svg';
import ArrowUpIMG from '../../assets/arrow-up.svg';
import DollarIMG from '../../assets/dollar.svg';

interface IWalletBoxProps{
    title: string,
    amount: number,
    footerLabel: string,
    color: string
    icon: 'dollar' | 'arrowUp' | 'arrowDown',
}

const WalletBox: React.FC<IWalletBoxProps> = ({ title, amount, footerLabel, color, icon}) => {

    const iconSelected = useMemo(() => {
        switch (icon) {
            case 'dollar':
                return DollarIMG
            case 'arrowUp':
                return ArrowUpIMG
            case 'arrowDown':
                return ArrowDownIMG
        }
    }, [icon]);

    return (
        <Container color={ color }>
            <span>{ title }</span>
            <h1>
                <strong>R$ </strong>
                <CountUp
                    end={amount}
                    separator="."
                    decimal=","
                    decimals={2}
                />
            </h1>
            <small>{ footerLabel }</small>
            {iconSelected && <img src={iconSelected} alt={ title } />}
        </Container>
    )
}

export default WalletBox;