import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from '../../Models/User'

export default class SecurityController {
  public async login ({ view }: HttpContextContract) {
    return view.render('auth/login')
  }

  public async logout ({ auth, response }: HttpContextContract) {
    await auth.logout()
    response.redirect().toRoute('login')
  }

  public async registration ({ view }: HttpContextContract) {
    return view.render('auth/registration')
  }

  public async doLogin ({ request, auth, response, session }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      await auth.use('web').attempt(email, password)
      response.redirect().toRoute('home')
    } catch {
      session.flash({ error: 'Identifiant incorrect' })
      response.redirect().toRoute('login')
    }
  }

  public async doRegistration ({ request, response, session }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      User.create({
        email: email,
        password: password,
      })
      response.redirect().toRoute('login')
    } catch {
      session.flash({ error: 'Email déja existant' })
      response.redirect().toRoute('registration')
    }
  }

  public async show ({ view, params }: HttpContextContract) {
    const user = await User.findOrFail(params.id)
    return view.render('dashboard/show', {
      user,
    })
  }

  public async destroy ({ params, session, response }: HttpContextContract) {
    const user = await User.findOrFail(params.id)
    await user.delete()
    session.flash({ success:"L'utilisateur à bien ete supprimer" })
    return response.redirect().toRoute('dashboard')
  }

  public async errors ({view}: HttpContextContract) {
    return view.render('errors/not-found')
  }
}
