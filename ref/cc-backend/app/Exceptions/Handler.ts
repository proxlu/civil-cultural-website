import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Logger from '@ioc:Adonis/Core/Logger'
import { Exception } from '@poppinss/utils'


type ApiErrorContract = {
  status: number;
  error: string | object;
}

export default class ExceptionHandler extends HttpExceptionHandler {

  protected static statusJson = {
    400: 'The request does not conform to the expected format. Check the JSON (body | head) being sent, check for missing fields, or fields already in the databases',
    401: 'The authentication data is incorrect',
    403: 'You are trying to access a resource that you do not have permission',
    404: 'You are trying to access a resource that does not exist',
    406: 'The server does not support the data format specified in the header',
    415: 'Cannot process the data sent due to its format',
    422: 'The request does not conform to the expected format. Check the JSON (body | head) being sent, check for missing fields, or fields already in the databases',
    500: 'Server error',
    504: 'The request took too long and cannot be processed'
  }

  constructor() {
    super(Logger)
  }

  public async handle(ex: Exception, { response }: HttpContextContract): Promise<void> {
    const messageError = await this.customMessage(ex)
    response.status(messageError.status).json(messageError.error)
  }

  private async customMessage(ex: Exception): Promise<ApiErrorContract> {
    let messageError = {} as ApiErrorContract

    switch (ex.code) {
      case 'E_VALIDATION_FAILURE':
        messageError.status = 422
        messageError.error = JSON.parse(ex.message.replace('E_VALIDATION_FAILURE: ', ''))
        break;
      case 'E_ROUTE_NOT_FOUND':
        messageError.status = 404
        messageError.error = ExceptionHandler.statusJson[404]
        break;
      case 'E_ROW_NOT_FOUND':
        messageError.status = 404
        messageError.error = 'Row not found'
        break;
      case 'E_UNAUTHORIZED_ACCESS':
        messageError.status = 401
        messageError.error = ExceptionHandler.statusJson[401]
        break;
      default:
        messageError.status = 500
        messageError.error = ExceptionHandler.statusJson[500]
        break;
    }

    return messageError
  }

  public async report({ message, status, code }: Exception, _: HttpContextContract): Promise<void> {
    Logger.info(`\nstatus: ${status}\ncode: ${code}\nmessage: ${message}\n\n`)
  }
}
