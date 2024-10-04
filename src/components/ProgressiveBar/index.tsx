import { useEffect, useState } from "react";
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
    color: string,
    value: number
}

interface IProgressiveBarProps {
    data: {
        goal: GoalTypeData,
        currentValue: number,
        generatedDate: string,
        isMoney: boolean,
        title: string,
        text: string,
        type: string
    }
}

const ProgressiveBar: React.FC<IProgressiveBarProps> = ({ data }) => {

    /*
    * --> VARIÁVEIS DE AJUSTE DO GRÁFICO
    *       pieCX - Ajusta o posicionamento horizontal do gráfico
    *       pieCY - Ajusta o posicionamento vertical do gráfico
    *       pieWidth - Ajusta a largura do gráfico
    *       pieHeight - Ajusta a altura do gráfico
    *       needleCX - Ajusta o posicionamento horizontal da agulha
    *       needleCY - Ajusta o posicionamento vertical da agulha
    *       iR - Ajusta a largura do gráfico
    *       OR - Ajusta o tamanho do gráfico
    */
    const [pieCX, setPieCX] = useState<string>('60%') 
    const [pieCY, setPieCY] = useState<string>('100%')
    const [pieWidth, setPieWidth] = useState<number>(500)
    const [needleCX, setNeedleCX] = useState<number>(290)
    const pieHeight = 110;
    const needleCY = 100;
    const iR = 70;
    const oR = 100;

    const RADIAN = Math.PI / 180;
    
    const goalOfDay = [data.goal]
    const value = data.currentValue;

    const percentage = (value / data.goal.value) * 100;

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

    useEffect(() => {
        const handleResize = () => {

            if (window.innerWidth <= 1280) {
                setPieCX('50%')
                setNeedleCX(235)
            }

            if (window.innerWidth <= 768) {
                setPieCX('70%')
                setNeedleCX(240)
            }

            if (window.innerWidth <= 420) {
                setPieCX('50%')
                setPieCY('100%')
                setNeedleCX(160)
                setPieWidth(350)
            }
            
            if (window.innerWidth <= 400) {
                setPieCX('45%')
                setPieCY('100%')
                setNeedleCX(140)
            }
        }

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, [])

    return (
        <Container>
            <HeaderRow>
                <HeaderChartInfo
                    title={data.title}
                    text={data.text}
                />
            </HeaderRow>

            <MainRow>
                <PieChart width={pieWidth} height={pieHeight}>
                <Pie
                    dataKey="value"
                    startAngle={180}
                    endAngle={0}
                    data={goalOfDay}
                    cx={pieCX}
                    cy={pieCY}
                    innerRadius={iR}
                    outerRadius={oR}
                    stroke="none"
                >
                    {goalOfDay.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Pie>
                    {needle(value, goalOfDay, needleCX, needleCY, iR, oR, '#d0d000')}
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
