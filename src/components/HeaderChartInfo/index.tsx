import { Clock, Container } from "./styles";

interface IHeaderChartInfoProps {
    title: string,
    subTitle?: string,
    text?: string
}

const HeaderChartInfo: React.FC<IHeaderChartInfoProps> = ({ title, subTitle, text }) => (
    <Container>
        <div>
            <h2>{title}</h2>
            {subTitle && <h5>{subTitle}</h5>}
        </div>

        {text &&
            <div>
                <Clock />
                <p>{text}</p>
            </div>
        }
    </Container>
)


export default HeaderChartInfo