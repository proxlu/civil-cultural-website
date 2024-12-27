import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CustomMessageErrorException from 'App/Exceptions/CustomMessageErrorException';
import UserAuth from 'App/Models/UserAuth';
import UserAuthValidator from 'App/Validators/UserAuthValidator';
import address from 'address'

export default class AuthController {

  public async login({ request, response, auth }: HttpContextContract): Promise<void> {
    try {
      const { email, password } = request.only(['email', 'password'])

      response.ok(
        await auth
          .use('api')
          .attempt(email, password, {
            expiresIn: 360 * 1 * 60 * 60, // expira em 1 ano
            name: 'token_bearer',
            ip4_address: address.ip(),
            ip6_address: address.ipv6(),
            user_agent: request.header('User-Agent')
          })
      )
    } catch (error) {
      response.unauthorized({ error: 'Unauthenticated' })
    }
  }

  public async logout({ response, auth }: HttpContextContract): Promise<void> {
    try {
      response.ok(await auth.logout())
    } catch (error) {
      throw new CustomMessageErrorException(
        error.name === 'ValidationException' ? JSON.stringify(error.messages) : error.message,
        error.status ?? undefined,
        error.code ?? undefined,
      )
    }
  }

  public async create({ request, response }: HttpContextContract): Promise<void> {
    try {
      await request.validate(UserAuthValidator)
      response.ok(await UserAuth.create(Object(request.all())))
    } catch (error) {
      throw new CustomMessageErrorException(
        error.name === 'ValidationException' ? JSON.stringify(error.messages) : error.message,
        error.status ?? undefined,
        error.code ?? undefined,
      )
    }
  }
}
