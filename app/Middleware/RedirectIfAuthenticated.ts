import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RedirectIfAuthenticated {
  public async handle({ auth, response, session }: HttpContextContract, next: () => Promise<void>) {
    if (auth.isAuthenticated && session.get('user')) {
      response.redirect().toRoute('home')

      response.cookie('yourCookieName', 'yourCookieValue', {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7,
      })

      return
    }

    await next()
  }
}
