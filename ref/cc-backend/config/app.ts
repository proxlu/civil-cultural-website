import proxyAddr from 'proxy-addr'
import Env from '@ioc:Adonis/Core/Env'
import { ServerConfig } from '@ioc:Adonis/Core/Server'
import { LoggerConfig } from '@ioc:Adonis/Core/Logger'
import { ProfilerConfig } from '@ioc:Adonis/Core/Profiler'
import { ValidatorConfig } from '@ioc:Adonis/Core/Validator'

export const appKey: string = Env.get('APP_KEY')

export const http: ServerConfig = {
  allowMethodSpoofing: false,
  subdomainOffset: 2,
  generateRequestId: true,
  trustProxy: proxyAddr.compile('loopback'),

  etag: false,
  jsonpCallbackName: 'callback',

  cookie: {
    domain: '',
    path: '/',
    maxAge: '2h',
    httpOnly: true,
    secure: false,
    sameSite: false,
  },

  getIp(request) {
    const nginxRealIp = request.header('X-Real-Ip')

    return nginxRealIp ? nginxRealIp : request.ips()[0]
  }
}

export const logger: LoggerConfig = {
  name: Env.get('APP_NAME'),
  level: Env.get('LOG_LEVEL', 'info'),
  prettyPrint: Env.get('NODE_ENV') === 'development',
  enabled: true
}

export const profiler: ProfilerConfig = {
  enabled: true,
  blacklist: [],
  whitelist: [],
}

export const validator: ValidatorConfig = {
}
