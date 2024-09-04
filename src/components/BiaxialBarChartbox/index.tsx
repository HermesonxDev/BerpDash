import {
    Container,
    HeaderRow,
    MainRow,
    FooterRow
} from "./styles";

import {
    BarChart,
    Bar,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

const BiaxialBarChartBox: React.FC = () => {

    const data = [
        {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
        {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
        {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
        {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
        {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
        {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
        {name: 'Page G', uv: 3490, pv: 4300, amt: 2100}
      ]

    return (
        <Container>
            <HeaderRow>
                <h2>Titulo do gráfico</h2>
                <h4>Subtitulo</h4>
            </HeaderRow>

            <MainRow>

            </MainRow>

            <FooterRow>

            </FooterRow>
        </Container>
    )
}

export default BiaxialBarChartBox