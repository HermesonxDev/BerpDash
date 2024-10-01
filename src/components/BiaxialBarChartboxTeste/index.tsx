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

interface InformationType {
    title: string,
    subTitle: string,
    amount: number
}

interface IBiaxialBarChartProps {
    data: {
        controllers: DataController[],
        generatedDate: string,
        isMoney: boolean,
        information: {
            [key: string]: InformationType
        },
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
    const [information, setInformation] = useState<InformationType | null>(null)
    const [periodSelected, setPeriodSelected] = useState<string>('month')
    const [dynamicKeys, setDynamicKeys] = useState<string[]>([]);

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

        if (!data[controller.value]) {
            return false;
        }

        return true;
    });

    useEffect(() => {
        if (data) {
            setControllers(data.controllers);

            const updateDataChart = (period: string) => {
                const updatedData = data[period] || [];
                setDataChart(updatedData);

                if (updatedData.length > 0) {
                    const keys = Object.keys(updatedData[0]).filter(key => key !== 'name' && key !== 'amount');
                    setDynamicKeys(keys);
                }
                
                const updatedInformation = data.information[period];
                setInformation(updatedInformation);
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
                    <BarChart data={dataChart}>
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
            </MainRow>

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
                {information &&
                    <HistoryFinanceCard
                        title={information.title}
                        subTitle={information.subTitle}
                        amount={
                            data.isMoney
                            ? formatCurrency(information.amount)
                            : String(information.amount)
                        }
                        backgroundColor="secondary"
                    />
                }
            </FooterRow>
        </Container>
    )
}

export default BiaxialBarChartBox;
