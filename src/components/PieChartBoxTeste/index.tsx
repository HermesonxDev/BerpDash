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

interface DataType {
    name: string,
    value: number,
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
        day: DataType[],
        month: DataType[]
    }
}

const PieChartBoxTeste: React.FC<IPieChartProps> = ({ data }) => {

    const [dataChart, setDataChart] = useState<DataType[]>([])
    const [controllers, setControllers] = useState<DataController[]>([])
    const [periodSelected, setPeriodSelected] = useState('month');

    useEffect(() => {
        if (data) {
            const controllersArray = Object.values(data.controllers)
            setControllers(controllersArray)

            if (periodSelected === 'month') {
                const monthArray = Object.values(data.month)
                setDataChart(monthArray)
            } else if (periodSelected === 'day') {
                const dayArray = Object.values(data.day)
                setDataChart(dayArray)
            }
        }
    }, [periodSelected, data])

    return (
        <Container>
            <HeaderRow>
                <SideLeft>
                    <h2>Relação</h2>
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
                {
                    controllers.map(controller => (
                        <Button
                            key={controller.name}
                            className={`${
                                periodSelected
                                !== controller.value
                                && 'tag-deactivate'
                            }`}
                            onChange={() => setPeriodSelected(controller.value)}
                        >{controller.name}</Button>
                    ))
                }
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
                                amount={String(indicator.value)}
                                backgroundColor="secondary"
                            />
                        ))
                    }
                </Descriptions>
            </FooterRow>
        </Container>
    )
}

export default PieChartBoxTeste