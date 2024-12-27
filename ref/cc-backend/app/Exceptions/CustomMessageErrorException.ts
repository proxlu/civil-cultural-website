import { Exception } from '@adonisjs/core/build/standalone'


export default class CustomMessageErrorException extends Exception {
    constructor(message: string|object, status?: number, code?: string) {
        console.log('CAIU AQUI')
        if(typeof message === 'object') 
            message = JSON.stringify(message)

        super(message, status, code)
    }
}
