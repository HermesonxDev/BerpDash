import { useState, useEffect } from "react";
import { getFirestore, collection, getDocs, query, QuerySnapshot } from "firebase/firestore";
import app from "../config/firebase";

const db = getFirestore(app)

const useFirestore = (collectionName: string) => {
    const [documents, setDocuments] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        const fetchDocuments = async () => {
          try {
            const q = query(collection(db, collectionName));
            const querySnapshot: QuerySnapshot = await getDocs(q)
            const docs: any[] = []

            querySnapshot.forEach((doc) => {
              docs.push({ id: doc.id, ...doc.data() })
            });

            setDocuments(docs)
            setLoading(false)
          } catch (err) {
            setError(err as Error)
            setLoading(false)
          }
        };
    
        fetchDocuments()
    }, [collectionName])

    return { documents, loading, error }
}

export default useFirestore;