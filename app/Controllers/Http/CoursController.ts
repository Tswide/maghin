import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cour from '../../Models/Cour'
import UpdateCourValidator from '../../Validators/UpdateCourValidator'
import Database from '@ioc:Adonis/Lucid/Database'
import {string} from '@ioc:Adonis/Core/Helpers'
import Category from '../../Models/Category'
import Drive from '@ioc:Adonis/Core/Drive'

export default class CoursController {
  public async index ({ view }: HttpContextContract) {
    const cours = await Database.from(Cour.table)
    const categories = await Database.from(Category.table)

    const formattedCours = cours.map((cour) => ({
      ...cour,
      title: string.capitalCase(cour.title),
    }))
    
    const formattedCategories = categories.map((category) => ({
      ...category,
      name: string.capitalCase(category.name),
    }))

    return view.render('pannel/index', {
      cours: formattedCours,
      categories: formattedCategories,
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

    const formattedCour = {
      ...cour,
      title: string.capitalCase(cour.title),
    }

    const formattedCategories = categories.map((category) => ({
      ...category,
      name: string.capitalCase(category.name),
    }))

    return view.render('pannel/show', {
      cour: formattedCour,
      categories: formattedCategories,
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
      Drive.delete(cour.file)
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

      const url = await Drive.getUrl(newName)
      cour.file = url
    }
    const dataCour = await request.validate(UpdateCourValidator)
    cour
      .merge({ ...dataCour || false })
      .save()
  }
}
