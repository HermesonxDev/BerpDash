import { useEffect, useState } from "react";
import Button from "../Button";
import HistoryFinanceCard from "../HistoryFinanceCard";

import {
    Container,
    HeaderRow,
    MainRow,
    FooterRow,
    Clock,
    Controllers
} from "./styles";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';
import formatCurrency from "../../utils/formatCurrency";

interface DataController {
    name: string,
    value: string
}

interface DataType {
    name: string,
    sales: number,
    costumers: number,
    amount: number
}

interface IBiaxialBarChartProps {
    data: {
        controllers: DataController[],
        generatedDate: string,
        isMoney: boolean,
        showTotal: boolean,
        title: string,
        subTitle: string,
        text: string,
        [key: string]: any
    }
}

const BiaxialBarChartBox: React.FC<IBiaxialBarChartProps> = ({ data }) => {

    const [dataChart, setDataChart] = useState<DataType[]>([])
    const [controllers, setControllers] = useState<DataController[]>([])
    const [total, setTotal] = useState<number>(0)
    const [periodSelected, setPeriodSelected] = useState<string>('month')

    useEffect(() => {
        if (data) {
            setControllers(data.controllers)

            const updateDataChart = (period: string) => {
                const updatedData = data[period] || [];
                setDataChart(updatedData);

                let subTotal: number = 0;

                updatedData.forEach((item: DataType) => {
                    try {
                        subTotal += Number(item.amount);
                    } catch {
                        throw new Error('Invalid amount! Amount must be number.');
                    }
                });

                setTotal(subTotal);
            }

            updateDataChart(periodSelected);
        }
    }, [periodSelected, data])

    return (
        <Container>
            <HeaderRow>
                <div>
                    <h2>Venda por horário</h2>
                    <h5>Com base na venda recebida</h5>
                </div>

                <div>
                    <Clock />
                    <p>Última atualização á 1 minuto atrás</p>
                </div>
            </HeaderRow>

            <MainRow>
                <ResponsiveContainer>
                    <BarChart data={dataChart} >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" stroke="#ffffff"/>
                        <YAxis yAxisId="left" orientation="left" stroke="#ffffff" />
                        <YAxis yAxisId="right" orientation="right" stroke="#ffffff" />
                        <Tooltip />
                        <Legend />
                        <Bar yAxisId="left" dataKey="sales" fill="#e44c4e" name="Vendas"/>
                        <Bar yAxisId="right" dataKey="costumers" fill="#f7931b" name="Clientes"/>
                    </BarChart>
                </ResponsiveContainer>

                <Controllers>
                    {controllers.map(controller => (
                        <Button
                            key={controller.name}
                            className={
                                periodSelected !== controller.value ? 'tag-deactivate' : ''
                            }
                            onClick={() => setPeriodSelected(controller.value)}
                        >
                            {controller.name}
                        </Button>
                    ))}
                </Controllers>
            </MainRow>

            <FooterRow>
                {data.showTotal &&
                    <HistoryFinanceCard
                        title="Total"
                        subTitle="5%"
                        amount={
                            data.isMoney
                            ? formatCurrency(total)
                            : String(total)
                        }
                        backgroundColor="secondary"
                    />
                }
            </FooterRow>
        </Container>
    )
}

export default BiaxialBarChartBox;
