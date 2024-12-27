import { HttpContextContract, } from '@ioc:Adonis/Core/HttpContext'
import Route from '@ioc:Adonis/Core/Route'
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'
import { PropsUrl, PropsFavoriteUrl } from '@ioc:Adonis/Core/Route'
import Application from '@ioc:Adonis/Core/Application'

const BASE_ALIAS: string = 'api'

console.clear()

const URLS: PropsUrl[] = [
  { url: 'authors', controller: 'AuthorsController' },
  { url: 'categories', controller: 'CategoriesController' },
  { url: 'publications', controller: 'PublicationsController' },
  { url: 'topics', controller: 'TopicsController' },
  { url: 'users', controller: 'UsersController' }
]

const URLSFavorites: PropsFavoriteUrl[] = [
  { url: 'favoritescategories', controller: 'FavoritesController', params: 'categoryId', method: 'categories' },
  { url: 'favoritespublications', controller: 'FavoritesController', params: 'publicationId', method: 'publications' }
]

Route.group((): void => {
  /**
   * @summary Rotas prédefinidas 
  */
  for (let { url, controller } of URLS) {

    Route
      .get(`/${url}/:page/:perPage`, `${controller}.index`)
      .as(`${url}.index`)

    Route
      .post(`/${url}`, `${controller}.create`)
      .as(`${url}.create`)

    Route
      .get(`/${url}/:id`, `${controller}.show`)
      .as(`${url}.show`)

    Route
      .put(`/${url}/:id`, `${controller}.update`)
      .as(`${url}.update`)

    Route
      .delete(`/${url}/:id`, `${controller}.destroy`)
      .as(`${url}.destroy`)

    if (!['publications', 'topics'].includes(url))
      Route
        .get(`/${url}/:id/publications/:page/:perPage`, `${controller}.publications`)
        .as(`${url}.publications`)
  }

  Route
    .post('/users/signin', 'UsersController.login')
    .as('users.login')

  for (let { url, controller, params, method } of URLSFavorites) {
    method = method?.replace(/\b\w{1}/, (m) => m.toUpperCase())
    params = Array.isArray(params) ? params.join('\/:') : params

    Route
      .get(`/users/:id/${url}/:page/:perPage`, `${controller}.index${method}`)
      .as(`users.index${method}`)

    Route
      .post(`/users/${url}`, `${controller}.add${method}`)
      .as(`users.add${method}`)

    Route
      .get(`/users/${url}/:userId/:${params}`, `${controller}.show${method}`)
      .as(`users.show${method}`)

    Route
      .delete(`/users/${url}/:userId/:${params}`, `${controller}.remove${method}`)
      .as(`users.remove${method}`)

  }

  /* --- --- --- --- --- */

  /**
   * @summary Rotas da autenticações
   */
  Route
    .post('/auth', 'AuthController.create')
    .as('auth.create')

  Route
    .get('/auth', 'AuthController.logout')
    .as('auth.logout')

})
  .prefix(BASE_ALIAS)
  .as(BASE_ALIAS)
  .middleware('auth')


Route
  .post('/auth/login', 'AuthController.login')
  .prefix(BASE_ALIAS)
  .as(`${BASE_ALIAS}.auth.login`)

/**
 * @summary Rota de teste de conexão em ambiente de desenvolvimento
 */
if (Application.inDev)
  Route
    .get('/status', async ({ response }: HttpContextContract): Promise<void> => {
      const { healthy, report} = await HealthCheck.getReport()

      healthy ?
        response.ok(report) :
        response.serviceUnavailable(report)
    })
    .prefix(BASE_ALIAS)
    .as(`${BASE_ALIAS}.db.status`)