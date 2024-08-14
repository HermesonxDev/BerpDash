import { useCallback, useMemo, useState } from "react";
import { Container, Content } from "./styles";

import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";
import WalletBox from "../../components/WalletBox";
import MessageBox from "../../components/MessageBox";
import PieChartBox from "../../components/PieChartBox";
import HistoryBox from "../../components/HistoryBox";

import listOfMonths from "../../utils/months";

import happyIMG from '../../assets/happy.svg';
import sadIMG from '../../assets/sad.svg';
import grinningIMG from '../../assets/grinning.svg';
import BarChartBox from "../../components/BarChartBox";
import useFirestore from "../../hooks/firestore";
import Loading from "../../components/Loading";

const Dashboard: React.FC = () => {

    const [unitSelected, setUnitSelected] = useState<string>('01');
    const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1);
    const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear());
    const { documents: gains, loading: loadingGains } = useFirestore('gains');
    const { documents: expenses, loading: loadingExpenses } = useFirestore('expenses');

    /*
    * --> GUARDA OS DADOS QUE VÃO SER USADOS NA PÁGINA
    *      Recebe todas as despesas e ganhos.
    */
    const listData = [...expenses, ...gains];
    
    /*
    * --> GUARDA OS DADOS A SEREM MOSTRADOS NO INPUT DE UNIDADES
    *      Em vez de criar um array com as unidades, essa constante verifica
    *      de quais unidades os dados vinheram, devolvendo no final apenas esses
    *      em vez de unidades em que não tiveram nenhuma movimentação.
    */
    const units = useMemo(() => {
        let uniqueUnits: string[] = [];

        listData.forEach(item => {
            const unit = item.unit;

            if(!uniqueUnits.includes(unit)) {
                uniqueUnits.push(unit)
            }
        });

        return uniqueUnits.map(unit => {
            return {
                value: unit,
                label: "Unidade " + unit,
            }
        });

    }, [listData]);


    /*
    * --> GUARDA OS DADOS A SEREM MOSTRADOS NO INPUT DE MESES
    *      Mapeia a lista de meses fornecida pelos utilitários e
    *      devolve o nome de cada mês e seu valor.
    */
    const months = useMemo(() => {
        return listOfMonths.map((month, index) => {
            return {
                value: index + 1,
                label: month,
            }
        });

    }, []);


    /*
    * --> GUARDA OS DADOS A SEREM MOSTRADOS NO INPUT DE ANOS
    *      Em vez de criar um array com os anos, essa constante verifica
    *      os anos em que os dados foram salvos, devolvendo no final apenas 
    *      esses em vez de anos em que não tiveram nenhuma movimentação.
    */
    const years = useMemo(() => {
        let uniqueYears: number[] = [];

        listData.forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();

            if(!uniqueYears.includes(year)) {
                uniqueYears.push(year)
            }
        });

        return uniqueYears.map(year => {
            return {
                value: year,
                label: year,
            }
        });

    }, [listData]);


    /*
    * --> CALCULA O VALOR TOTAL DAS DESPESAS
    *       Soma e devolve todos os valores das saídas do mês
    *       selecionado pelo usuário.
    */
    const totalExpenses = useMemo(() => {
        
        let total: number = 0

        /*
        * --> FILTRA OS DADOS POR UNIDADE
        *      Carrega somente os dados da unidade selecionada pelo usuário.  
        */
        const filteredDataByUnit = expenses.filter(item => {
            const unit = item.unit;
            return unit === unitSelected;
        });
        

        /*
        * --> FILTRA OS DADOS POR MÊS E ANO
        *      Verifica se o mês e ano selecionado pelo usuário
        *      bate com o mês e ano dos dados fornecido pela base de dados.
        */
        filteredDataByUnit.forEach(item => {
            const date = new Date(item.date)
            const year = date.getFullYear();
            const month = date.getMonth() + 1;

            if(month === monthSelected && year === yearSelected){
                try {
                    total += Number(item.amount)
                } catch {
                    throw new Error('Invalid amount! Amount must be number.')
                }
            }
        })

        return total
    }, [monthSelected, yearSelected, unitSelected]);


    /*
    * --> CALCULA O VALOR TOTAL DOS GANHOS
    *       Soma e devolve todos os valores das entradas do mês
    *       selecionado pelo usuário.
    */
    const totalGains = useMemo(() => {
        
        let total: number = 0

        /*
        * --> FILTRA OS DADOS POR UNIDADE
        *      Carrega somente os dados da unidade selecionada pelo usuário.  
        */
        const filteredDataByUnit = gains.filter(item => {
            const unit = item.unit;
            return unit === unitSelected;
        });
        

        /*
        * --> FILTRA OS DADOS POR MÊS E ANO
        *      Verifica se o mês e ano selecionado pelo usuário
        *      bate com o mês e ano dos dados fornecido pela base de dados.
        */
        filteredDataByUnit.forEach(item => {
            const date = new Date(item.date)
            const year = date.getFullYear();
            const month = date.getMonth() + 1;

            if(month === monthSelected && year === yearSelected){
                try {
                    total += Number(item.amount)
                } catch {
                    throw new Error('Invalid amount! Amount must be number.')
                }
            }
        })

        return total
    }, [monthSelected, yearSelected, unitSelected]);


    /*
    * --> CALCULA O VALOR TOTAL DO SALDO
    *       Realiza a subtraçao das saídas sobre os ganhos para
    *       mostrar o valor do saldo adquirido no mês selecionado
    *       pelo usuário.
    */
    const totalBalance = useMemo(() => {
        return totalGains - totalExpenses
    }, [totalGains, totalExpenses]);


    /*
    * --> GUARDA UMA MENSAGEM A SER MOSTRADA
    *      Verifica constantemente e de acordo com o balanço total
    *      dos gastos e despesas da aplicação, qual mensagem será
    *      mostrada ao usuário.
    */
    const message = useMemo(() => {
        if (totalBalance < 0) {
            return {
                title: "Que triste!",
                description: "Neste mês, você gastou mais do que deveria.",
                footerText: "Verifique seus gastos e tente organizar melhor suas finanças.",
                icon: sadIMG
            }
        } else if (totalGains === 0 && totalExpenses === 0) {
            return {
                title: "Oops!",
                description: "Neste mês, não há registros de entradas ou saídas.",
                footerText: "Parece que você não fez nenhum registro no mês selecionado.",
                icon: grinningIMG
            }
        } else if (totalBalance === 0) {
            return {
                title: "Ufaa!",
                description: "Neste mês, você gastou exatamente o que ganhou.",
                footerText: "Tenha cuidado. No próximo mês tente poupar o seu dinheiro.",
                icon: grinningIMG
            }
        } else {
            return {
                title: "Muito bem!",
                description: "Sua carteira está positiva!",
                footerText: "Continue assim. Considere investir o seu saldo.",
                icon: happyIMG
            }
        }
    }, [totalGains, totalExpenses, totalBalance])


    /*
    * --> CONVERTE VALORES EM PORCENTAGEM
    *      Converte os valores das entradas e saídas em porcentagem
    *      para serem usados no gráfico de pizza.
    */
    const relationExpensesVersusGains = useMemo(() => {
        const total = totalGains + totalExpenses
        const percentGains = Number(((totalGains / total) * 100).toFixed(1))
        const percentExpenses = Number(((totalExpenses / total) * 100).toFixed(1))

        const data = [
            {
                name: "Entradas",
                value: totalGains,
                percent: percentGains ? percentGains : 0,
                color: "#f7931b"
            },
            {
                name: "Saídas",
                value: totalExpenses,
                percent: percentExpenses ? percentExpenses : 0,
                color: "#e44c4e"
            },
        ]

        return data

    }, [totalGains, totalExpenses])


    /*
    * --> AGRUPA OS VALORES POR MÊS
    *      Soma os valores de todas as entradas e saídas individualmente para
    *      serem usados no gráfico de histórico anual.
    */
    const historyData = useMemo(() => {
        return listOfMonths.map((_, month) => {

            let amountEntry = 0
            let amountOutput = 0


            /*
            * --> FILTRA OS DADOS POR UNIDADE
            *      Carrega somente os dados da unidade selecionada pelo usuário.  
            */
            const filteredDataByUnit = listData.filter(item => {
                const unit = item.unit;
                return unit === unitSelected;
            });


            /*
            * --> FILTRA OS DADOS DO TIPO "ENTRADAS"
            *      Carrega somente os dados de entrada para serem usados no gráfico de histórico 
            *      anual.
            */
            const filteredGains = filteredDataByUnit.filter(item => {
                const type = item.type;
                return type === 'entrada'
            });


            /*
            * --> FILTRA OS DADOS DO TIPO "SAÍDAS"
            *      Carrega somente os dados de saídas para serem usados no gráfico de histórico
            *      anual.
            */
            const filteredExpenses = filteredDataByUnit.filter(item => {
                const type = item.type;
                return type === 'saída'
            });


            /*
            * --> CALCULA O VALOR TOTAL DAS ENTRADAS POR MÊS
            *      Soma e retorna o valor total das entradas de todos os
            *      meses do ano selecionado pelo usuário.
            */
            filteredGains.forEach(gain => {
                const date = new Date(gain.date)
                const gainMonth = date.getMonth()
                const gainYear = date.getFullYear()

                if (gainMonth === month && gainYear === yearSelected) {
                    try {
                        amountEntry += Number(gain.amount)
                    } catch {
                        throw new Error('Amount entry is invalid. AmountEntry must be valid number.')
                    }
                }
            })


            /*
            * --> CALCULA O VALOR TOTAL DAS SAÍDAS POR MÊS
            *      Soma e retorna o valor total das saídas de todos os
            *      meses do ano selecionado pelo usuário.
            */
            filteredExpenses.forEach(expense => {
                const date = new Date(expense.date)
                const expenseMonth = date.getMonth()
                const expenseYear = date.getFullYear()

                if (expenseMonth === month && expenseYear === yearSelected) {
                    try {
                        amountOutput += Number(expense.amount)
                    } catch {
                        throw new Error('Amount entry is invalid. AmountEntry must be valid number.')
                    }
                }
            })

            return {
                monthNumber: month,
                month: listOfMonths[month].substring(0, 3),
                amountEntry,
                amountOutput
            }

            /*
            * --> DECIDE QUAIS MESES MOSTRAR NO GRÁFICO DE LINHAS
            *      Verifica se o ano selecionado pelo usuário é igual ao ano atual em que
            *      o sistema está online e devolve somente os meses anteriores ao mês atual
            *      do ano selecionado, e se o ano selecionado for um que ja passou ele
            *      mostra todos os meses.
            */
        }).filter(item => {
            const currentMonth = new Date().getMonth()
            const currentYear = new Date().getFullYear()

            return (yearSelected === currentYear && item.monthNumber <= currentMonth) || (yearSelected < currentYear)
        })
    },[unitSelected, yearSelected])


    /*
    * --> SEPARA OS VALORES DAS DESPESAS POR FREQUÊNCIA
    *      Separa e soma individualmente os valores das despesas por tipo
    *      para serem usados no gráfico de linhas.
    */
    const relationExpensesRecurrentVersusEventual = useMemo(() => {

        let amountRecurrent = 0
        let amountEventual = 0

        /*
        * --> FILTRA OS DADOS POR UNIDADE
        *      Carrega somente os dados da unidade selecionada pelo usuário.  
        */
        const filteredDataByUnit = expenses.filter(item => {
            const unit = item.unit;
            return unit === unitSelected;
        });


        /*
        * --> FILTRA OS DADOS POR MÊS E ANO
        *      Verifica se o mês e ano selecionado pelo usuário
        *      bate com o mês e ano dos dados fornecido pela base de dados.
        * 
        * --> SOMA OS DADOS FILTRADOS POR FREQUÊNCIA
        *      Percorre todos os dados filtrados somando os valores individuais por
        *      frequência.
        */
        filteredDataByUnit
        .filter(expense => {
            const date = new Date(expense.date)
            const month = date.getMonth() + 1
            const year = date.getFullYear()

            return month === monthSelected && year === yearSelected
        })
        .forEach(expense => {
            if (expense.frequency === 'recorrente') {
                return amountRecurrent += Number(expense.amount)
            }

            if (expense.frequency === 'eventual') {
                return amountEventual += Number(expense.amount)
            }
        })

        const total = amountRecurrent + amountEventual
        const percentRecurrent = Number(((amountRecurrent / total) * 100).toFixed(1))
        const percentEventual = Number(((amountEventual / total) * 100).toFixed(1))

        return [
            {
                name: 'Recorrentes',
                amount: amountRecurrent,
                percent: percentRecurrent ? percentRecurrent : 0,
                color: '#f7931b'
            },
            {
                name: 'Eventual',
                amount: amountEventual,
                percent: percentEventual ? percentEventual : 0,
                color: '#e44c4e'
            }
        ]
    }, [unitSelected, monthSelected, yearSelected])


    /*
    * --> SEPARA OS VALORES DAS ENTRADAS POR FREQUÊNCIA
    *      Separa e soma individualmente os valores das entradas por tipo
    *      para serem usados no gráfico de linhas.
    */
    const relationGainsRecurrentVersusEventual = useMemo(() => {

        let amountRecurrent = 0
        let amountEventual = 0

        /*
        * --> FILTRA OS DADOS POR UNIDADE
        *      Carrega somente os dados da unidade selecionada pelo usuário.  
        */
        const filteredDataByUnit = gains.filter(item => {
            const unit = item.unit;
            return unit === unitSelected;
        });


        /*
        * --> FILTRA OS DADOS POR MÊS E ANO
        *      Verifica se o mês e ano selecionado pelo usuário
        *      bate com o mês e ano dos dados fornecido pela base de dados.
        * 
        * --> SOMA OS DADOS FILTRADOS POR FREQUÊNCIA
        *      Percorre todos os dados filtrados somando os valores individuais por
        *      frequência.
        */
        filteredDataByUnit
        .filter(gain => {
            const date = new Date(gain.date)
            const month = date.getMonth() + 1
            const year = date.getFullYear()

            return month === monthSelected && year === yearSelected
        })
        .forEach(gain => {
            if (gain.frequency === 'recorrente') {
                return amountRecurrent += Number(gain.amount)
            }

            if (gain.frequency === 'eventual') {
                return amountEventual += Number(gain.amount)
            }
        })

        const total = amountRecurrent + amountEventual
        const percentRecurrent = Number(((amountRecurrent / total) * 100).toFixed(1))
        const percentEventual = Number(((amountEventual / total) * 100).toFixed(1))

        return [
            {
                name: 'Recorrentes',
                amount: amountRecurrent,
                percent: percentRecurrent ? percentRecurrent : 0,
                color: '#f7931b'
            },
            {
                name: 'Eventual',
                amount: amountEventual,
                percent: percentEventual ? percentEventual : 0,
                color: '#e44c4e'
            }
        ]
    }, [unitSelected, monthSelected, yearSelected])


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

    if (loadingGains && loadingExpenses) {
        return <Loading />
    }

    return (
        <Container>
            <ContentHeader title="Dashboard" lineColor="#f7931b">
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
                <WalletBox 
                    title="saldo"
                    amount={totalBalance}
                    footerLabel="Atualizado com base nas entradas e saídas"
                    color="#4e41f0"
                    icon="dollar"
                />

                <WalletBox 
                    title="entradas"
                    amount={totalGains}
                    footerLabel="Atualizado com base nas entradas e saídas"
                    color="#f7931b"
                    icon="arrowUp"
                />

                <WalletBox 
                    title="saídas"
                    amount={totalExpenses}
                    footerLabel="Atualizado com base nas entradas e saídas"
                    color="#e44c4e"
                    icon="arrowDown"
                />

                <MessageBox
                    title={message.title}
                    description={message.description}
                    footerText={message.footerText}
                    icon={message.icon}
                />

                <PieChartBox data={relationExpensesVersusGains}/>

                <HistoryBox
                    data={historyData}
                    lineColorAmountEntry="#f7931b"
                    lineColorAmountOutput="#e44c4e"
                />

                <BarChartBox
                    title="Entradas"
                    data={relationGainsRecurrentVersusEventual}
                />

                <BarChartBox
                    title="Saídas"
                    data={relationExpensesRecurrentVersusEventual}
                />
                
            </Content>
        </Container>
    )
}

export default Dashboard;