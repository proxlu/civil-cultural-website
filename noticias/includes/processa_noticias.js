// Importar funções
document.write('<script src="../includes/functions.js"></script>');

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("newsForm").addEventListener("submit", function(event) {
        event.preventDefault();

        const news = {
            name: document.getElementById("name").value,
            token: document.getElementById("token").value,
            bio: document.getElementById("bio").value,
            title: document.getElementById("title").value,
            content: tinymce.get("content").getContent(), // Pega o conteúdo formatado
            image: document.getElementById("image").value
        };

        // Enviar para o GitHub
        enviarNoticia(news);
    });
});
