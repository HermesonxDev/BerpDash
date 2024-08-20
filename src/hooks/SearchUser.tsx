import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";
import app from "../config/firebase";

const db = getFirestore(app)

const SearchUser = async (email: string) => {
    try {
      const usersCollection = collection(db, "users");
      const q = query(usersCollection, where("email", "==", email));
      const querySnapshot = await getDocs(q);
  
      if (querySnapshot.empty) {
        console.log("Nenhum usuário encontrado com esse email.");
        return null;
      }
  
      const userData = querySnapshot.docs.map(doc => doc.data());
      
      return userData;
  
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
    }
  };

export default SearchUser