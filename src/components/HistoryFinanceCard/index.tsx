import { Container, Tag } from "./styles";

interface IHistoryFinanceCardProps {
    tagColor?: string,
    title: string,
    subTitle: string,
    amount: string,
    backgroundColor?: string
}

const HistoryFinanceCard: React.FC<IHistoryFinanceCardProps> = ({ tagColor, title, subTitle, amount, backgroundColor}) => (
    <Container backgroundColor={backgroundColor}>
        {tagColor && <Tag color={tagColor} />}

        <div>
            <span>{ title }</span>
            <small>{ subTitle }</small>
        </div>

        <h3>{ amount }</h3>
    </Container>
)

export default HistoryFinanceCard;