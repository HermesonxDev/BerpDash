import { createContext, useState,useContext } from "react";
import app from '../config/firebase'
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail  } from 'firebase/auth'
import SearchUser from "./SearchUser";
import { FirebaseError } from "firebase/app";

interface IAuthContext {
    logged: boolean,
    Admin: boolean,
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
        const isLogged = localStorage.getItem('@dc5bf16b1811-Dashboard:isLogged')
        return !!isLogged
    })

    const [Admin, setAdmin] = useState<boolean>(() => {
        const isAdmin = localStorage.getItem('@dc5bf16b1811-Dashboard:isAdmin')
        return !!isAdmin
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
    const signIn = async (event: React.FormEvent<HTMLFormElement>, email: string, password: string) => {
        event.preventDefault();
        
        try {
            await signInWithEmailAndPassword(auth, email, password);
    
            localStorage.setItem('@dc5bf16b1811-Dashboard:isLogged', 'true');
            setLogged(true);
            setMessage('');

            const userData = await SearchUser(email);
    
            if (userData && userData.length > 0) {
                const user = userData[0];
                if (user.role && user.role.includes("admin")) {
                    localStorage.setItem('@dc5bf16b1811-Dashboard:isAdmin', 'true');
                    setAdmin(true);
                }
            }
    
        } catch (error) {
            const firebaseError = error as FirebaseError;
            const errorCode = firebaseError.code;
            const errorMessage = firebaseError.message;
            console.log("errorMessage:", errorMessage, "errorCode:", errorCode);
            setMessage('Usuário ou senha inválidos!');
        }
    };


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
        localStorage.removeItem('@dc5bf16b1811-Dashboard:isLogged')
        localStorage.removeItem('@dc5bf16b1811-Dashboard:isAdmin')
        setLogged(false)
        setAdmin(false)
    }

    
    const removeEmailNotification = () => {
        setShowNotification(false)
    }
    
    return (
        <AuthContext.Provider value={{ logged, Admin, showNotification, message, signIn, recoveryPassword, signOut, removeEmailNotification }}>
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