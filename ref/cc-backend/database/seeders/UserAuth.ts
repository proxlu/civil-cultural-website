import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Env from '@ioc:Adonis/Core/Env'

import { DateTime } from 'luxon'

import UserAuth from 'App/Models/UserAuth'

export default class UserAuthSeeder extends BaseSeeder {
  public static developmentOnly = false

  public async run (): Promise<void>
  {
    await UserAuth.create({
      email: Env.get('USER_AUTH_EMAIL'),
      password: Env.get('USER_AUTH_PASSWORD'),
      remember_me_token: DateTime.now().plus({
        years: 1,
        months: 1,
        hours: 0,
        minutes: 0,
        seconds: 0
      })
      .toISO()
    })
  }
}
