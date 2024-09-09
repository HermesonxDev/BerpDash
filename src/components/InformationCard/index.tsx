import { Clock, Container, HeaderRow, MainRow, FooterRow } from "./styles";

const InformationCard: React.FC = () => {
    return (
        <Container>
            <HeaderRow>
                <div>
                    <h2>Venda por horário</h2>
                    <h5>Com base na venda recebida</h5>
                </div>

                <div>
                    <Clock />
                    <p>Última atualização á 1 minuto atrás</p>
                </div>
            </HeaderRow>

            <MainRow>
                <h2>R$221.000</h2>
                <p>Vendas totais</p>
            </MainRow>

            <FooterRow>
                <div>
                    <h3>R$45.000</h3>
                    <p>Acumulador do mês atual</p>
                </div>
                <div>
                    <h3>R$45.000</h3>
                    <p>Igual periodo ano anterior</p>
                </div>
                <div>
                    <h3>R$45.000</h3>
                    <p>Total mês anterior</p>
                </div>
                <div>
                    <h3>R$45.000</h3>
                    <p>Mesmo dia semana passada</p>
                </div>
            </FooterRow>
        </Container>
    )
}

export default InformationCard