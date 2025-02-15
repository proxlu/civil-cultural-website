document.addEventListener('DOMContentLoaded', () => {
    // Função de tradução automática
    function translate(text, targetLang, callback) {
        const sourceLang = document.documentElement.lang === 'pt-BR' ? 'pt' : 'en';
        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLang}|${targetLang}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
            if (data.responseStatus === 200) {
                callback(data.responseData.translatedText);
            } else {
                callback(`Erro: ${data.responseDetails}`);
            }
        })
            .catch(error => {
            callback(`Erro: ${error}`);
        });
    }

    // Função para traduzir um texto maior, dividindo-o em pedaços de até 500 caracteres
    async function translateTextInChunks(text, targetLang) {
        const maxLength = 500; // Limite de caracteres da API
        const chunks = [];

        // Dividir o texto em partes de no máximo 500 caracteres
        for (let i = 0; i < text.length; i += maxLength) {
            chunks.push(text.slice(i, i + maxLength));
        }

        // Traduzir cada parte separadamente e combinar os resultados
        const translatedChunks = await Promise.all(chunks.map(chunk =>
        new Promise((resolve, reject) => {
            translate(chunk, targetLang, (result) => {
                if (result.startsWith('Erro:')) {
                    reject(result);
                } else {
                    resolve(result);
                }
            });
        })
        ));

        return translatedChunks.join('');
    }

    // Função para traduzir os elementos HTML automaticamente
    async function translateElement(element, targetLang) {
        // Se o elemento tiver o atributo "traduzir-no", ele não será traduzido
        if (element.hasAttribute('traduzir-no')) {
            return;
        }

        // Obtém o conteúdo original e o armazena se ainda não foi salvo
        const originalText = element.getAttribute('data-original-text') || element.innerHTML || element.value || element.placeholder;

        if (!element.getAttribute('data-original-text')) {
            element.setAttribute('data-original-text', originalText);
        }

        try {
            const translatedText = await translateTextInChunks(originalText, targetLang);

            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translatedText; // Tradução para inputs e textareas
            } else {
                element.innerHTML = translatedText; // Tradução para textos normais
            }

        } catch (error) {
            console.error(error);
            element.innerHTML = error;
        }
    }

    // Função para mudar a linguagem do TinyMCE
    function updateTinyMCELanguage(targetLang) {
        const tinyLang = targetLang === 'pt-BR' ? 'pt_BR' : 'en';

        tinymce.remove(); // Remove a instância atual para evitar conflitos
        tinymce.init({
            selector: '#content',
            language: tinyLang,
            plugins: 'advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table code help wordcount',
            toolbar: 'undo redo | formatselect | bold italic underline strikethrough | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | code',
            height: 300
        });
    }

    // Alternar idioma
    const languageToggle = document.getElementById('language-toggle');
    if (languageToggle) {
        languageToggle.addEventListener('click', async () => {
            languageToggle.disabled = true;
            languageToggle.textContent = 'Traduzindo...';

            const currentLang = document.documentElement.lang;
            const targetLang = currentLang === 'pt-BR' ? 'en' : 'pt-BR';

            // Traduzir todos os elementos marcados com "traduzir"
            const elementsToTranslate = document.querySelectorAll('[traduzir], input[traduzir], textarea[traduzir]');
            for (const element of elementsToTranslate) {
                await translateElement(element, targetLang);
            }

            // Atualiza a linguagem da página e do TinyMCE
            document.documentElement.lang = targetLang;
            updateTinyMCELanguage(targetLang);

            languageToggle.textContent = targetLang === 'en' ? 'EN/PT' : 'PT/EN';
            languageToggle.disabled = false;
        });
    } else {
        console.error('Elemento language-toggle não encontrado.');
    }

    // Inicializa TinyMCE com a linguagem correta ao carregar a página
    updateTinyMCELanguage(document.documentElement.lang);
});
