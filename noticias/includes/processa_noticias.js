// includes/processa_noticias.js
import { enviarNoticia } from "./functions_firebase.js";

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("newsForm").addEventListener("submit", async function (event) {
        event.preventDefault();

        const news = {
            name: document.getElementById("name").value,
            token: document.getElementById("token").value,
            bio: document.getElementById("bio").value,
            title: document.getElementById("title").value,
            content: tinymce.get("content").getContent(),
            image: document.getElementById("image").value
        };

        await enviarNoticia(news);
    });
});
