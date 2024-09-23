import { useEffect, useState } from "react";
import Button from "../Button";
import HistoryFinanceCard from "../HistoryFinanceCard";

import {
    Container,
    HeaderRow,
    MainRow,
    FooterRow,
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
import HeaderChartInfo from "../HeaderChartInfo";

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
        type: string,
        labels: {
            [key: string]: string
        },
        [key: string]: any
    }
}

const BiaxialBarChartBox: React.FC<IBiaxialBarChartProps> = ({ data }) => {

    const [dataChart, setDataChart] = useState<DataType[]>([])
    const [controllers, setControllers] = useState<DataController[]>([])
    const [total, setTotal] = useState<number>(0)
    const [periodSelected, setPeriodSelected] = useState<string>('month')
    const [dynamicKeys, setDynamicKeys] = useState<string[]>([]);

    useEffect(() => {
        if (data) {
            setControllers(data.controllers)

            const updateDataChart = (period: string) => {
                const updatedData = data[period] || [];
                setDataChart(updatedData);

                let subTotal: number = 0;

                if (updatedData.length > 0) {
                    const keys = Object.keys(updatedData[0]).filter(key => key !== 'name' && key !== 'amount');
                    setDynamicKeys(keys);
                }

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
                <HeaderChartInfo
                    title={data.title}
                    subTitle={data.subTitle}
                    text={data.text}
                />
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

                        {dynamicKeys.map((key, index) => (
                            <Bar 
                                key={key} 
                                yAxisId={index % 2 === 0 ? "left" : "right"} 
                                dataKey={key} 
                                fill={index % 2 === 0 ? "#e44c4e" : "#f7931b"} 
                                name={data.labels[key] || key.charAt(0).toUpperCase() + key.slice(1)}
                            />
                        ))}
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
