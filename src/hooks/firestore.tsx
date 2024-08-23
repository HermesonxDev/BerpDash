import { createContext, useState, useContext, useEffect } from "react";
import { initializeApp, FirebaseApp } from "firebase/app";
import { getFirestore as getFirestoreDB, collection, getDocs, query, QuerySnapshot, DocumentData, where, getDoc, doc, addDoc, setDoc } from "firebase/firestore";
import { getAuth, Auth, createUserWithEmailAndPassword } from "firebase/auth";
import firebaseConfig from "../config/firebase";

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

interface IFirestoreContext {
    user: IUserProps,
    app: FirebaseApp,
    db: ReturnType<typeof getFirestoreDB>,
    auth: Auth,
    setUser: React.Dispatch<React.SetStateAction<IUserProps>>,
    SearchUser: (
        field: string,
        value: string | number
    ) => Promise<DocumentData | DocumentData[] | null>,
    getFirestore: (
        collectionName: string
    ) => { documents: any[]; loading: boolean; error: Error | null },
    createUserFirebase(
        event: React.FormEvent<HTMLFormElement>,
        name: string,
        email: string,
        password: string,
        role: string[],
        status: boolean | null,
        units: string[],
        navigate: (path: string) => void
    ): void,
    editUserFirebase(
        event: React.FormEvent<HTMLFormElement>,
        id: string | undefined,
        name: string,
        email: string,
        role: string[],
        status: boolean | null,
        units: string[],
        navigate: (path: string) => void
    ): void
}

const FirestoreContext = createContext<IFirestoreContext>({} as IFirestoreContext);

const FirestoreProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {

    const app = initializeApp(firebaseConfig);
    const db = getFirestoreDB(app);
    const auth = getAuth(app);


    const [user, setUserState] = useState<IUserProps>(() => {
        const onUser = localStorage.getItem('@dc5bf16b1811-Dashboard:user');
        return onUser ? JSON.parse(onUser) : {
            created_at: '',
            email: '',
            last_access: '',
            name: '',
            password: '',
            role: [],
            status: false,
            uid: '',
            units: []
        };
    });


    const setUser: React.Dispatch<React.SetStateAction<IUserProps>> = (value) => {
        if (typeof value === 'function') {
            setUserState((prevState) => {
                const newUser = value(prevState);
                localStorage.setItem('@dc5bf16b1811-Dashboard:user', JSON.stringify(newUser));
                return newUser;
            });
        } else {
            localStorage.setItem('@dc5bf16b1811-Dashboard:user', JSON.stringify(value));
            setUserState(value);
        }
    };


    const SearchUser = async (field: string, value: string | number): Promise<DocumentData | DocumentData[] | null> => {
        try {
            if (field === "id") {
                const docRef = doc(db, "users", value as string);
                const docSnap = await getDoc(docRef);

                if (!docSnap.exists()) {
                    console.log(`Nenhum documento encontrado com o ID: ${value}.`);
                    return null;
                }

                return docSnap.data();
            } else {
                const usersCollection = collection(db, "users");
                const q = query(usersCollection, where(field, "==", value));
                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) {
                    console.log(`Nenhum usuário encontrado com ${field} = ${value}.`);
                    return null;
                }

                return querySnapshot.docs.map(doc => doc.data());
            }
        } catch (error) {
            console.error("Erro ao buscar usuário:", error);
            return null;
        }
    };


    const getFirestore = (collectionName: string) => {
        const [documents, setDocuments] = useState<any[]>([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState<Error | null>(null);

        useEffect(() => {
            const fetchDocuments = async () => {
                try {
                    const q = query(collection(db, collectionName));
                    const querySnapshot: QuerySnapshot = await getDocs(q);
                    const docs: any[] = [];

                    querySnapshot.forEach((doc) => {
                        docs.push({ id: doc.id, ...doc.data() });
                    });

                    setDocuments(docs);
                    setLoading(false);
                } catch (err) {
                    setError(err as Error);
                    setLoading(false);
                }
            };

            fetchDocuments();
        }, [collectionName]);

        return { documents, loading, error };
    };


    const createUserFirebase = async (
        event: React.FormEvent<HTMLFormElement>,
        name: string,
        email: string,
        password: string,
        role: string[],
        status: boolean,
        units: string[],
        navigate: (path: string) => void
    ) => {
        event.preventDefault();
        
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const timestamp = new Date().toISOString()

            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name,
                email,
                password,
                role,
                status,
                units,
                created_at: timestamp,
                last_access: timestamp
            })
            navigate("/administration/list-users")
        } catch (error) {
            console.error("Erro ao adicionar documento: ", error);
        }
    }


    const editUserFirebase = async (
        event: React.FormEvent<HTMLFormElement>,
        id: string,
        name: string,
        email: string,
        role: string[],
        status: boolean,
        units: string[],
        navigate: (path: string) => void

    ) => {
        event.preventDefault();
    
        try {
            if (id) {
                const userRef = doc(db, "users", id);
                await setDoc(userRef, {
                    name,
                    email,
                    role,
                    status,
                    units
                }, { merge: true });
            }
            navigate("/administration/list-users")
        } catch (error) {
            console.error("Erro ao atualizar usuário:", error);
        }
    }

    return (
        <FirestoreContext.Provider value={{
            user,
            app,
            db,
            auth,
            setUser,
            SearchUser,
            getFirestore,
            createUserFirebase,
            editUserFirebase
        }}>
            {children}
        </FirestoreContext.Provider>
    );
};

function useFirestore(): IFirestoreContext {
    const context = useContext(FirestoreContext);
    if (!context) {
        throw new Error("useFirestore must be used within a FirestoreProvider");
    }
    return context;
}

export { FirestoreProvider, useFirestore };
