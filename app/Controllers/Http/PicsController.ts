import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Pic from '../../Models/Pic'
import CategoriesPic from '../../Models/CategoriesPic'
import {string} from '@ioc:Adonis/Core/Helpers'
import Drive from '@ioc:Adonis/Core/Drive'

export default class PicsController {
  public async index ({ view }: HttpContextContract) {
    const pics = await Database.from(Pic.table)
    const categories_pic = await Database.from(CategoriesPic.table)
    return view.render('pics/index', {
      pics,
      categories_pic,
    })
  }
  
  public async create ({ view }: HttpContextContract) {
    const pic = new Pic()
    const categories_pic = await CategoriesPic.all()
    return view.render('pics/create', {
      pic,
      categories_pic,
    })
  }

  public async store ({ params, request, session, response }: HttpContextContract) {
    await this.handleRequest(params, request)
    session.flash({ success:'La photo a bien ete ajouter' })
    return response.redirect().toRoute('pics')
  }

  public async show ({ view, params }: HttpContextContract) {
    const pic = await Pic.findOrFail(params.id)
    const categories_pic = await CategoriesPic.all()
    return view.render('pics/show', {
      pic,
      categories_pic,
    })
  }

  public async update ({ params, request, response, session }: HttpContextContract) {
    await this.handleRequest(params, request)
    session.flash({ success:'La photo a bien ete sauvegarder' })
    return response.redirect().toRoute('pics')
  }

  public async destroy ({ params, session, response }: HttpContextContract) {
    const pic = await Pic.findOrFail(params.id)
    await pic.delete()
    session.flash({ success:'La photo a bien ete supprimer' })
    return response.redirect().toRoute('pics')
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
    
    pic
      .save()
  }
}
