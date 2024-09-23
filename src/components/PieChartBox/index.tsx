import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

import HistoryFinanceCard from "../HistoryFinanceCard";
import {
    Container,
    HeaderRow,
    SideLeft,
    SideRight,
    LegendContainer,
    Legend,
    FooterRow,
    Controllers,
    Descriptions
} from "./styles";

import Button from "../Button";
import formatCurrency from "../../utils/formatCurrency";
import HeaderChartInfo from "../HeaderChartInfo";

interface DataType {
    name: string,
    amount: number,
    percent: number,
    color: string
}

interface DataController {
    name: string,
    value: string
}
interface IPieChartProps {
    data: {
        controllers: DataController[],
        generatedDate: string,
        isMoney: boolean,
        showTotal: Boolean,
        title: string,
        subTitle: string,
        text: string,
        type: string,
        [key: string]: any
    }
}

const PieChartBox: React.FC<IPieChartProps> = ({ data }) => {

    const [dataChart, setDataChart] = useState<DataType[]>([])
    const [controllers, setControllers] = useState<DataController[]>([])
    const [total, setTotal] = useState<number>(0)
    const [periodSelected, setPeriodSelected] = useState<string>('month')


    const isCurrentMonth = () => {
        if (!data.generatedDate) return false;
        
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const generatedDate = new Date(data.generatedDate);
        const generatedMonth = generatedDate.getMonth();
        
        return currentMonth === generatedMonth;
    }

    const filteredControllers = controllers.filter(controller => {
        if (controller.value === "day" && !isCurrentMonth()) {
            return false;
        }
        return true;
    })

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
            <HeaderChartInfo
                title={data.title}
                subTitle={data.subTitle}
                text={data.text}
            />
            <HeaderRow>
                <SideLeft>
                    <LegendContainer>
                        {
                            dataChart.map(indicator => (
                                <Legend key={indicator.name} color={indicator.color}>
                                    <div>{indicator.percent}%</div>
                                    <span>{indicator.name}</span>
                                </Legend>
                            ))
                        }
                    </LegendContainer>
                </SideLeft>

                <SideRight>
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie
                                data={dataChart}
                                labelLine={false}
                                dataKey="percent"
                                stroke="none"
                            >
                                {
                                    dataChart.map(indicator => (
                                        <Cell
                                            key={indicator.name}
                                            fill={indicator.color}
                                        />
                                    ))
                                }
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </SideRight>
            </HeaderRow>

            <Controllers>
                {filteredControllers.map(controller => (
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

            <FooterRow>
                <Descriptions>
                    {
                        dataChart.map(indicator => (
                            <HistoryFinanceCard
                                key={indicator.name}
                                tagColor={indicator.color}
                                title={indicator.name}
                                subTitle="5%"
                                amount={
                                    data.isMoney
                                    ? formatCurrency(indicator.amount)
                                    : String(indicator.amount)
                                }
                                backgroundColor="secondary"
                            />
                        ))
                    }
                </Descriptions>
            </FooterRow>

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
        </Container>
    )
}

export default PieChartBox