import { useCallback, useEffect, useMemo, useState } from "react";
import { Container, Content } from "./styles";

import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";
import WalletBox from "../../components/WalletBox";

import listOfMonths from "../../utils/months";
import getYears from "../../utils/getYears";

import Loading from "../../components/Loading";
import { useFirestore } from "../../hooks/firestore";
import { useGlobal } from "../../hooks/global";

interface DataType {
    amount: string,
    date: string,
    description: string,
    frequency: string,
    id: string,
    type: string,
    unit: string
}

interface UnitData {
    id: string,
    expenses: Record<string, DataType>,
    gains: Record<string, DataType>,
}


const Dashboard: React.FC = () => {

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

    const [expenses, setExpenses] = useState<DataType[]>([]);
    const [gains, setGains] = useState<DataType[]>([]);

    const [totalGains, setTotalGains] = useState<number>(0)
    const [totalExpenses, setTotalExpenses] = useState<number>(0)
    const [totalBalance, setTotalBalance] = useState<number>(0)


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
    * --> SEPARA OS DADOS QUE SERAM USADO NA APLICAÇÃO
    *      Sempre que o usuário selecionar a unidade, mês e ano, um array
    *      de dados sobre aquela unidade sera carregado do firebase
    *      aqui, e será separado os ganhos e despesas da unidade.
    */
    // useEffect(() => {
    //     if (unitData) {
    //         const expensesArray = Object.values(unitData.expenses);
    //         const gainsArray = Object.values(unitData.gains);

    //         setExpenses(expensesArray);
    //         setGains(gainsArray);
    //     }
    // }, [unitData])


    /*
    * --> CALCULA O VALOR TOTAL DAS DESPESAS
    *       Soma e devolve todos os valores das saídas do mês
    *       selecionado pelo usuário.
    */
    // useEffect(() => {
        
    //     let total: number = 0
        
    //     expenses.forEach(item => {
    //         try {
    //                 total += Number(item.amount)
    //             } catch {
    //                 throw new Error('Invalid amount! Amount must be number.')
    //             }
    //         }
    //     )

    //     setTotalExpenses(total)
    // }, [monthSelected, yearSelected, unitSelected, expenses]);


    /*
    * --> CALCULA O VALOR TOTAL DOS GANHOS
    *       Soma e devolve todos os valores das entradas do mês
    *       selecionado pelo usuário.
    */
    // useEffect(() => {
    //     let total: number = 0;
    
    //     gains.forEach(item => {
    //       try {
    //           total += Number(item.amount);
    //         } catch {
    //           throw new Error('Invalid amount! Amount must be number.');
    //         }
    //       }
    //     );
    
    //     setTotalGains(total);
    // }, [monthSelected, yearSelected, unitSelected, gains]);


    /*
    * --> CALCULA O VALOR TOTAL DO SALDO
    *       Realiza a subtraçao das saídas sobre os ganhos para
    *       mostrar o valor do saldo adquirido no mês selecionado
    *       pelo usuário.
    */
    // useEffect(() => {
    //     setTotalBalance(totalGains - totalExpenses)
    // }, [totalGains, totalExpenses]);


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
            <ContentHeader title="Dashboard" lineColor="#f7931b">
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
                {/* <WalletBox 
                    title="saldo"
                    amount={totalBalance}
                    footerLabel="Atualizado com base nas entradas e saídas"
                    color="#4e41f0"
                    icon="dollar"
                />

                <WalletBox 
                    title="entradas"
                    amount={totalGains}
                    footerLabel="Atualizado com base nas entradas e saídas"
                    color="#f7931b"
                    icon="arrowUp"
                />

                <WalletBox 
                    title="saídas"
                    amount={totalExpenses}
                    footerLabel="Atualizado com base nas entradas e saídas"
                    color="#e44c4e"
                    icon="arrowDown"
                /> */}
            </Content>
        </Container>
    )
}

export default Dashboard;