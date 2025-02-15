// Buscar SHA do arquivo no GitHub (para edição)
async function getFileSha(filename) {
    const response = await fetch(CONFIG.GITHUB_API + filename, {
        headers: {
            Authorization: `token ${CONFIG.GITHUB_TOKEN}`,
            Accept: "application/vnd.github.v3+json"
        }
    });

    if (response.ok) {
        const data = await response.json();
        return data.sha;
    }
    return null;
}

// Enviar notícia para o GitHub
async function enviarNoticia(dados) {
    if (dados.token !== "1234") { // 🔴 Mudar para um sistema de autenticação melhor!
        alert("Acesso negado! Token inválido.");
        return;
    }

    const filename = `noticia_${Date.now()}.json`;
    const conteudoBase64 = btoa(JSON.stringify(dados, null, 2));

    const sha = await getFileSha(filename);

    const payload = {
        message: "Adicionando nova notícia",
        content: conteudoBase64,
        branch: "main"
    };

    if (sha) {
        payload.sha = sha; // Atualiza o arquivo se já existir
    }

    fetch(CONFIG.GITHUB_API + filename, {
        method: "PUT",
        headers: {
            Authorization: `token ${CONFIG.GITHUB_TOKEN}`,
            Accept: "application/vnd.github.v3+json"
        },
        body: JSON.stringify(payload)
    })
        .then(response => response.json())
        .then(data => {
        if (data.commit) {
            alert("Notícia enviada para o GitHub com sucesso!");
        } else {
            alert("Erro ao enviar notícia.");
        }
    })
        .catch(error => {
        console.error("Erro:", error);
        alert("Erro na comunicação com o GitHub.");
    });
}
