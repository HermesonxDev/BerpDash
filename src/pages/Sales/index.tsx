import { Container, Content } from "./styles";
import { useCallback, useMemo } from "react";

import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";
import Loading from "../../components/Loading";
import PieChartBox from "../../components/PieChartBox";
import BiaxialBarChartBox from "../../components/BiaxialBarChartbox";

import { useGlobal } from "../../hooks/global";
import { useFirestore } from "../../hooks/firestore";

import listOfMonths from "../../utils/months";
import getYears from "../../utils/getYears";

import PieChartData from "../../mock/PieChartData";
import PieChartData2 from "../../mock/PieChartData2";
import BiaxialBarChartData from "../../mock/BiaxialBarChartData";
import BiaxialBarChartData2 from "../../mock/BiaxialBarChartData2";

interface DataType {
    amount: string,
    date: string,
    description: string,
    frequency: string,
    id: string,
    type: string,
    unit: string
}

interface ControllersType {
    name: string,
    value: string
}

interface ControllerDataType {
    name: string,
    color: string,
    amount: number,
    percent: number
}

interface ModuleDataController {
    controllerName: string,
    controllerItem: ControllerDataType[]
}

interface ModuleType {
    name: {
        title: string,
        subTitle: string,
        guid: string,
        generatedDate: string,
        isMoney: boolean,
        showTotal: boolean,
        data: ModuleDataController,
        controllers: ControllersType[]
    }
}

interface ModuleDataType {
    data: {
        bar: ModuleType,
        card: ModuleType,
        info: ModuleType,
        line: ModuleType,
        pizza: ModuleType,
        list: ModuleType,
    }
}

interface UnitData {
    id: string,
    estoque: ModuleDataType,
    delivery: ModuleDataType,
    vendas: ModuleDataType,
    caixa: ModuleDataType,
    financeiro: ModuleDataType,
    auditoria: ModuleDataType,
    expenses: Record<string, DataType>,
    gains: Record<string, DataType>,
}

const Sales: React.FC = () => {

    const {
        unitSelected,
        monthSelected,
        yearSelected,
        setUnitSelected,
        setMonthSelected,
        setYearSelected
    } = useGlobal()

    const { user, getFirestore } = useFirestore()

    const { documents: listOfUnits, loading: loadingListOfUnits } = getFirestore('units');
    const { documents: unitsData } = getFirestore('unitsData')

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
    * --> SETA O MÊS SELECIONADO PELO USUÁRIO
    *      Recebe o valor do mês selecionado e converte para o tipo Number
    *      para ser usado nos filtros de gráficos.
    */
    const handleMonthSelected = useCallback((month: string) => {
        try {
            const parseMonth = Number(month);
            setMonthSelected(parseMonth);
        } catch (error) {
            throw new Error('Invalid month value. Is accept 0 - 24.')
        }
    }, [])


    /*
    * --> SETA O ANO SELECIONADO PELO USUÁRIO
    *      Recebe o valor do ano selecionado e converte para o tipo Number
    *      para ser usado nos filtros de gráficos.
    */
    const handleYearSelected = useCallback((year: string) => {
        try {
            const parseYear = Number(year);
            setYearSelected(parseYear);
        } catch (error) {
            throw new Error('Invalid year value. Is accept integer numbers.')
        }
    }, [])

    if (loadingListOfUnits) {
        return <Loading />
    }

    return (
        <Container>
            <ContentHeader title="Vendas" lineColor="#f7931b">
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

            <Content>
                <PieChartBox data={PieChartData}/>
                <PieChartBox data={PieChartData2}/>

                <BiaxialBarChartBox data={BiaxialBarChartData}/>
                <BiaxialBarChartBox data={BiaxialBarChartData2}/>
            </Content>
        </Container>
    )
}

export default Sales