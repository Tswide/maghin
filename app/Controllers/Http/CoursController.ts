import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cour from '../../Models/Cour'
import UpdateCourValidator from '../../Validators/UpdateCourValidator'
import {string} from '@ioc:Adonis/Core/Helpers'
import Category from '../../Models/Category'
import Drive from '@ioc:Adonis/Core/Drive'

export default class CoursController {
  public async index ({ view, request }: HttpContextContract) {
    const {pattern} = await request.qs()
    const categories = await Category.query().orderBy('id')
    const cours = await Cour.query()
      .if(pattern, query => query.whereLike('title', `%${pattern}%`))

    return view.render('pannel/index', {
      cours,
      categories,
    })
  }

  public async create ({ view }: HttpContextContract) {
    const cour = new Cour()
    const categories = await Category.all()
    
    return view.render('pannel/create', {
      cour,
      categories,
    })
  }

  public async store ({ params, request, session, response }: HttpContextContract) {
    await this.handleRequest(params, request)
    session.flash({ success:'Le cour a bien ete ajouter' })
    return response.redirect().toRoute('home')
  }

  public async show ({ params, view }: HttpContextContract) {
    const cour = await Cour.findOrFail(params.id)
    const categories = await Category.all()

    return view.render('pannel/show', {
      cour,
      categories,
    })
  }

  public async update ({ params, request, response, session }: HttpContextContract) {
    await this.handleRequest(params, request)
    session.flash({ success:'Le cour a bien ete sauvegarder' })
    return response.redirect().toRoute('home')
  }

  public async destroy ({ params, session, response }: HttpContextContract) {
    const cour = await Cour.findOrFail(params.id)
    await cour.delete()
    if(cour.file) {
      Drive.delete('upload/' + cour.file)
    }
    session.flash({ success:'Le cour a bien ete supprimer' })
    return response.redirect().toRoute('home')
  }

  // eslint-disable-next-line max-len
  private async handleRequest (params: HttpContextContract['params'], request: HttpContextContract['request']) {
    const cour = params.id ? await Cour.findOrFail(params.id) : new Cour()
    const pdf = request.file('pdf_file')
    if(pdf) {
      if(cour.file) {
        Drive.delete(cour.file)
      }
      const newName = string.generateRandom(20) + '.' + pdf.extname
      await pdf.moveToDisk('./', {name:newName})
      cour.file = newName
    }
    const dataCour = await request.validate(UpdateCourValidator)
    cour
      .merge({ ...dataCour || false })
      .save()
  }
}
