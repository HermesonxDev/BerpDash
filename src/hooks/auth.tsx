import { createContext, useState,useContext } from "react";
import app from '../config/firebase'
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail  } from 'firebase/auth'

interface IAuthContext {
    logged: boolean,
    showNotification: boolean,
    message: string,
    signIn(
        event: React.FormEvent<HTMLFormElement>,
        email: string,
        password: string
    ): void,
    recoveryPassword(
        event: React.FormEvent<HTMLFormElement>,
        email: string,
        navigate: (path: string) => void
    ): void,
    signOut(): void,
    removeEmailNotification(): void,
}

/* CRIA O CONTEXTO PARA SER USADO NA APLICAÇÃO */
const AuthContext = createContext<IAuthContext>({} as IAuthContext)


/*
* --> PROVÊ O CONTEXTO PARA A APLICAÇÃO
*      Guarda as funções e variáveis que podem ser chamadas e utilizadas em qualquer
*      canto da aplicação.
*/
const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {

    const [logged, setLogged] = useState<boolean>(() => {
        const isLogged = localStorage.getItem('@dc5bf16b1811-Dashboard:logged')
        return !!isLogged
    })

    const [message, setMessage] = useState('')
    const [showNotification, setShowNotification] = useState(false)

    const auth = getAuth(app)

    /*
    * --> LOGIN
    *      Recebe um email e senha do usuário e verifica se é igual ao email e senha
    *      guardado na base de dados, caso seja guarda essas informações na memória do
    *      navegador para ser usado posteriormente e libera o acesso para a aplicação.
    */
    const signIn = (event: React.FormEvent<HTMLFormElement>, email: string, password: string) => {
        event.preventDefault()
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const currentUser = (userCredential.user)
            localStorage.setItem('@dc5bf16b1811-Dashboard:logged', 'true')
            setLogged(true)
            setMessage('')
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("errorMessage:", errorMessage, "errorCode:", errorCode)
            setMessage('Usuário ou senha inválidos!')
        })
    }


    /*
    * --> RECOVERY PASSWORD
    *      Recebe um email e após verificar se esse email esta relacionado a algum
    *      usuário devolve um outro email para redefinir a senha de acesso ao sistema.
    */
    const recoveryPassword = (event: React.FormEvent<HTMLFormElement>, email: string, navigate: (path: string) => void) => {
        event.preventDefault()
        sendPasswordResetEmail(auth, email)
        .then(() => {
            localStorage.removeItem('@dc5bf16b1811-Dashboard:logged')
            setShowNotification(true)
            navigate('/')
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("errorMessage:", errorMessage, "errorCode:", errorCode)
        })
    }


    /*
    * --> LOGOUT
    *      Apaga as informações de acesso do usuário que estão guardados na memória
    *      do navegador e retira o acesso dele a aplicação.
    */
    const signOut = () => {
        localStorage.removeItem('@dc5bf16b1811-Dashboard:logged')
        setLogged(false)
    }

    
    const removeEmailNotification = () => {
        setShowNotification(false)
    }
    
    return (
        <AuthContext.Provider value={{ logged, showNotification, message, signIn, recoveryPassword, signOut, removeEmailNotification }}>
            { children }
        </AuthContext.Provider>
    )
}


/*
* --> DA ACESSO AS FUNÇÕES E VARIÁVEIS DO CONTEXTO
*      Por meio de desestruturação é possivel acessar qualquer dado do contexto
*      ao instanciar a função abaixo.
*/
function useAuth(): IAuthContext {
    const context = useContext(AuthContext)
    return context
}

export { AuthProvider, useAuth }