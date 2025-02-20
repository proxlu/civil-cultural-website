// includes/auth.js
import { auth } from "../config/firebase-config.js";
import { signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

// 🔹 Função de Login
export async function login(email, senha) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, senha);
        console.log("Usuário logado:", userCredential.user);
        alert("Login bem-sucedido!");
    } catch (error) {
        console.error("Erro no login:", error.message);
        alert("Erro no login.");
    }
}

// 🔹 Função de Logout
export async function logout() {
    try {
        await signOut(auth);
        alert("Usuário deslogado!");
    } catch (error) {
        console.error("Erro ao deslogar:", error);
    }
}
