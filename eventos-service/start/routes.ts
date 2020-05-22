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
| and then import them inside `start/routes/index.ts` as follows
|
| import './cart'
| import './customer'
|
*/

import Route from '@ioc:Adonis/Core/Route';

Route.get('/', async () => {
  return { bora: 'bora api' };
});

Route.get('/eventos', 'EventosController.findAll');

Route.post('/eventos', 'EventosController.create').middleware('auth');

Route.post(
  '/eventos/:id/participar',
  'EventosController.participar'
).middleware('auth');

Route.post('/teste', 'EventosController.validator').middleware('auth');
//Route.post('/teste', 'EventosController.validator');
