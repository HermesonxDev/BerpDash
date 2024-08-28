import { createContext, useState,useContext } from "react";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth'
import { FirebaseError } from "firebase/app";
import { useFirestore } from "./firestore";

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

interface IUserProps {
    created_at: string;
    email: string;
    last_access: string;
    name: string;
    password: string;
    role: string[];
    status: boolean;
    uid: string;
    units: string[];
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

    const { app, setUser, SearchUser } = useFirestore()

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
    
            const userData = await SearchUser("email", email);
            
            if (Array.isArray(userData) && userData.length > 0) {
                const user = userData[0];

                const userProps: IUserProps = {
                    created_at: user.created_at || '',
                    email: user.email || '',
                    last_access: user.last_access || '',
                    name: user.name || '',
                    password: user.password || '',
                    role: user.role || [],
                    status: user.status || false,
                    uid: user.uid || '',
                    units: user.units || [],
                };
    
                if (user.status) {
                    if (user.role && user.role.includes("admin")) {
                        localStorage.setItem('@dc5bf16b1811-Dashboard:isAdmin', 'true');
                        localStorage.setItem('@dc5bf16b1811-Dashboard:isLogged', 'true');
                        setAdmin(true);
                        setLogged(true);
                        setUser(userProps);
                        setMessage('');
                    }

                    localStorage.setItem('@dc5bf16b1811-Dashboard:isLogged', 'true');
                    setLogged(true);
                    setUser(userProps);
                    setMessage('');
                } else {
                    setMessage('Usuário desativado, entre em contato com a Berp Sistemas!');
                }
            }
        } catch (error) {
            const firebaseError = error as FirebaseError;

            // const errorCode = firebaseError.code;
            // const errorMessage = firebaseError.message;
            // console.log("errorMessage:", errorMessage, "errorCode:", errorCode);

            if (firebaseError.code === "auth/invalid-credential"){
                setMessage('Usuário ou senha inválidos!');
            }
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
        localStorage.removeItem('@dc5bf16b1811-Dashboard:user')
        setLogged(false)
        setAdmin(false)
    }

    
    const removeEmailNotification = () => {
        setShowNotification(false)
    }
    
    return (
        <AuthContext.Provider value={{
            logged,
            Admin,
            showNotification,
            message,
            signIn,
            recoveryPassword,
            signOut,
            removeEmailNotification
        }}>
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