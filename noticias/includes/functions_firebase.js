// includes/functions_firebase.js
import { collection, addDoc, getDocs, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";
import { db } from "../config/firebase-config.js";

// 🔹 Função para adicionar notícia ao Firestore
export async function enviarNoticia(dados) {
    if (dados.token !== "1234") {
        alert("Acesso negado! Token inválido.");
        return;
    }

    delete dados.token; // Remove token antes de salvar

    dados.timestamp = serverTimestamp(); // Adiciona timestamp

    try {
        await addDoc(collection(db, "noticias"), dados);
        alert("Notícia enviada com sucesso!");
    } catch (error) {
        console.error("Erro ao enviar notícia:", error);
        alert("Erro ao enviar notícia.");
    }
}

// 🔹 Função para buscar todas as notícias
export async function obterNoticias() {
    try {
        const querySnapshot = await getDocs(collection(db, "noticias"));
        const noticias = [];
        querySnapshot.forEach((doc) => {
            noticias.push({ id: doc.id, ...doc.data() });
        });
        return noticias;
    } catch (error) {
        console.error("Erro ao obter notícias:", error);
        return [];
    }
}

export async function carregarNoticias() {
    try {
        const querySnapshot = await getDocs(collection(db, "noticias"));
        const noticiasContainer = document.getElementById("noticiasContainer");
        noticiasContainer.innerHTML = ""; // Limpa antes de exibir

        querySnapshot.forEach((doc) => {
            const noticia = doc.data();
            noticiasContainer.innerHTML += `
                <div class="noticia">
                    <h3>${noticia.title}</h3>
                    <p><strong>${noticia.name}</strong></p>
                    <p>${noticia.bio}</p>
                    <p>${noticia.content}</p>
                    ${noticia.image ? `<img src="${noticia.image}" width="100%">` : ""}
                </div>
            `;
        });
    } catch (error) {
        console.error("Erro ao carregar notícias:", error);
    }
}
