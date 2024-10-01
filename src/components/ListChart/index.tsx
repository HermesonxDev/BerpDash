import { Container, HeaderRow, MainRow, TotalRow, Filters } from "./styles";
import HeaderChartInfo from "../HeaderChartInfo";
import formatCurrency from "../../utils/formatCurrency";
import { useEffect, useState } from "react";
import HistoryFinanceCard from "../HistoryFinanceCard";
import formatDate from "../../utils/formatDate";

interface DataController {
    name: string,
    value: string
}

interface DataType {
    id: string,
    title: string,
    sub_title: string,
    amount_field: string,
    sub_amount_field: string,
    date: string,
    type: string,
}

interface DataTypeFormatted {
    id: string,
    title: string,
    sub_title: string,
    amount_field_formatted: string,
    sub_amount_field_formatted: string,
    date_formatted: string,
    frequency: string,
    tagColor: string
}

interface IListChartProps {
    data: {
        controllers: DataController[],
        generatedDate: string,
        title: string,
        subTitle: string,
        text: string,
        type: string,
        data: DataType[]
    }
}

const ListChart: React.FC<IListChartProps> = ({ data }) => {

    const [listData, setListData] = useState<DataTypeFormatted[]>([]);
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [controllers, setControllers] = useState<DataController[]>([]);
    const [frequencySelected, setFrequencySelected] = useState(['month']);

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

        const periodExists = data.data.some(item => item.type === controller.value);
        return periodExists;
    });

    /*
    * --> FORMATA E FILTRA OS DADOS A SEREM MOSTRADOS
    *      Formata a data e os valores numéricos para o padrão do Brasil,
    *      e também verifica quais filtros estão ativos para mostrar
    *      somente os dados com os tipos selecionados.
    */
    useEffect(() => {
        if (data) {
            setControllers(data.controllers);

            const formattedData = data.data
                .filter(item => frequencySelected.includes(item.type))
                .map(item => {
                    return {
                        id: item.id,
                        title: item.title,
                        sub_title: item.sub_title,
                        amount_field_formatted: formatCurrency(Number(item.amount_field)),
                        sub_amount_field_formatted: formatCurrency(Number(item.sub_amount_field)),
                        frequency: item.type,
                        date_formatted: formatDate(item.date),
                        tagColor: item.type === 'recorrente' ? '#4e41f0' : '#e44c4e',
                    }
                });

            const totalAmount = data.data
                .filter(item => frequencySelected.includes(item.type))
                .reduce((acc, item) => acc + Number(item.amount_field), 0);

            setListData(formattedData);
            setTotalAmount(totalAmount);
        }
    }, [data, frequencySelected]);

    /*
    * --> FILTROS DE CARD
    *      Verifica os filtros selecionados pelo usuário e devolve essa
    *      informação para que sejam exibidos somente os dados requisitados.
    */
    const handleFrequencyClick = (frequency: string) => {
        const alreadySelected = frequencySelected.findIndex(item => item === frequency);

        if (alreadySelected >= 0) {
            const filtered = frequencySelected.filter(item => item !== frequency);
            setFrequencySelected(filtered);
        } else {
            setFrequencySelected((prev) => [...prev, frequency]);
        }
    }

    return (
        <Container>
            <HeaderRow>
                <HeaderChartInfo
                    title={data.title}
                    subTitle={data.subTitle}
                    text={data.text}
                />

                <Filters>
                    {filteredControllers.map(controller => (
                        <button
                            key={controller.value}
                            className={
                                `tag-filter tag-filter-recurrent
                                ${frequencySelected.includes(controller.value) && 'tag-actived'}`
                            }
                            onClick={() => handleFrequencyClick(controller.value)}
                        >
                            {controller.name}
                        </button>
                    ))}
                </Filters>

                <TotalRow>
                    <HeaderChartInfo title="Valor total" />
                    <h2>{formatCurrency(totalAmount)}</h2>
                </TotalRow>
            </HeaderRow>

            <MainRow>
                {
                    /* 
                    * --> RENDERIZANDO OS CARDS
                    *      O componente é alimentado com os dados que devem
                    *      ser mostrados ao usuário.
                    */
                    listData && listData.length > 0 ? (
                        listData.map(item => (
                            <HistoryFinanceCard
                                key={item.id}
                                title={item.title}
                                subTitle={item.date_formatted}
                                amount={item.amount_field_formatted}
                                tagColor={item.tagColor}
                                backgroundColor="secondary"
                            />
                        ))
                    ) : (
                        /* CASO NENHUM DADO TENHA SIDO FORNECIDO */
                        <h3>NENHUM REGISTRO ENCONTRADO NESSA DATA</h3>
                    )
                }
            </MainRow>
        </Container>
    )
}

export default ListChart;
