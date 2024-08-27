import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import firebaseConfig from '../config/firebase';

admin.initializeApp(firebaseConfig);

interface DeleteUserData {
  uid: string;
}

interface DeleteUserResult {
  success: boolean;
  message: string;
}

// Função auxiliar para verificar se o usuário é administrador na coleção `users`
async function isUserAdmin(uid: string): Promise<boolean> {
  try {
    // Referência à coleção 'users'
    const userRef = admin.firestore().collection('users').doc(uid);
    const userSnap = await userRef.get();

    if (!userSnap.exists) {
      console.error(`Usuário com ID ${uid} não encontrado na coleção users.`);
      return false;
    }

    const userData = userSnap.data();
    
    // Verifica se o campo 'role' é um array e contém 'admin'
    return userData?.role && Array.isArray(userData.role) && userData.role.includes('admin');
  } catch (error) {
    console.error('Erro ao verificar o papel do usuário:', error);
    return false;
  }
}

// Função para deletar um usuário
exports.deleteUser = functions.https.onCall(async (data: DeleteUserData, context): Promise<DeleteUserResult> => {
  // Verifique se o usuário que está tentando fazer a chamada é autenticado
  if (!context.auth) {
    return { success: false, message: 'Usuário não autenticado.' };
  }

  const requestingUserId = context.auth.uid;

  // Verifique se o usuário que está tentando deletar é administrador
  const isAdmin = await isUserAdmin(requestingUserId);
  
  if (!isAdmin) {
    return { success: false, message: 'Permissão negada. Somente administradores podem deletar usuários.' };
  }

  const { uid } = data;

  try {
    // Deletar o usuário do Firebase Authentication
    await admin.auth().deleteUser(uid).then(() => {
      console.log('Successfully deleted user');
    })
    .catch((error) => {
      console.log('Error deleting user:', error);
    });

    // Deletar o documento do Firestore
    const db = admin.firestore();
    await db.collection('users').doc(uid).delete();

    return { success: true, message: "Usuário deletado com sucesso." };
  } catch (error: any) {
    console.error('Erro ao deletar o usuário:', error);
    return { success: false, message: error.message };
  }
});
