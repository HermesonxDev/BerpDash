import { useMemo, useState, useEffect } from "react";
import { Container, Content, Filters } from "./styles";
import { useParams } from "react-router-dom";

import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";
import HistoryFinanceCard from "../../components/HistoryFinanceCard";
import Loading from "../../components/Loading";

import formatCurrency from "../../utils/formatCurrency";
import formatDate from "../../utils/formatDate";
import listOfMonths from "../../utils/months";
import { useFirestore } from "../../hooks/firestore";
import getYears from "../../utils/getYears";


/* TIPANDO A FORMA COMO OS DADOS DEVEM SER FORNECIDOS AO COMPONENTE */
interface IData {
    id: string,
    description: string,
    amountFormatted: string,
    frequency: string,
    dateFormatted: string,
    tagColor: string,
    unit:string,
}

/* COMPONENTE DA PÁGINA */
const List: React.FC = () => {
    
    const [unitSelected, setUnitSelected] = useState<string>('01');
    const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1);
    const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear());
    const [frequencySelected, setFrequencySelected] = useState(['recorrente', 'eventual']);
    const [data, setData] = useState<IData[]>([]);
    
    const { type } = useParams();

    const { user, getFirestore } = useFirestore()
    
    const urlParams = useMemo(() => {
        return type === 'entry-balance'
        ?
        { title: 'Entradas', lineColor: '#4e41f0' }
        :
        { title: 'Saídas', lineColor: '#e44c4e' }
    }, [type]);


    /*
    * --> GUARDA A COLEÇÃO USADA NA PÁGINA
    *      Verifica pela URL qual tipo de dado o usuário está querendo visualizar,
    *      devolvendo esses dados para serem utilizados.
    */
    const collection = useMemo(() => {
        return type === 'entry-balance' ? 'gains' : 'expenses'
    }, [type]);


    /*
    * --> GUARDA OS DOCUMENTOS DA COLEÇÃO
    *      Trás do firebase os documentos da coleção a serem usados na página,
    *      assim como variáveis auxiliares (documents, loading, error)
    */
    const { documents, loading } = getFirestore(collection)

    const { documents: databaseUnits, loading: loadingUnits } = getFirestore('units');

    /*
    * --> GUARDA OS DADOS A SEREM MOSTRADOS NO INPUT DE UNIDADES
    *      Verifica quais unidades o usuário possui, e pega as informações
    *      dessas unidades na base de dados.
    */
    const units = useMemo(() => {
        const filteredUnits = databaseUnits.filter(unit => user.units.includes(unit.id));

        return filteredUnits.map(unit => ({
            value: unit.unit_id,
            label: unit.name,
        }));
    }, [user, databaseUnits]);
    

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

    }, [user, databaseUnits]);


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


    /* MANTENDO A PÁGINA EM CONSTANTE ATUALIZAÇÃO */
    useEffect(() => {

        /*
        * --> FILTRA OS DADOS POR UNIDADE
        *      Carrega somente os dados da unidade selecionada pelo usuário.  
        */
        const filteredDataByUnit = documents.filter(item => {
            const unit = item.unit;
            return unit === unitSelected;
        });


        /*
        * --> FILTRA OS DADOS POR MÊS E ANO
        *      Verifica se o mês e ano selecionado pelo usuário
        *      bate com o mês e ano dos dados fornecido pela base de dados.
        *      E mostra eles de acordo com os filtros ativados (Recorrentes ou Eventuais).
        */
        const filteredData = filteredDataByUnit.filter(item => {
            const date = new Date(item.date);
            const month = date.getMonth() + 1;
            const year = date.getFullYear();

            return month === monthSelected
            && year === yearSelected
            && frequencySelected.includes(item.frequency);
        });


        /*
        * --> MAPEIA OS DADOS DE ACORDO COM A TIPAGEM ESTABELECIDA DOS CARDS
        *      Distribui e formata os dados de acordo com os campos
        *      fornecidos pela interface dos cards.
        */
        const formattedData = filteredData.map(item => {
            return {
                id: item.id,
                description: item.description,
                amountFormatted: formatCurrency(Number(item.amount)),
                frequency: item.frequency,
                dateFormatted: formatDate(item.date),
                tagColor: item.frequency === 'recorrente' ? '#4e41f0' : "#e44c4e",
                unit: item.unit
            }
        });

        setData(formattedData)
    }, [documents, monthSelected, yearSelected, unitSelected, frequencySelected]);

    if (loading && loadingUnits) {
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
                                unit={item.unit}
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