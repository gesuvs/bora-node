import { Router } from 'express';
import { EventController } from '../controllers/eventsControllers';

const event = new EventController();

const routes = Router();
routes.post('/', event.create);
routes.get('/', event.findAll);
routes.post('/:id/participate', event.participate);

export default routes;
