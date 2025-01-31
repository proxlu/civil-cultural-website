document.addEventListener('DOMContentLoaded', () => {
    // Função de tradução
    function translate(text, targetLang, callback) {
        const sourceLang = document.documentElement.lang === 'pt-BR' ? 'pt' : 'en';
        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLang}|${targetLang}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.responseStatus === 200) {
                    callback(data.responseData.translatedText);
                } else {
                    callback(`Error: ${data.responseDetails}`);
                }
            })
            .catch(error => {
                callback(`Error: ${error}`);
            });
    }

    // Função para traduzir um texto maior, dividindo-o em pedaços de até 500 caracteres
    async function translateTextInChunks(text, targetLang) {
        const maxLength = 500; // Limite de caracteres para a API
        const chunks = [];

        // Dividir o texto em pedaços de até 500 caracteres
        for (let i = 0; i < text.length; i += maxLength) {
            chunks.push(text.slice(i, i + maxLength));
        }

        // Traduzir cada pedaço separadamente e combinar os resultados
        const translatedChunks = await Promise.all(chunks.map(chunk =>
            new Promise((resolve, reject) => {
                translate(chunk, targetLang, (result) => {
                    if (result.startsWith('Error:')) {
                        reject(result);
                    } else {
                        resolve(result);
                    }
                });
            })
        ));

        // Combinar as partes traduzidas
        return translatedChunks.join('');
    }

    // Função para traduzir os elementos HTML, mantendo a formatação
    async function translateElement(element, targetLang, currentLang) {
        // Verifica se o elemento tem o atributo data-no-translate, que vai impedir a tradução
        if (element.hasAttribute('data-no-translate')) {
            return; // Não traduz se o atributo estiver presente
        }

        // Verifica o conteúdo original armazenado no atributo data-original-html
        const originalHtml = element.getAttribute('data-original-html') || element.innerHTML || element.value || element.placeholder;

        if (!element.getAttribute('data-original-html')) {
            element.setAttribute('data-original-html', originalHtml); // Armazena o conteúdo HTML original
        }

        // Traduz o texto, mas preservando a estrutura HTML
        try {
            const translatedText = await translateTextInChunks(originalHtml, targetLang);

            // Atualiza o conteúdo do elemento com o texto traduzido, preservando a formatação HTML
            element.innerHTML = translatedText;

        } catch (error) {
            console.error(error);
            if (element.innerHTML !== undefined) {
                element.innerHTML = error;
            }
        }
    }

    // Alternar idioma
    const languageToggle = document.getElementById('language-toggle');
    if (languageToggle) {
        languageToggle.addEventListener('click', async () => {
            languageToggle.disabled = true; // Desabilita o botão durante a tradução
            languageToggle.textContent = 'Traduzindo...';

            const currentLang = document.documentElement.lang;
            const targetLang = currentLang === 'pt-BR' ? 'en' : 'pt';
            const elementsToTranslate = document.querySelectorAll('[data-translate], input, textarea, select');

            // Traduzir todos os elementos
            for (const element of elementsToTranslate) {
                await translateElement(element, targetLang, currentLang);
            }

            // Atualiza o idioma da página
            document.documentElement.lang = targetLang === 'en' ? 'en' : 'pt-BR';
            languageToggle.textContent = targetLang === 'en' ? 'EN/PT' : 'PT/EN';
            languageToggle.disabled = false; // Habilita o botão após a tradução
        });
    } else {
        console.error('Elemento language-toggle não encontrado.');
    }
});
