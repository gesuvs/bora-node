import { Request, Response } from 'express';
import { parse } from 'date-fns';
import { PrismaClient, Event } from '@prisma/client';
// import { redis } from '../index';
import { KafkaProducerResponse } from 'src/interfaces';

const prisma = new PrismaClient();
export class EventController {
  public async create(req: Request, res: Response): Promise<void> {
    const {
      event: {
        address,
        category,
        description,
        endTime,
        isFree,
        isPublic,
        name,
        owner,
        password,
        price,
        privacy,
        startDay,
        startEnd,
        startTime,
        streetNumber,
        zipcode,
      },
    } = req.body;

    if (!name || !owner) res.status(400).send({ err: 'Nome é obrigatorio' });

    if (isPublic === true && password) {
      res.status(400).send({ err: 'evento publico senha não é obrigatorio' });
    } else if ((isPublic === false && !password) || privacy === 'public') {
      res.status(400).send({ err: 'evento privado senha é obrigatorio' });
    } else if ((privacy === 'private' && !password) || isPublic === true) {
      res.status(400).send({ err: 'evento privado senha é obrigatorio' });
    }

    const startDayFormatted = parse(startDay, 'dd/MM/yyyy', new Date());
    const startEndFormatted = parse(startEnd, 'dd/MM/yyyy', new Date());

    // redis.get('event_code_url', async (err, reply) => {
    //   const { code = null, url = null }: KafkaProducerResponse =
    //     JSON.parse(reply) ?? '';
    const event = prisma.event.create({
      data: {
        name,
        description,
        // code,
        owner,
        zipcode,
        address,
        streetNumber,
        category,
        isFree,
        isPublic,
        password,
        price,
        privacy,
        startDay: startDayFormatted,
        startEnd: startEndFormatted,
        startTime,
        endTime,
        // photoUrl: url,
      },
    });
    if ((await event).id) {
      // redis.del('event_code_url', (err, result) => {
      res.sendStatus(201);
      // });
    } else {
      res.sendStatus(400);
    }
    // });
  }

  public async findAll(
    req: Request,
    res: Response
  ): Promise<Response<Event[]>> {
    const events: Event[] = await prisma.event.findMany();
    if (events.length > 0) return res.json(events);
    if (events.length === 0) return res.sendStatus(204);
  }

  public async findEventsByOwner(
    req: Request,
    res: Response
  ): Promise<Response<Event[]>> {
    const { owner } = req.params;
    const events: Event[] = await prisma.event.findMany({
      where: {
        owner,
      },
    });
    return res.json(events);
  }



  public async participate(
    req: Request,
    res: Response
  ): Promise<Response<void>> {
    const {
      event: { username },
    } = req.body;
    const { id } = req.params;

    if (!username) return res.sendStatus(400);

    const existEvent: Event = await prisma.event.findOne({
      where: {
        id,
      },
    });

    if (!existEvent) {
      res.sendStatus(204);
    }

    const isParticipantEvent = await prisma.eventGuest.count({
      where: {
        eventFk: existEvent.id,
        AND: {
          username,
        },
      },
    });

    if (isParticipantEvent > 0) return res.sendStatus(401);
    const participate = await prisma.eventGuest.create({
      data: {
        Event: {
          connect: {
            id: existEvent.id,
          },
        },
        username,
      },
    });
    if (participate) return res.sendStatus(201);
    if (!participate) return res.sendStatus(500);
  }
}
