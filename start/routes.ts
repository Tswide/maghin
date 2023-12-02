/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'CoursController.index').as('home')
}).middleware('auth')

Route.group(() => {
  Route.get('/cour/new', 'CoursController.create').as('cours.create')
  Route.post('/cour/new', 'CoursController.store')
  Route.get('/cour/:id?', 'CoursController.show').as('cours.show')
  Route.post('/cour/:id?', 'CoursController.update')
  Route.delete('/cour/:id?', 'CoursController.destroy')

  Route.get('/dashboard', 'DashboardController.index').as('dashboard')
  Route.get('/categorie/new', 'DashboardController.create').as('categories.create')
  Route.post('/categorie/new', 'DashboardController.store')
  Route.get('/categorie/:id?', 'DashboardController.show').as('categories.show')
  Route.post('/categorie/:id?', 'DashboardController.update')
  Route.delete('/categorie/:id?', 'DashboardController.destroy')

  Route.get('/user/:id?', 'DashboardController.show').as('users.show')
  Route.delete('/user/:id?', 'SecurityController.destroy')
}).middleware('adminCheck')

Route.get('/404', 'SecurityController.errors').as('inconnue')
Route.get('/login', 'SecurityController.login').middleware('redirectIfAuthenticated').as('login')
Route.post('/login', 'SecurityController.doLogin')
Route.get('/logout', 'SecurityController.logout').as('logout')
Route.get('/registration', 'SecurityController.registration').middleware('redirectIfAuthenticated').as('registration')
Route.post('/registration', 'SecurityController.doRegistration')