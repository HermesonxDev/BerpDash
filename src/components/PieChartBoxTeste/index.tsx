import Button from "../Button";
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

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

import getRandomColorFromHexPalette from "../../utils/getRandomColorFromHexPalette";
import { useState } from "react";
interface IPieChartProps {
    data: {
        name: string,
        value: number,
        percent: number,
        color: string
    }[]
}

const PieChartBoxTeste: React.FC<IPieChartProps> = ({ data }) => {

    const [periodSelected, setPeriodSelected] = useState('month');

    /*
    * --> TROCA DE PERIODO
    *      Verifica o periodo atual do gráfico e troca pelo o periodo que o
    *      usuário selecionar.
    */
    const handlePeriodClick = (period: string) => {
        if (periodSelected !== period) {
            setPeriodSelected(period)
        }
    }

    return (
        <Container>
            <HeaderRow>
                <SideLeft>
                    <h2>Relação</h2>
                    <LegendContainer>
                        {
                            data.map(indicator => (
                                <Legend key={indicator.name} color={indicator.color}>
                                    <div>{indicator.percent}%</div>
                                    <span>{indicator.name}</span>
                                </Legend>
                            ))
                        }
                        {
                            data.map(indicator => (
                                <Legend key={indicator.name} color={indicator.color}>
                                    <div>{indicator.percent}%</div>
                                    <span>{indicator.name}</span>
                                </Legend>
                            ))
                        }
                        {
                            data.map(indicator => (
                                <Legend key={indicator.name} color={indicator.color}>
                                    <div>{indicator.percent}%</div>
                                    <span>{indicator.name}</span>
                                </Legend>
                            ))
                        }
                        {
                            data.map(indicator => (
                                <Legend key={indicator.name} color={indicator.color}>
                                    <div>{indicator.percent}%</div>
                                    <span>{indicator.name}</span>
                                </Legend>
                            ))
                        }
                        {
                            data.map(indicator => (
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
                                data={data}
                                labelLine={false}
                                dataKey="percent"
                            >
                                {
                                    data.map(indicator => (
                                        <Cell key={indicator.name} fill={getRandomColorFromHexPalette()} />
                                    ))
                                }
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </SideRight>
            </HeaderRow>

            <Controllers>
                <Button
                    className={`${periodSelected === 'month' && 'tag-deactivate'}`}
                    onClick={() => handlePeriodClick('day')}
                >Dia</Button>

                <Button
                    className={`${periodSelected === 'day' && 'tag-deactivate'}`}
                    onClick={() => handlePeriodClick('month')}
                >Mês</Button>
            </Controllers>

            <FooterRow>
                <Descriptions>
                    <HistoryFinanceCard
                        tagColor="red"
                        title="Mesa"
                        subTitle="5%"
                        amount="R$650"
                        backgroundColor="secondary"
                    />

                    <HistoryFinanceCard
                        tagColor="blue"
                        title="Balcão"
                        subTitle="5%"
                        amount="R$650"
                        backgroundColor="secondary"
                    />

                    <HistoryFinanceCard
                        tagColor="gray"
                        title="Delivery"
                        subTitle="10%"
                        amount="R$1300"
                        backgroundColor="secondary"
                    />
                    <HistoryFinanceCard
                        tagColor="gray"
                        title="Delivery"
                        subTitle="10%"
                        amount="R$1300"
                        backgroundColor="secondary"
                    />
                    <HistoryFinanceCard
                        tagColor="gray"
                        title="Delivery"
                        subTitle="10%"
                        amount="R$1300"
                        backgroundColor="secondary"
                    />
                </Descriptions>
            </FooterRow>
        </Container>
    )
}

export default PieChartBoxTeste