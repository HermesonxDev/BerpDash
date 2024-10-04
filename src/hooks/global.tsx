import { createContext, useState, useContext, useEffect, useMemo } from "react";

import { useFirestore } from "./firestore";

import listOfMonths from "../utils/months";
import getYears from "../utils/getYears";

import {
    AuditDataType,
    DeliveryDataType,
    FinancialDataType,
    PerformanceDataType,
    PosDataType,
    SalesDataType,
    StorageDataType,
    UnitDataType
} from "../utils/interfaces";

interface IListProps {
    value: string | number,
    label: string | number
}
interface IGlobalContext {
    units: IListProps[],
    months: IListProps[],
    years: IListProps[],
    unitSelected: string,
    monthSelected: number,
    yearSelected: number,
    unitData: UnitDataType | null,
    storageData: StorageDataType | null,
    salesData: SalesDataType | null,
    auditData: AuditDataType | null,
    financialData: FinancialDataType | null,
    performanceData: PerformanceDataType | null,
    posData: PosDataType | null,
    deliveryData: DeliveryDataType | null,
    setUnitSelected: React.Dispatch<React.SetStateAction<string>>,
    setMonthSelected: React.Dispatch<React.SetStateAction<number>>,
    setYearSelected: React.Dispatch<React.SetStateAction<number>>,
    loading: boolean,
}

const GlobalContext = createContext<IGlobalContext>({} as IGlobalContext)

const GlobalProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {

    const {
        user,
        getFirestore,
        getFirestoreWithID
    } = useFirestore()
    
    const { documents: listOfUnits } = getFirestore('units');

    const [units, setUnits] = useState<IListProps[]>(() => {
        const onUnit = localStorage.getItem('@dc5bf16b1811-Dashboard:units')
        return onUnit ? JSON.parse(onUnit) : []
    });

    const [unitSelected, setUnitSelectedState] = useState<string>(() => {
        const onUnitSelected = localStorage.getItem('@dc5bf16b1811-Dashboard:unitSelected')
        return onUnitSelected ? JSON.parse(onUnitSelected) : ''
    })

    const [monthSelected, setMonthSelectedState] = useState<number>(() => {
        const onMonthSelected = localStorage.getItem('@dc5bf16b1811-Dashboard:monthSelected')
        return onMonthSelected ? JSON.parse(onMonthSelected) : new Date().getMonth() + 1
    })

    const [yearSelected, setYearSelectedState] = useState<number>(() => {
        const onYearSelected = localStorage.getItem('@dc5bf16b1811-Dashboard:yearSelected')
        return onYearSelected ? JSON.parse(onYearSelected) : new Date().getFullYear()
    })

    const [unitData, setUnitData] = useState<UnitDataType | null>(null)
    const [storageData, setStorageData] = useState<StorageDataType | null>(null)
    const [salesData, setSalesData] = useState<SalesDataType | null>(null)
    const [auditData, setAuditData] = useState<AuditDataType | null>(null)
    const [financialData, setFinancialData] = useState<FinancialDataType | null>(null)
    const [performanceData, setPerformanceData] = useState<PerformanceDataType | null>(null)
    const [posData, setPosData] = useState<PosDataType | null>(null)
    const [deliveryData, setDeliveryData] = useState<DeliveryDataType | null>(null)
    const [loading, setLoading] = useState<boolean>(true);

    /*
    * --> GUARDA OS DADOS A SEREM MOSTRADOS NO INPUT DE MESES
    *      Mapeia a lista de meses fornecida pelos utilitários e
    *      devolve o nome de cada mês e seu valor.
    */
    const months = useMemo(() => {
        return listOfMonths.map((month, index) => ({
            value: index + 1,
            label: month,
        }));
    }, []);


    /*
    * --> GUARDA OS DADOS A SEREM MOSTRADOS NO INPUT DE ANOS
    *      Mantém atualizado, o ano atual e os 4 anos anteriores a ele,
    *      fazendo com que se mantenham sempre 5 opções de anos para o
    *      usuário selecionar.
    */
    const years = useMemo(() => {
        const listOfYears = getYears();
        return listOfYears.map(year => ({
            value: year,
            label: year,
        }));
    }, []);


    /*
    * --> GUARDA A UNIDADE SELECIONADA PELO USUÁRIO
    *      Verifica e guarda os dados da unidade selecionada pelo usuário no localstorage
    *      do navegador para ser usado em qualquer lugar da aplicação.
    */
    const setUnitSelected: React.Dispatch<React.SetStateAction<string>> = (value) => {
        if (typeof value === 'function') {
            setUnitSelectedState((prevState) => {
                const newUnit = value(prevState)

                localStorage.setItem(
                    '@dc5bf16b1811-Dashboard:unitSelected',
                    JSON.stringify(newUnit)
                )

                return newUnit;
            });
        } else {
            localStorage.setItem('@dc5bf16b1811-Dashboard:unitSelected', JSON.stringify(value));
            setUnitSelectedState(value);
        }
    }


    /*
    * --> GUARDA O MÊS SELECIONADA PELO USUÁRIO
    *      Verifica e guarda os dados do mês selecionado pelo usuário no localstorage
    *      do navegador para ser usado em qualquer lugar da aplicação.
    */
    const setMonthSelected: React.Dispatch<React.SetStateAction<number>> = (value) => {
        if (typeof value === 'function') {
            setMonthSelectedState((prevState) => {
                const newMonth = value(prevState)

                localStorage.setItem(
                    '@dc5bf16b1811-Dashboard:monthSelected',
                    JSON.stringify(newMonth)
                )

                return newMonth;
            });
        } else {
            localStorage.setItem('@dc5bf16b1811-Dashboard:monthSelected', JSON.stringify(value));
            setMonthSelectedState(value);
        }
    }


    /*
    * --> GUARDA O ANO SELECIONADA PELO USUÁRIO
    *      Verifica e guarda os dados do ano selecionado pelo usuário no localstorage
    *      do navegador para ser usado em qualquer lugar da aplicação.
    */
    const setYearSelected: React.Dispatch<React.SetStateAction<number>> = (value) => {
        if (typeof value === 'function') {
            setYearSelectedState((prevState) => {
                const newYear = value(prevState)

                localStorage.setItem(
                    '@dc5bf16b1811-Dashboard:yearSelected',
                    JSON.stringify(newYear)
                )

                return newYear;
            });
        } else {
            localStorage.setItem('@dc5bf16b1811-Dashboard:yearSelected', JSON.stringify(value));
            setYearSelectedState(value);
        }
    }


    /*
    * --> MANTÉM AS INFORMAÇÕES DAS UNIDADES DO USUÁRIO ATUALIZADAS
    *      Verifica e guarda os dados das unidades do usuário no localstorage
    *      do navegador, e atualiza sempre que o usuário receber uma nova unidade.
    */
    useEffect(() => {

        if (units) {
            const filteredUnits = listOfUnits
            .filter(unit => user.units.includes(unit.id))
            .map(unit => ({value: unit.cnpj, label: unit.name}))

            localStorage.setItem(
                '@dc5bf16b1811-Dashboard:units',
                JSON.stringify(filteredUnits)
            )

            setUnits(filteredUnits)
        }

    }, [listOfUnits, user.units]);


    /*
    * --> GUARDA OS DADOS DA UNIDADE SELECIONADA PELO USUÁRIO
    *      Carrega todas as despesas e ganhos da unidade selecionada,
    *      pelo usuário, no determinado mês e ano, para ser usado
    *      na aplicação.
    */
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)

            const searchLabel =
                unitSelected
                + String(yearSelected)
                + (
                    monthSelected > 9
                    ? String(monthSelected)
                    : "0" + String(monthSelected)
                );

            try {
                const data = await getFirestoreWithID('unitsData', searchLabel);

                if(data) {
                    setUnitData(data);
                    setStorageData(data.estoque.dataCharts);
                    setSalesData(data.vendas.dataCharts);
                    setAuditData(data.auditoria.dataCharts);
                    setFinancialData(data.financeiro.dataCharts);
                    setPerformanceData(data.desempenho.dataCharts);
                    setPosData(data.caixa.dataCharts);
                    setDeliveryData(data.delivery.dataCharts);

                    setLoading(false)
                } else {
                    setUnitData(null);
                    setStorageData(null);
                    setSalesData(null);
                    setAuditData(null);
                    setFinancialData(null);
                    setPerformanceData(null);
                    setPosData(null);
                    setDeliveryData(null);

                    setLoading(false)
                }
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        };

        fetchData();

    }, [unitSelected, monthSelected, yearSelected]);

    return (
        <GlobalContext.Provider value={{
            units,
            months,
            years,
            unitSelected,
            monthSelected,
            yearSelected,
            unitData,
            storageData,
            salesData,
            auditData,
            financialData,
            performanceData,
            posData,
            deliveryData,
            setUnitSelected,
            setMonthSelected,
            setYearSelected,
            loading
        }}>
            { children }
        </GlobalContext.Provider>
    )
}

function useGlobal(): IGlobalContext {
    const context = useContext(GlobalContext)
    if (!context) {
        throw new Error("useGlobal must be used within a GlobalProvider");
    }
    return context
}

export { GlobalProvider, useGlobal }