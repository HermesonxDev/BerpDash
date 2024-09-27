import { Container, Content } from "./styles";

import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";
import Loading from "../../components/Loading";

import { useGlobal } from "../../hooks/global";
import InformationCard from "../../components/InformationCard";
import ListChart from "../../components/ListChart";

/* COMPONENTE DA PÁGINA */
const Storage: React.FC = () => {

    const {
        units,
        months,
        years,
        stockData,
        unitSelected,
        monthSelected,
        yearSelected,
        loadingUnits,
        setUnitSelected,
        setMonthSelected,
        setYearSelected
    } = useGlobal()

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


    if (loadingUnits) {
        return <Loading />
    }

    return (
        <Container> 
            <ContentHeader title="Estoque" lineColor="#f7931b">

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

            {stockData &&
                <Content>
                    <InformationCard data={stockData.cardacumuladomes_informationCard} />
                    <ListChart data={stockData.deliveryproducao_lists} />
                    <ListChart data={stockData.deliveryemrota_lists} />
                </Content>
            }
        </Container>
    )
}

export default Storage;