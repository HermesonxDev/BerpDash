import { useMemo, useState, useEffect } from "react";
import { Container, Content, Filters, TotalRow, HeaderTotalRow, Clock } from "./styles";
import { useParams } from "react-router-dom";

import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";
import HistoryFinanceCard from "../../components/HistoryFinanceCard";
import Loading from "../../components/Loading";

import formatCurrency from "../../utils/formatCurrency";
import formatDate from "../../utils/formatDate";
import listOfMonths from "../../utils/months";
import getYears from "../../utils/getYears";

import { useFirestore } from "../../hooks/firestore";
import { useGlobal } from "../../hooks/global";


/* TIPANDO A FORMA COMO OS DADOS DEVEM SER FORNECIDOS AO COMPONENTE */

interface DataType {
    amount: string,
    date: string,
    description: string,
    frequency: string,
    id: string,
    type: string,
    unit: string
}
interface IData {
    id: string,
    description: string,
    amountFormatted: string,
    frequency: string,
    dateFormatted: string,
    tagColor: string,
    unit:string,
}

interface UnitData {
    id: string,
    expenses: Record<string, DataType>,
    gains: Record<string, DataType>
}

/* COMPONENTE DA PÁGINA */
const List: React.FC = () => {
    
    const {
        unitSelected,
        monthSelected,
        yearSelected,
        setUnitSelected,
        setMonthSelected,
        setYearSelected
    } = useGlobal()

    const {
        user,
        getFirestore
    } = useFirestore()
    
    const { type } = useParams();

    const { documents: listOfUnits, loading: loadingListOfUnits } = getFirestore('units');
    const { documents: unitsData } = getFirestore('unitsData')

    const [data, setData] = useState<IData[]>([]);
    const [subData, setSubData] = useState<DataType[]>([]);
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [frequencySelected, setFrequencySelected] = useState(['recorrente', 'eventual']);
    
    const urlParams = useMemo(() => {
        return type === 'entry-balance'
        ?
        { title: 'Entradas', lineColor: '#4e41f0' }
        :
        { title: 'Saídas', lineColor: '#e44c4e' }
    }, [type]);


    /*
    * --> GUARDA OS DADOS A SEREM MOSTRADOS NO INPUT DE UNIDADES
    *      Verifica quais unidades o usuário possui, e pega as informações
    *      dessas unidades na base de dados.
    */
    const units = useMemo(() => {
        const filteredUnits = listOfUnits.filter(unit => user.units.includes(unit.id));

        return filteredUnits.map(unit => ({
            value: unit.cnpj,
            label: unit.name,
        }));
    }, [user, listOfUnits]);
    

    /*
    * --> GUARDA OS DADOS A SEREM MOSTRADOS NO INPUT DE MESES
    *      Mapeia a lista de meses fornecida pelos utilitários e
    *      devolve o nome de cada mês e seu valor.
    */
    const months = useMemo(() => {
        return listOfMonths.map((month, index) => {
            return {
                value: index + 1,
                label: month,
            }
        });

    }, []);


    /*
    * --> GUARDA OS DADOS A SEREM MOSTRADOS NO INPUT DE ANOS
    *      Mantém atualizado, o ano atual e os 4 anos anteriores a ele,
    *      fazendo com que se mantenham sempre 5 opções de anos para o
    *      usuário selecionar.
    */
    const years = useMemo(() => {
        const listOfYears = getYears()

        return listOfYears.map(year => {
            return {
                value: year,
                label: year,
            }
        });

    }, [user, listOfUnits]);


    /*
    * --> GUARDA OS DADOS DA UNIDADE SELECIONADA PELO USUÁRIO
    *      Carrega todas as despesas e ganhos da unidade selecionada,
    *      pelo usuário, no determinado mês e ano, para ser usado
    *      na aplicação.
    */
    const unitData: UnitData | undefined = unitsData.find(unit => {
        const unitID = unit.id;
        const year = String(yearSelected);
        const month = monthSelected > 9 ? String(monthSelected) : "0" + String(monthSelected);
        return unitID === unitSelected + year + month;
    })


    /*
    * --> GUARDA O TIPO DE DADO USADO NA PÁGINA
    *      Verifica pela URL qual tipo de dado o usuário está querendo visualizar,
    *      devolvendo esses dados para serem utilizados.
    */
    useEffect(() => {
        if (unitData) {
            if (type === 'entry-balance') {
                const gainsArray = Object.values(unitData.gains);
                setSubData(gainsArray); 
            } else {
                const expensesArray = Object.values(unitData.expenses);
                setSubData(expensesArray);
            }
        }
    }, [unitData])


    /*
    * --> FORMATA E FILTRA OS DADOS A SEREM MOSTRADOS
    *      Formata a data e o valores númericos para o padrão do Brasil,
    *      e também, verifica quais filtros estão ativos para mostrar,
    *      somente os dados com as frequencias selecionadas.
    */
    useEffect(() => {
        const formattedData = subData
        .filter(item => frequencySelected.includes(item.frequency))
        .map(item => {
            return {
            id: item.id,
            description: item.description,
            amountFormatted: formatCurrency(Number(item.amount)),
            frequency: item.frequency,
            dateFormatted: formatDate(item.date),
            tagColor: item.frequency === 'recorrente' ? '#4e41f0' : '#e44c4e',
            unit: item.unit
            }
        })

        setData(formattedData)

        const totalAmount = subData
        .filter(item => frequencySelected.includes(item.frequency))
        .reduce((acc, item) => acc + Number(item.amount), 0)

        setTotalAmount(totalAmount)
    }, [subData, monthSelected, yearSelected, unitSelected, frequencySelected])


    /*
    * --> FILTROS DE CARD
    *      Verifica os filtros selecionados pelo usuário e devolve essa
    *      informação para que sejam exibidos somente os dados requisitados.
    */
    const handleFrequencyClick = (frequency: string) => {
        const alreadySelected = frequencySelected.findIndex(item => item === frequency);

        if(alreadySelected >= 0) {
            const filtered = frequencySelected.filter(item => item !== frequency);
            setFrequencySelected(filtered);
        } else {
            setFrequencySelected((prev) => [ ...prev, frequency]);
        }
    }


    /*
    * --> SETA O MÊS SELECIONADO PELO USUÁRIO
    *      Recebe o valor do mês selecionado e converte para o tipo Number
    *      para ser usado nos filtros de gráficos.
    */
    const handleMonthSelected = (month: string) => {
        try {
            const parseMonth = Number(month);
            setMonthSelected(parseMonth);
        } catch {
            throw new Error('Invalid month value. Is accept 0 - 24.')
        }
    }


    /*
    * --> SETA O ANO SELECIONADO PELO USUÁRIO
    *      Recebe o valor do ano selecionado e converte para o tipo Number
    *      para ser usado nos filtros de gráficos.
    */
    const handleYearSelected = (year: string) => {
        try {
            const parseYear = Number(year);
            setYearSelected(parseYear);
        } catch {
            throw new Error('Invalid year value. Is accept integer numbers.')
        }
    }

    if (loadingListOfUnits) {
        return <Loading />
    }

    return (
        <Container>

            <ContentHeader title={urlParams.title} lineColor={urlParams.lineColor}>

                <SelectInput
                    options={units}
                    selectedValue={(e) => setUnitSelected(e.target.value)}
                    defaultValue={unitSelected}
                />

                <SelectInput
                    options={months}
                    selectedValue={(e) => handleMonthSelected(e.target.value)}
                    defaultValue={monthSelected}
                />

                <SelectInput
                    options={years}
                    selectedValue={(e) => handleYearSelected(e.target.value)}
                    defaultValue={yearSelected}
                />

            </ContentHeader>

            <Filters>
                <button
                    className={
                        `tag-filter tag-filter-recurrent
                        ${frequencySelected.includes('recorrente') && 'tag-actived'}`
                    }
                    onClick={() => handleFrequencyClick('recorrente')}
                >Recorrentes</button>

                <button
                    className={
                        `tag-filter tag-filter-eventual
                        ${frequencySelected.includes('eventual') && 'tag-actived'}`
                    }
                    onClick={() => handleFrequencyClick('eventual')}
                >Eventuais</button>
            </Filters>

            <TotalRow>
                <HeaderTotalRow>
                    <div>
                        <h2>Valor total</h2>
                        <h5>Com base na venda recebida</h5>
                    </div>

                    <div>
                        <Clock />
                        <p>Última atualização á 1 minuto atrás</p>
                    </div>
                </HeaderTotalRow>
                <h2>{formatCurrency(totalAmount)}</h2>
            </TotalRow>

            <Content>
                {
                    /* 
                    * --> RENDERIZANDO OS CARDS
                    *      O componente é alimentado com os dados que devem
                    *      ser mostrados ao usuário.
                    */
                    data && data.length > 0 ? (
                        data.map(item => (
                            <HistoryFinanceCard
                                key={item.id}
                                tagColor={item.tagColor}
                                title={item.description}
                                subTitle={item.dateFormatted}
                                amount={item.amountFormatted}
                            />
                        ))
                    ) : (
                        /* CASO NENHUM DADO TENHA SIDO FORNECIDO */
                        <h3>NENHUM REGISTRO ENCONTRADO NESSA DATA</h3>
                    )
                }
            </Content>
        </Container>
    )
}

export default List;