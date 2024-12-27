const { i18n } = require('./next-i18next.config')
const nextEnv = require('next-env');
const dotenvLoad = require('dotenv-load');
 
dotenvLoad();
 
const withNextEnv = nextEnv();

module.exports = withNextEnv({
  webpack5: true,
  swcMinify: true,
  i18n,
  images: {
    domains: [
      'img.freepik.com'
    ]
  }
})