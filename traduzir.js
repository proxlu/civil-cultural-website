document.addEventListener('DOMContentLoaded', () => {
    // Definir a função de tradução
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

    // Função para traduzir texto
    async function translateText(text, targetLang) {
        return new Promise((resolve, reject) => {
            try {
                translate(text, targetLang, (result) => {
                    if (result.startsWith('Error:')) {
                        reject(result);
                    } else {
                        resolve(result);
                    }
                });
            } catch (error) {
                reject('Erro ao traduzir! ' + error);
            }
        });
    }

    // Alternar idioma
    const languageToggle = document.getElementById('language-toggle');
    if (languageToggle) {
        languageToggle.addEventListener('click', async () => {
            languageToggle.disabled = true; // Desabilita o botão durante a tradução
            languageToggle.textContent = 'Traduzindo...';

            const currentLang = document.documentElement.lang;
            const targetLang = currentLang === 'pt-BR' ? 'en' : 'pt';
            const elementsToTranslate = document.querySelectorAll('[data-translate]');

            for (const element of elementsToTranslate) {
                const originalText = element.getAttribute('data-original-text') || element.innerText;
                if (!element.getAttribute('data-original-text')) {
                    element.setAttribute('data-original-text', originalText);
                }

                if (currentLang === 'pt-BR' && originalText !== element.innerText) {
                    element.innerText = originalText;
                } else {
                    try {
                        const translatedText = await translateText(originalText, targetLang);
                        element.innerText = translatedText;
                    } catch (error) {
                        console.error(error);
                        element.innerText = error;
                    }
                }
            }

            document.documentElement.lang = targetLang === 'en' ? 'en' : 'pt-BR';
            languageToggle.textContent = targetLang === 'en' ? 'EN/PT' : 'PT/EN';
            languageToggle.disabled = false; // Habilita o botão após a tradução
        });
    } else {
        console.error('Elemento language-toggle não encontrado.');
    }
});