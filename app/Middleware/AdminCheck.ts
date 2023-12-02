import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AdminCheck {
  public async handle({ auth, response }: HttpContextContract, next: () => Promise<void>) {
    // Check if the user is authenticated
    if (auth.user.admin === 1) {
      // Check if the user is an admin (customize as per your user model)
      if (auth.user?.admin) {
        await next()
        return
      }
    }

    // Redirect or respond with an error if the user is not an admin
    return response.redirect().toRoute('inconnue')
  }
}
