import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class FormatBody {
  public async handle ({ request }: HttpContextContract, next: () => Promise<void>) {
    let newBody: object = {}
    
    Object.entries(request.all()).map(([key, value]) => {
      value = !Array.isArray(value) && /^\d+$/.test(value) ? Number(value) : value
      let match = key.match(/_(.){1}/)?.shift()

      match = match ? key.replace(/_(.){1}/, match?.substring(1,match?.length).toUpperCase()) : key
      
      newBody[match] = value
    })

    request.updateBody(newBody)
    await next()
  }
}
