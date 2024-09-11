import { useEffect, useState } from "react";
import { Clocks, Container, HeaderRow, MainRow, FooterRow } from "./styles";
import formatCurrency from "../../utils/formatCurrency";

interface DataController {
    label: string,
    amount: number
}
interface IInformationCardProps {
    data: {
        controllers: DataController[],
        generatedDate: string,
        isMoney: boolean,
        title: string,
        subTitle: string,
        text: string
    }
}

const InformationCard: React.FC<IInformationCardProps> = ({ data }) => {

    const [total, setTotal] = useState<number>(0)

    useEffect(() => {
        if (data && data.controllers) {
            let subTotal: number = 0;

            data.controllers.forEach((item: DataController) => {
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
                <div>
                    <h2>{data.title}</h2>
                    <h5>{data.subTitle}</h5>
                </div>

                <div>
                    <Clocks />
                    <p>{data.text}</p>
                </div>
            </HeaderRow>

            <MainRow>
                <h2>{
                    data.isMoney
                    ? formatCurrency(total)
                    : total
                }</h2>
                <p>Vendas totais</p>
            </MainRow>

            <FooterRow>
                {data.controllers.map(controller => (
                    <div key={controller.label}>
                        <h3>{
                            data.isMoney
                            ? formatCurrency(controller.amount)
                            : controller.amount
                        }</h3>
                        <p>{controller.label}</p>
                    </div>
                ))}
            </FooterRow>
        </Container>
    )
}

export default InformationCard;
