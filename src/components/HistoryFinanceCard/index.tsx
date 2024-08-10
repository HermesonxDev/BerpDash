import { Container, Tag } from "./styles";

interface IHistoryFinanceCardProps {
    tagColor: string,
    title: string,
    subTitle: string,
    amount: string,
    unit: string
}

const HistoryFinanceCard: React.FC<IHistoryFinanceCardProps> = ({ tagColor, title, subTitle, amount, unit }) => (
    <Container>
        <Tag color={tagColor} />

        <div>
            <span>{ title }</span>
            <small>{ subTitle } - Unidade: { unit }</small>
        </div>

        <h3>{ amount }</h3>
    </Container>
)

export default HistoryFinanceCard;