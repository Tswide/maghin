import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from '../../Models/User'
import UpdateUserValidator from '../../Validators/UpdateUserValidator'

export default class SecurityController {
  public async login ({ view }: HttpContextContract) {
    return view.render('auth/login')
  }

  public async registration ({ view }: HttpContextContract) {
    return view.render('auth/registration')
  }

  public async logout ({ auth, response }: HttpContextContract) {
    await auth.logout()
    response.redirect().toRoute('login')
  }

  public async doLogin({ request, auth, response, view, session }: HttpContextContract) {
    const email = request.input('email');
    const password = request.input('password');
  
    try {
      await auth.use('web').attempt(email, password);
      session.put('user', auth.user?.id);
      return response.redirect().toRoute('home');
    } catch (error) {
      if (error.code === 'E_INVALID_AUTH_PASSWORD') {
        return view.render('auth/login', { error: "Mot de passe incorrect", email });
      }
      
      return view.render('auth/login', { error: "Email incorrect", email });
      }
  }
  
  public async doRegistration ({ request, auth, response, session }: HttpContextContract) {
    const dataUser = await request.validate(UpdateUserValidator)

    try {
      const user = await User.create(dataUser)
      await auth.login(user)
      return response.redirect('/')
    } catch {
      session.flash({ error: 'email deja existant' })
      return response.redirect().toRoute('registration')
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
