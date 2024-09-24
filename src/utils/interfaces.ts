export interface Controllers {
    name: string,
    value: string | number
}

export interface GoalDataType {
    color: string,
    value: string | number
}


export interface LabelsDataType {
    data1: string,
    data2: string
}


export interface ListArrayDataType {
    id: string,
    title: string,
    sub_title: string,
    amount_field: string,
    sub_amount_field: string,
    date: string,
    type: string
}


export interface ListDataType {
    controllers: Controllers[],
    data: ListArrayDataType[],
    generatedDate: string,
    title: string
    subTitle: string,
    text: string,
    type: string
}


export interface InformationCardDataType {
    controllers: Controllers[],
    generatedDate: string,
    title: string
    text: string,
    type: string
}


export interface ProgressiveBarDataType {
    currentValue: string | number,
    generatedDate: string,
    goal: GoalDataType[],
    title: string
    text: string,
    isMoney: boolean,
    type: string
}


export interface BiaxialBarDataType {
    controllers: Controllers[],
    labels: LabelsDataType[],
    generatedDate: string,
    title: string
    subTitle: string,
    text: string,
    isMoney: boolean,
    showTotal: boolean,
    type: string
    [key: string]: any
}


export interface PieDataType {
    controllers: Controllers[],
    generatedDate: string,
    title: string
    subTitle: string,
    text: string,
    isMoney: boolean,
    showTotal: boolean,
    type: string,
    [key: string]: any
}


export interface UnitDataType {
    data: {
        auditoria: {
            dataCharts: {
                cancelamentos_lists: ListDataType,
                deliveryemrota_lists: ListDataType,
                deliveryproducao_lists: ListDataType,
                despesas_lists: ListDataType,
                cardacumuladomes_informationCard: InformationCardDataType,
                meta_progressiveBarChart: ProgressiveBarDataType,
                vendaporhorario_biaxialBarChart: BiaxialBarDataType,
                vendaporhorariopizza_pieChart: PieDataType
            }
        },
        caixa: {
            dataCharts: {
                cancelamentos_lists: ListDataType,
                deliveryemrota_lists: ListDataType,
                deliveryproducao_lists: ListDataType,
                despesas_lists: ListDataType,
                cardacumuladomes_informationCard: InformationCardDataType,
                meta_progressiveBarChart: ProgressiveBarDataType,
                vendaporhorario_biaxialBarChart: BiaxialBarDataType,
                vendaporhorariopizza_pieChart: PieDataType
            }
        },
        delivery: {
            dataCharts: {
                cancelamentos_lists: ListDataType,
                deliveryemrota_lists: ListDataType,
                deliveryproducao_lists: ListDataType,
                despesas_lists: ListDataType,
                cardacumuladomes_informationCard: InformationCardDataType,
                meta_progressiveBarChart: ProgressiveBarDataType,
                vendaporhorario_biaxialBarChart: BiaxialBarDataType,
                vendaporhorariopizza_pieChart: PieDataType
            }
        },
        desempenho: {
            dataCharts: {
                cancelamentos_lists: ListDataType,
                deliveryemrota_lists: ListDataType,
                deliveryproducao_lists: ListDataType,
                despesas_lists: ListDataType,
                cardacumuladomes_informationCard: InformationCardDataType,
                meta_progressiveBarChart: ProgressiveBarDataType,
                vendaporhorario_biaxialBarChart: BiaxialBarDataType,
                vendaporhorariopizza_pieChart: PieDataType
            }
        },
        estoque: {
            dataCharts: {
                cancelamentos_lists: ListDataType,
                deliveryemrota_lists: ListDataType,
                deliveryproducao_lists: ListDataType,
                despesas_lists: ListDataType,
                cardacumuladomes_informationCard: InformationCardDataType,
                meta_progressiveBarChart: ProgressiveBarDataType,
                vendaporhorario_biaxialBarChart: BiaxialBarDataType,
                vendaporhorariopizza_pieChart: PieDataType
            }
        },
        financeiro: {
            dataCharts: {
                cancelamentos_lists: ListDataType,
                deliveryemrota_lists: ListDataType,
                deliveryproducao_lists: ListDataType,
                despesas_lists: ListDataType,
                cardacumuladomes_informationCard: InformationCardDataType,
                meta_progressiveBarChart: ProgressiveBarDataType,
                vendaporhorario_biaxialBarChart: BiaxialBarDataType,
                vendaporhorariopizza_pieChart: PieDataType
            }
        },
        vendas: {
            dataCharts: {
                cancelamentos_lists: ListDataType,
                deliveryemrota_lists: ListDataType,
                deliveryproducao_lists: ListDataType,
                despesas_lists: ListDataType,
                cardacumuladomes_informationCard: InformationCardDataType,
                meta_progressiveBarChart: ProgressiveBarDataType,
                vendaporhorario_biaxialBarChart: BiaxialBarDataType,
                vendaporhorariopizza_pieChart: PieDataType
            }
        }
    }
}