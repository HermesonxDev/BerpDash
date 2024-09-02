import {
    Container,
    HeaderRow,
    SideLeft,
    SideRight,
    LegendContainer,
    Legend,
    FooterRow
} from "./styles";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface IPieChartProps {
    data: {
        name: string,
        value: number,
        percent: number,
        color: string
    }[]
}

const PieChartBox: React.FC<IPieChartProps> = ({ data }) => (
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
                                    <Cell key={indicator.name} fill={indicator.color} />
                                ))
                            }
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </SideRight>
        </HeaderRow>

        <FooterRow>

        </FooterRow>
    </Container>
)

export default PieChartBox