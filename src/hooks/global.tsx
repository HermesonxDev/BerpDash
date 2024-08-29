import { createContext, useState, useContext } from "react";

interface IGlobalContext {
    unitSelected: string,
    monthSelected: number,
    yearSelected: number,
    setUnitSelected: React.Dispatch<React.SetStateAction<string>>,
    setMonthSelected: React.Dispatch<React.SetStateAction<number>>,
    setYearSelected: React.Dispatch<React.SetStateAction<number>>
}

const GlobalContext = createContext<IGlobalContext>({} as IGlobalContext)

const GlobalProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {

    const [unitSelected, setUnitSelectedState] = useState<string>(() => {
        const onUnit = localStorage.getItem('@dc5bf16b1811-Dashboard:unitSelected')
        return onUnit ? JSON.parse(onUnit) : ''
    })

    const [monthSelected, setMonthSelectedState] = useState<number>(() => {
        const onMonth = localStorage.getItem('@dc5bf16b1811-Dashboard:monthSelected')
        return onMonth ? JSON.parse(onMonth) : new Date().getMonth() + 1
    })

    const [yearSelected, setYearSelectedState] = useState<number>(() => {
        const onYear = localStorage.getItem('@dc5bf16b1811-Dashboard:yearSelected')
        return onYear ? JSON.parse(onYear) : new Date().getFullYear()
    })


    /*
    * --> GUARDA A UNIDADE SELECIONADA PELO USUÁRIO
    *      Verifica e guarda os dados da unidade selecionada pelo usuário no localstorage
    *      do navegador para ser usado em qualquer lugar da aplicação.
    */
    const setUnitSelected: React.Dispatch<React.SetStateAction<string>> = (value) => {
        if (typeof value === 'function') {
            setUnitSelectedState((prevState) => {
                const newUnit = value(prevState)

                localStorage.setItem(
                    '@dc5bf16b1811-Dashboard:unitSelected',
                    JSON.stringify(newUnit)
                )

                return newUnit;
            });
        } else {
            localStorage.setItem('@dc5bf16b1811-Dashboard:unitSelected', JSON.stringify(value));
            setUnitSelectedState(value);
        }
    }


    /*
    * --> GUARDA O MÊS SELECIONADA PELO USUÁRIO
    *      Verifica e guarda os dados do mês selecionado pelo usuário no localstorage
    *      do navegador para ser usado em qualquer lugar da aplicação.
    */
    const setMonthSelected: React.Dispatch<React.SetStateAction<number>> = (value) => {
        if (typeof value === 'function') {
            setMonthSelectedState((prevState) => {
                const newMonth = value(prevState)

                localStorage.setItem(
                    '@dc5bf16b1811-Dashboard:monthSelected',
                    JSON.stringify(newMonth)
                )

                return newMonth;
            });
        } else {
            localStorage.setItem('@dc5bf16b1811-Dashboard:monthSelected', JSON.stringify(value));
            setMonthSelectedState(value);
        }
    }


    /*
    * --> GUARDA O ANO SELECIONADA PELO USUÁRIO
    *      Verifica e guarda os dados do ano selecionado pelo usuário no localstorage
    *      do navegador para ser usado em qualquer lugar da aplicação.
    */
    const setYearSelected: React.Dispatch<React.SetStateAction<number>> = (value) => {
        if (typeof value === 'function') {
            setYearSelectedState((prevState) => {
                const newYear = value(prevState)

                localStorage.setItem(
                    '@dc5bf16b1811-Dashboard:yearSelected',
                    JSON.stringify(newYear)
                )

                return newYear;
            });
        } else {
            localStorage.setItem('@dc5bf16b1811-Dashboard:yearSelected', JSON.stringify(value));
            setYearSelectedState(value);
        }
    }

    return (
        <GlobalContext.Provider value={{
            unitSelected,
            monthSelected,
            yearSelected,
            setUnitSelected,
            setMonthSelected,
            setYearSelected
        }}>
            { children }
        </GlobalContext.Provider>
    )
}

function useGlobal(): IGlobalContext {
    const context = useContext(GlobalContext)
    if (!context) {
        throw new Error("useGlobal must be used within a GlobalProvider");
    }
    return context
}

export { GlobalProvider, useGlobal }