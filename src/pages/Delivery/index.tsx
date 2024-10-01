import { Container, Content } from "./styles";
import { useCallback } from "react";

import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";
import Loading from "../../components/Loading";
import PieChartBox from "../../components/PieChartBox";
import ListChart from "../../components/ListChart";

import { useGlobal } from "../../hooks/global";
import BiaxialBarChartBox from "../../components/BiaxialBarChartbox";

const Delivery: React.FC = () => {

    const {
        units,
        months,
        years,
        deliveryData,
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
            <ContentHeader title="Delivery" lineColor="#f7931b">
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
                {deliveryData
                    && !Array.isArray(deliveryData)
                    && Object.keys(deliveryData).length > 0
                    ? (
                        <>
                            <PieChartBox data={deliveryData.vendaporhorariopizza_pieChart} />
                            <BiaxialBarChartBox data={deliveryData.vendaporhorario_biaxialBarChart} />
                            <ListChart data={deliveryData.cancelamentos_lists} />
                            <ListChart data={deliveryData.despesas_lists} />
                            <ListChart data={deliveryData.deliveryproducao_lists} />
                            <ListChart data={deliveryData.deliveryemrota_lists} />
                            <ListChart data={deliveryData.deliveryemrota_lists} />
                            <PieChartBox data={deliveryData.vendaporhorariopizza_pieChart} />
                            <PieChartBox data={deliveryData.vendaporhorariopizza_pieChart} />
                            <BiaxialBarChartBox data={deliveryData.vendaporhorario_biaxialBarChart} />
                        </>
                    ) : (
                        <h3>NENHUM REGISTRO ENCONTRADO NESSA DATA</h3>
                    )
                }
            </Content>
        </Container>
    )
}

export default Delivery