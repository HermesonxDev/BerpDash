import React, { createContext, useState, useContext } from "react";

import dark from "../styles/themes/dark";
import light from "../styles/themes/light";

interface ITheme {
    title: string,
    colors: {
        primary: string,
        secondary: string,
        tertiary: string,
        white: string,
        black: string,
        gray: string,
        success: string,
        info: string,
        warning: string
    }
}

interface IThemeContext {
    toggleTheme(): void,
    theme: ITheme,
}


/* CRIA O CONTEXTO PARA SER USADO NA APLICAÇÃO */
const ThemeContext = createContext<IThemeContext>({} as IThemeContext)


/*
* --> PROVÊ O CONTEXTO PARA A APLICAÇÃO
*      Guarda as funções e variáveis que podem ser chamadas e utilizadas em qualquer
*      canto da aplicação.
*/
const ThemeProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const [theme, setTheme] = useState<ITheme>(() => {
        const themeSaved = localStorage.getItem('@dc5bf16b1811-Dashboard:theme')

        if (themeSaved) {
            return JSON.parse(themeSaved)
        } else {
            return light
        }
    })


    /*
    * --> TROCAR TEMA
    *      Verifica por meio do titulo, qual tema está sendo usado atualmente na
    *      aplicação, e após fazer a troca guarda a informação do tema atual
    *      na memória do navegador.
    */
    const toggleTheme = () => {
        if (theme.title === 'light') {
            setTheme(dark)
            localStorage.setItem('@dc5bf16b1811-Dashboard:theme', JSON.stringify(dark))
        } else {
            setTheme(light)
            localStorage.setItem('@dc5bf16b1811-Dashboard:theme', JSON.stringify(light))
        }
    }
    

    return (
        <ThemeContext.Provider value={{ toggleTheme, theme }}>
            { children }
        </ThemeContext.Provider>
    )
}


/*
* --> DA ACESSO AS FUNÇÕES E VARIÁVEIS DO CONTEXTO
*      Por meio de desestruturação é possivel acessar qualquer dado do contexto
*      ao instanciar a função abaixo.
*/
function useTheme(): IThemeContext {
    const context = useContext(ThemeContext)
    return context
}

export { ThemeProvider, useTheme }