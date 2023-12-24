import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Pic from '../../Models/Pic'
import {string} from '@ioc:Adonis/Core/Helpers'
import UpdatePicsValidator from '../../Validators/UpdatePicsValidator'
import Category_Pic from '../../Models/Category_Pic'
import Drive from '@ioc:Adonis/Core/Drive'

export default class PicsController {
  public async index ({ view }: HttpContextContract) {
    const pictures = await Database.from(Pic.table)
    const categories_pic = await Database.from(Category_Pic.table)
    return view.render('pics/index', {
      pictures,
      categories_pic,
    })
  }
  
  public async create ({ view }: HttpContextContract) {
    const picture = new Pic()
    const categorie = await Category_Pic.all() 
    return view.render('pics/create', {
      picture,
      categorie,
    })
  }

  public async store ({ params, request, session, response }: HttpContextContract) {
    await this.handleRequest(params, request)
    session.flash({ success:'La photo a bien ete ajouter' })
    return response.redirect().toRoute('pics')
  }

  public async show ({ view, params }: HttpContextContract) {
    const pic = await Pic.findOrFail(params.id)
    const categories = await Category_Pic.all()
    return view.render('pics/show', {
      pic,
      categories,
    })
  }

  public async update ({ params, request, response, session }: HttpContextContract) {
    await this.handleRequest(params, request)
    session.flash({ success:'La photo a bien ete sauvegarder' })
    return response.redirect().toRoute('pics')
  }

  public async destroy ({ params, session, response }: HttpContextContract) {
    const categorie = await Pic.findOrFail(params.id)
    await categorie.delete()
    session.flash({ success:'La photo a bien ete supprimer' })
    return response.redirect().toRoute('dashboard')
  }

  // eslint-disable-next-line max-len
  private async handleRequest (params: HttpContextContract['params'], request: HttpContextContract['request']) {
    const pic = params.id ? await Pic.findOrFail(params.id) : new Pic()
    const thumbnail = request.file('pic_file')
    if(thumbnail) {
      if(pic.thumbnail) {
        Drive.delete(pic.thumbnail)
      }
      const newName = string.generateRandom(15) + '.' + thumbnail.extname;
      await thumbnail.moveToDisk('./', {name:newName});
      pic.thumbnail = newName;
    }

    const dataPics = await request.validate(UpdatePicsValidator)
    
    pic
      .merge({ ...dataPics || false })
      .save()
  }
}
