import { useEffect, useState } from "react";
import { Container, HeaderRow, MainRow, FooterRow } from "./styles";

import HeaderChartInfo from "../HeaderChartInfo";

import formatCurrency from "../../utils/formatCurrency";
import { InfoCardControllers, InformationCardDataType } from "../../utils/interfaces";

interface IInformationCardProps {
    data: InformationCardDataType
}

const InformationCard: React.FC<IInformationCardProps> = ({ data }) => {

    const [total, setTotal] = useState<number>(0)

    useEffect(() => {
        if (data && data.controllers) {
            let subTotal: number = 0;

            data.controllers.forEach((item: InfoCardControllers) => {
                try {
                    subTotal += Number(item.amount);
                } catch {
                    throw new Error('Invalid amount! Amount must be number.');
                }
            });

            setTotal(subTotal);
        }
    }, [data]);

    return (
        <Container>
            <HeaderRow>
                <HeaderChartInfo
                    title={data.title}
                    text={data.text}
                />
            </HeaderRow>

            <MainRow>
                <h2>{formatCurrency(total)}</h2>
                <p>Vendas totais</p>
            </MainRow>

            <FooterRow>
                {data.controllers.map(controller => (
                    <div key={controller.label}>
                        <h3>{formatCurrency(controller.amount)}</h3>
                        <p>{controller.label}</p>
                    </div>
                ))}
            </FooterRow>
        </Container>
    )
}

export default InformationCard;
