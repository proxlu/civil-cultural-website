import { enviarNoticia } from "./functions_firebase.js";

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("newsForm").addEventListener("submit", async function (event) {
        event.preventDefault();

        const news = {
            name: document.getElementById("name").value,
            title: document.getElementById("title").value,
            summary: document.getElementById("summary").value, // ✅ Resumo da notícia
            content: tinymce.get("content").getContent(),
            image: document.getElementById("image").value,
            timestamp: new Date()
        };

        await enviarNoticia(news);
    });
});
