import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Pic from '../../Models/Pic'
import UpdatePicsValidator from '../../Validators/UpdatePicsValidator'

export default class PicsController {
  public async index ({ view }: HttpContextContract) {
    const pictures = await Database.from(Pic.table)
    return view.render('pics/index', {
      pictures,
    })
  }
  
  public async create ({ view }: HttpContextContract) {
    const picture = new Pic()
    return view.render('dashboard/create', {
      picture,
    })
  }

  public async store ({ params, request, session, response }: HttpContextContract) {
    await this.handleRequest(params, request)
    session.flash({ success:'La catégorie a bien ete ajouter' })
    return response.redirect().toRoute('dashboard')
  }

  public async show ({ view, params }: HttpContextContract) {
    const categorie = await Pic.findOrFail(params.id)
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
    const categorie = await Pic.findOrFail(params.id)
    await categorie.delete()
    session.flash({ success:'La catégorie a bien ete supprimer' })
    return response.redirect().toRoute('dashboard')
  }

  // eslint-disable-next-line max-len
  private async handleRequest (params: HttpContextContract['params'], request: HttpContextContract['request']) {
    const picture = params.id ? await Pic.findOrFail(params.id) : new Pic()
    const dataPictures = await request.validate(UpdatePicsValidator)
    
    picture
      .merge({ ...dataPictures || false})
      .save()
  }
}
