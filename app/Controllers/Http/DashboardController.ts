import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from '../../Models/Category'
import UpdateCategoryValidator from '../../Validators/UpdateCategoryValidator'
import Database from '@ioc:Adonis/Lucid/Database'
import User from '../../Models/User'

export default class DashboardController {
  public async index ({ view, auth }: HttpContextContract) {
    const categories = await Database.from(Category.table)
    const users = await Database.from(User.table)

    await auth.use('web').authenticate()
    return view.render('dashboard/dashboard', {
      categories,
      users,
    })
  }
  
  public async create ({ view }: HttpContextContract) {
    const categorie = new Category()
    return view.render('dashboard/create', {
      categorie,
    })
  }

  public async store ({ params, request, session, response }: HttpContextContract) {
    await this.handleRequest(params, request)
    session.flash({ success:'La catégorie a bien ete ajouter' })
    return response.redirect().toRoute('cours.create')
  }

  public async show ({ view, params }: HttpContextContract) {
    const categorie = await Category.findOrFail(params.id)
    return view.render('dashboard/show', {
      categorie,
    })
  }

  public async update ({ params, request, response, session }: HttpContextContract) {
    await this.handleRequest(params, request)
    session.flash({ success:'La catégorie a bien ete sauvegarder' })
    return response.redirect().toRoute('dashboard')
  }

  public async destroy ({ params, session, response }: HttpContextContract) {
    const categorie = await Category.findOrFail(params.id)
    await categorie.delete()
    session.flash({ success:'La catégorie a bien ete supprimer' })
    return response.redirect().toRoute('dashboard')
  }

  // eslint-disable-next-line max-len
  private async handleRequest (params: HttpContextContract['params'], request: HttpContextContract['request']) {
    const categorie = params.id ? await Category.findOrFail(params.id) : new Category()
    const dataCategory = await request.validate(UpdateCategoryValidator)
    
    categorie
      .merge({ ...dataCategory || false })
      .save()
  }
}
