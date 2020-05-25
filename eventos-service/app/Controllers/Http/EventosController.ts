import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import EventosModel from 'App/Models/EventosModel';
import EventoParticipantesModel from 'App/Models/EventoParticipantesModel';

export default class EventosController {
  public async create({
    request,
    response,
  }: HttpContextContract): Promise<void> {
    const {
      name,
      owner,
      roles,
      isPublic,
      password,
      startDay,
      startEnd,
      starTime,
      endTime,
    } = request.all();

    if (!name || !owner) return response.badRequest('nome é obrigatorio');

    if (isPublic === true && password) {
      return response.badRequest('evento publico senha não é obrigatorio');
    } else if ((isPublic === false && !password) || roles === 'public') {
      return response.badRequest('evento privado senha é obrigatorio');
    } else if ((roles === 'private' && !password) || isPublic === true) {
      return response.badRequest('evento privado senha é obrigatorio');
    }

    await EventosModel.create({
      name,
      owner,
      roles,
      isPublic,
      password,
      startDay,
      startEnd,
      starTime,
      endTime,
    })
      .then(res => {
        return response.ok(res);
      })
      .catch(err => {
        response.badRequest(err);
      });
  }

  public async findAll({ response }: HttpContextContract) {
    await EventosModel.all().then(res => {
      if (!res) return response.noContent(null);
      return response.ok(res);
    });
  }

  public async participar({ request, response }: HttpContextContract) {
    const { username } = request.all();
    const { id } = request.ctx?.params;

    try {
      const existeParticipanteNoEvento = await EventoParticipantesModel.findBy(
        'username',
        username
      );

      if (existeParticipanteNoEvento) {
        return response.notAcceptable(existeParticipanteNoEvento);
      }

      const existeEvento = await EventosModel.find(id);
      if (!existeEvento) return response.badRequest(null);

      const participarEvento = await EventoParticipantesModel.create({
        evento: id,
        username,
      });

      return response.created(participarEvento);
    } catch (error) {
      return response.badGateway(error);
    }
  }
}
