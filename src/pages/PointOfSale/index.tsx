import { useCallback, useEffect, useState } from "react";
import { Container, Content } from "./styles";

import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";
import Loading from "../../components/Loading";
import InformationCard from "../../components/InformationCard";

import { useGlobal } from "../../hooks/global";

import { PosDataType } from "../../utils/interfaces";

const PointOfSale: React.FC = () => {

    const {
        units,
        months,
        years,
        unitData,
        unitSelected,
        monthSelected,
        yearSelected,
        loadingUnits,
        setUnitSelected,
        setMonthSelected,
        setYearSelected
    } = useGlobal()

    const [posData, setPosData] = useState<PosDataType | null>(null);

    /*
    * --> SEPARA OS DADOS QUE SERAM USADO NA APLICAÇÃO
    *      Sempre que o usuário selecionar a unidade, mês e ano, um array
    *      de dados sobre aquela unidade sera carregado do firebase
    *      aqui, e será separado os ganhos e despesas da unidade.
    */
    useEffect(() => {
        if (unitData && unitData.length > 0) {
            setPosData(unitData[0].caixa.dataCharts);
        }
    }, [unitData]);

    console.log(unitData[0].caixa.dataCharts)
    console.log(posData)

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


    if (loadingUnits) {
        return <Loading />
    }

    return (
        <Container>
            <ContentHeader title="Caixa" lineColor="#f7931b">
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
                {/* <InformationCard data={posData.dataCharts.cardacumuladomes_informationCard}/> */}
            </Content>
        </Container>
    )
}

export default PointOfSale