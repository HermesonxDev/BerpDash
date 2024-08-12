import mockedUser from "../mock/user";
import { createContext, useState,useContext } from "react";
import app from '../config/firebase'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

interface UserType {
    username: string;
    email: string;
    password: string;
}

interface IAuthContext {
    user: UserType
    logged: boolean,
    signIn(email: string, password: string): void,
    signOut(): void
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

    const user = mockedUser

    const auth = getAuth(app)


    /*
    * --> LOGIN
    *      Recebe um email e senha do usuário e verifica se é igual ao email e senha
    *      guardado na base de dados, caso seja guarda essas informações na memória do
    *      navegador para ser usado posteriormente e libera o acesso para a aplicação.
    */
    const signIn = (email: string, password: string) => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const currentUser = (userCredential.user)
            localStorage.setItem('@dc5bf16b1811-Dashboard:logged', 'true')
            setLogged(true)
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
    
    return (
        <AuthContext.Provider value={{ user, logged, signIn, signOut }}>
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