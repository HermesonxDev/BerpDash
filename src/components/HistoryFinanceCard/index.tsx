import { Container, Tag } from "./styles";

interface IHistoryFinanceCardProps {
    title: string,
    subTitle: string,
    amount: string,
    subAmount?: string,
    tagColor?: string,
    backgroundColor?: string
}

const HistoryFinanceCard: React.FC<IHistoryFinanceCardProps> = ({
    title,
    subTitle,
    amount,
    subAmount,
    tagColor,
    backgroundColor
}) => (
    <Container backgroundColor={backgroundColor}>
        {tagColor && <Tag color={tagColor} />}

        <div>
            <span>{ title }</span>
            <small>{ subTitle }</small>
        </div>

        <div>
            <h3>{ amount }</h3>
            {subAmount &&
                <small>{ subAmount }</small>
            }
        </div>
    </Container>
)

export default HistoryFinanceCard;