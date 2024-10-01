export interface Controllers {
    name: string,
    value: string | number
}


export interface InfoCardControllers {
    label: string,
    amount: number
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
    controllers: InfoCardControllers[],
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


export interface AuditDataType {
    cancelamentos_lists: ListDataType,
    deliveryemrota_lists: ListDataType,
    deliveryproducao_lists: ListDataType,
    despesas_lists: ListDataType,
    cardacumuladomes_informationCard: InformationCardDataType,
    meta_progressiveBarChart: ProgressiveBarDataType,
    vendaporhorario_biaxialBarChart: BiaxialBarDataType,
    vendaporhorariopizza_pieChart: PieDataType
}


export interface PosDataType {
    cancelamentos_lists: ListDataType,
    deliveryemrota_lists: ListDataType,
    deliveryproducao_lists: ListDataType,
    despesas_lists: ListDataType,
    cardacumuladomes_informationCard: InformationCardDataType,
    meta_progressiveBarChart: ProgressiveBarDataType,
    vendaporhorario_biaxialBarChart: BiaxialBarDataType,
    vendaporhorariopizza_pieChart: PieDataType
}


export interface DeliveryDataType {
    cancelamentos_lists: ListDataType,
    deliveryemrota_lists: ListDataType,
    deliveryproducao_lists: ListDataType,
    despesas_lists: ListDataType,
    cardacumuladomes_informationCard: InformationCardDataType,
    meta_progressiveBarChart: ProgressiveBarDataType,
    vendaporhorario_biaxialBarChart: BiaxialBarDataType,
    vendaporhorariopizza_pieChart: PieDataType
}


export interface PerformanceDataType {
    cancelamentos_lists: ListDataType,
    deliveryemrota_lists: ListDataType,
    deliveryproducao_lists: ListDataType,
    despesas_lists: ListDataType,
    cardacumuladomes_informationCard: InformationCardDataType,
    meta_progressiveBarChart: ProgressiveBarDataType,
    vendaporhorario_biaxialBarChart: BiaxialBarDataType,
    vendaporhorariopizza_pieChart: PieDataType
}


export interface StorageDataType {
    cancelamentos_lists: ListDataType,
    deliveryemrota_lists: ListDataType,
    deliveryproducao_lists: ListDataType,
    despesas_lists: ListDataType,
    cardacumuladomes_informationCard: InformationCardDataType,
    meta_progressiveBarChart: ProgressiveBarDataType,
    vendaporhorario_biaxialBarChart: BiaxialBarDataType,
    vendaporhorariopizza_pieChart: PieDataType
}


export interface FinancialDataType {
    cancelamentos_lists: ListDataType,
    deliveryemrota_lists: ListDataType,
    deliveryproducao_lists: ListDataType,
    despesas_lists: ListDataType,
    cardacumuladomes_informationCard: InformationCardDataType,
    meta_progressiveBarChart: ProgressiveBarDataType,
    vendaporhorario_biaxialBarChart: BiaxialBarDataType,
    vendaporhorariopizza_pieChart: PieDataType
}


export interface SalesDataType {
    cancelamentos_lists: ListDataType,
    deliveryemrota_lists: ListDataType,
    deliveryproducao_lists: ListDataType,
    despesas_lists: ListDataType,
    cardacumuladomes_informationCard: InformationCardDataType,
    meta_progressiveBarChart: ProgressiveBarDataType,
    vendaporhorario_biaxialBarChart: BiaxialBarDataType,
    vendaporhorariopizza_pieChart: PieDataType
}


export interface UnitDataType {
    id: string,
    auditoria: {
        dataCharts: AuditDataType
    },
    caixa: {
        dataCharts: PosDataType
    },
    delivery: {
        dataCharts: DeliveryDataType
    },
    desempenho: {
        dataCharts: PerformanceDataType
    },
    estoque: {
        dataCharts: StorageDataType
    },
    financeiro: {
        dataCharts: FinancialDataType
    },
    vendas: {
        dataCharts: SalesDataType
    }
}