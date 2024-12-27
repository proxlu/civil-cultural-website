

export class HttpException extends Error {
    public message: string
    public status?: number
    public code?: string

    constructor(message: string, status?: number, code?: string,) {
        super(message)
        this.status = status
        this.message = message
        this.code = code
    }
}