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
  Route.get('/pics', 'PicsController.index').as('pics')
  Route.get('/uploads/:id', 'CoursController.upload').as('cours.upload')
}).middleware('auth')

Route.group(() => {
  Route.group(() => {
    Route.get('/new', 'CoursController.create').as('cours.create')
    Route.post('/new', 'CoursController.store')
    Route.get('/:id?', 'CoursController.show').as('cours.show')
    Route.post('/:id?', 'CoursController.update')
    Route.delete('/:id?', 'CoursController.destroy')
  }).prefix('/cour')

  Route.group(() => {
    Route.get('/new', 'PicsController.create').as('pics.create')
    Route.post('/new', 'PicsController.store')
    Route.get('/:id?', 'PicsController.show').as('pics.show')
    Route.post('/:id?', 'PicsController.update')
    Route.delete('/:id?', 'PicsController.destroy')
  }).prefix('/pics')
  
  Route.group(() => {
    Route.get('/new', 'DashboardController.create').as('categories.create')
    Route.post('/new', 'DashboardController.store')
    Route.get('/:id?', 'DashboardController.show').as('categories.show')
    Route.post('/:id?', 'DashboardController.update')
    Route.delete('/:id?', 'DashboardController.destroy')
  }).prefix('/categorie')

  Route.get('/dashboard', 'DashboardController.index').as('dashboard')
  Route.get('/user/:id?', 'DashboardController.show').as('users.show')
  Route.delete('/user/:id?', 'SecurityController.destroy')
}).middleware('adminCheck')

Route.get('/404', 'SecurityController.errors').as('inconnue')
Route.get('/login', 'SecurityController.login').middleware('redirectIfAuthenticated').as('login')
Route.post('/login', 'SecurityController.doLogin')
Route.get('/logout', 'SecurityController.logout').as('logout')
Route.get('/registration', 'SecurityController.registration').middleware('redirectIfAuthenticated').as('registration')
Route.post('/registration', 'SecurityController.doRegistration')