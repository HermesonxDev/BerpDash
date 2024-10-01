import { useCallback } from "react";
import { Container, Content } from "./styles";

import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";
import Loading from "../../components/Loading";
import InformationCard from "../../components/InformationCard";
import BiaxialBarChartBox from "../../components/BiaxialBarChartbox";
import PieChartBox from "../../components/PieChartBox";

import { useGlobal } from "../../hooks/global";

const PointOfSale: React.FC = () => {

    const {
        units,
        months,
        years,
        posData,
        unitSelected,
        monthSelected,
        yearSelected,
        loading,
        setUnitSelected,
        setMonthSelected,
        setYearSelected
    } = useGlobal()

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


    if (loading) {
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
                {posData
                    && !Array.isArray(posData)
                    && Object.keys(posData).length > 0
                    ? (
                        <>
                            <BiaxialBarChartBox data={posData.vendaporhorario_biaxialBarChart} />
                            <PieChartBox data={posData.vendaporhorariopizza_pieChart} />
                            <InformationCard data={posData.cardacumuladomes_informationCard}/>
                        </>
                    ) : (
                        <h3>NENHUM REGISTRO ENCONTRADO NESSA DATA</h3>
                    )
                }
            </Content>
        </Container>
    )
}

export default PointOfSale