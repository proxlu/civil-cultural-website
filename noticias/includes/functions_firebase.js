// functions_firebase.js
// Lembre-se: este arquivo usa módulos ES
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";
import { db } from "../config/firebase-config.js"; // ajuste o caminho conforme sua estrutura

export async function enviarNoticia(dados) {
    // Validação simples – substitua por um sistema de autenticação robusto se necessário
    if (dados.token !== "1234") {
        alert("Acesso negado! Token inválido.");
        return;
    }

    // Removemos o token para não armazená-lo no banco
    delete dados.token;

    // Adiciona um timestamp para futura ordenação
    dados.timestamp = serverTimestamp();

    try {
        await addDoc(collection(db, "noticias"), dados);
        alert("Notícia enviada com sucesso!");
    } catch (error) {
        console.error("Erro ao enviar notícia: ", error);
        alert("Erro ao enviar notícia.");
    }
}
