import { getFirestore, collection, getDocs, getDoc, doc, query, where, DocumentData } from "firebase/firestore";
import app from "../config/firebase";

const db = getFirestore(app);

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

export default SearchUser;
