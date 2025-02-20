// includes/auth.js
import { auth } from "../config/firebase-config.js";
import {
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
signOut,
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

// 🔹 Criar Conta
export async function registrar(email, senha) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
        console.log("Usuário registrado:", userCredential.user);
        alert("Conta criada com sucesso!");
    } catch (error) {
        console.error("Erro ao registrar:", error.message);
        alert("Erro ao registrar: " + error.message);
    }
}

// 🔹 Fazer Login
export async function login(email, senha) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, senha);
        console.log("Usuário logado:", userCredential.user);
        alert("Login bem-sucedido!");
        verificarAdmin(userCredential.user);
    } catch (error) {
        console.error("Erro no login:", error.message);
        alert("Erro no login: " + error.message);
    }
}

// 🔹 Fazer Logout
export async function logout() {
    try {
        await signOut(auth);
        alert("Usuário deslogado!");
        window.location.reload();
    } catch (error) {
        console.error("Erro ao deslogar:", error);
    }
}

// 🔹 Verificar se o usuário é Admin
function verificarAdmin(user) {
    const adminEmail = "civilculturalteam@gmail.com";
    if (user.email === adminEmail) {
        document.getElementById("adminPanel").style.display = "block"; // Exibe painel admin
    }
}

// 🔹 Detectar Mudança de Estado do Usuário (Login/Logout)
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("Usuário está logado:", user.email);
        verificarAdmin(user);
        document.getElementById("loginForm").style.display = "none"; // Esconde login
        document.getElementById("logoutBtn").style.display = "block"; // Mostra logout
    } else {
        console.log("Nenhum usuário logado.");
        document.getElementById("loginForm").style.display = "block";
        document.getElementById("logoutBtn").style.display = "none";
    }
});
