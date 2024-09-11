import formatCurrency from "../../utils/formatCurrency";
import HeaderChartInfo from "../HeaderChartInfo";

import {
    Container,
    HeaderRow,
    MainRow,
    FooterRow
} from "./styles";
import { PieChart, Pie, Cell} from 'recharts';

interface GoalTypeData {
    value: number,
    color: string
}

interface IProgressiveBarProps {
    data: {
        goal: GoalTypeData[],
        currentValue: number,
        generatedDate: string,
        isMoney: boolean,
        title: string,
        text: string
    }
}

const ProgressiveBar: React.FC<IProgressiveBarProps> = ({ data }) => {

    const RADIAN = Math.PI / 180;
    
    const goalOfDay = data.goal
    const value = data.currentValue;

    const cx = 240;
    const cy = 100;
    const iR = 50;
    const oR = 100;

    const percentage = (value / goalOfDay[0].value) * 100;

    const needle = (
        value: number, 
        goalOfDay: {value: number, color: string }[], 
        cx: number, 
        cy: number, 
        iR: number, 
        oR: number, 
        color: string
    ) => {
        let total = 0;

        goalOfDay.forEach((v) => {
            total += v.value;
        });

        const ang = 180.0 * (1 - value / total);
        const length = (iR + 2 * oR) / 3;
        const sin = Math.sin(-RADIAN * ang);
        const cos = Math.cos(-RADIAN * ang);
        const r = 5;
        const x0 = cx + 5;
        const y0 = cy + 5;
        const xba = x0 + r * sin;
        const yba = y0 - r * cos;
        const xbb = x0 - r * sin;
        const ybb = y0 + r * cos;
        const xp = x0 + length * cos;
        const yp = y0 + length * sin;

        return [
            <circle key="circle" cx={x0} cy={y0} r={r} fill={color} stroke="none" />,
            <path key="path" d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`} stroke="#none" fill={color} />,
        ];
    };

    return (
        <Container>
            <HeaderRow>
                <HeaderChartInfo
                    title={data.title}
                    text={data.text}
                />
            </HeaderRow>

            <MainRow>
                <PieChart width={500} height={110}>
                    <Pie
                        dataKey="value"
                        startAngle={180}
                        endAngle={0}
                        data={goalOfDay}
                        cx="50%"
                        cy="100%"
                        innerRadius={iR}
                        outerRadius={oR}
                        stroke="none"
                    >
                        {goalOfDay.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    {needle(value, goalOfDay, cx, cy, iR, oR, '#d0d000')}
                </PieChart>

                <h2>{percentage.toFixed(1)}%</h2>
            </MainRow>
            
            <FooterRow>
                <h2>{
                    data.isMoney
                    ? formatCurrency(goalOfDay[0].value)
                    : goalOfDay[0].value
                }</h2>
                <p>Meta do dia</p>
            </FooterRow>
        </Container>
    );
}

export default ProgressiveBar;
