// processa_noticias.js
// Use módulos para importar a função de envio
import { enviarNoticia } from "./functions_firebase.js";

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("newsForm").addEventListener("submit", function (event) {
        event.preventDefault();

        const news = {
            name: document.getElementById("name").value,
            token: document.getElementById("token").value,
            bio: document.getElementById("bio").value,
            title: document.getElementById("title").value,
            content: tinymce.get("content").getContent(), // Conteúdo formatado pelo TinyMCE
            image: document.getElementById("image").value
        };

        // Envia para o Firestore
        enviarNoticia(news);
    });
});
