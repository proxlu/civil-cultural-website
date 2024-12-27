module.exports = {
    i18n: {
    defaultLocale: 'en-US',
        locales: [
            'en-US',
            'pt-BR',
            'es-ES',
            'ar-AA',
            "fr-FR"
        ],
    reloadOnPrerender: process.env.APP_ENV == 'dev'
    },
}