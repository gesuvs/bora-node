/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import EventosModel from 'App/Models/EventosModel';

export default class EventosController {
  public async create({ request, response }: HttpContextContract) {
    await EventosModel.create(request.all())
      .then(() => {
        return response.status(201);
      })
      .catch(err => {
        return response.badRequest(err);
      });
  }

  public async findAll({ response }: HttpContextContract) {
    await EventosModel.all().then(res => {
      return response.ok(res);
    });
  }
}
