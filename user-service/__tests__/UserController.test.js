import request from 'supertest';
import { app } from '../src/server';
import User from '../src/models/User';

describe('User', () => {
  beforeEach(async () => {
    const qtd = await User.count();
    if (qtd > 0) await User.destroy({ truncate: true });
  });
  it('should create user', async () => {
    const user = {
      name: 'Guilherme Jesus',
      username: 'Jesus',
      mail: 'jesus@email.com',
      password: 'senha-segura',
    };
    const response = await request(app)
      .post('/users')
      .send(user);
    expect(response.status).toBe(201);
  });

  it('received status 400, missing required field username ', async () => {
    const user = {
      name: 'Guilherme Jesus',
      username: '',
      mail: 'jesus@email.com',
      password: 'senha-segura',
    };

    const response = await request(app)
      .post('/users')
      .send(user);
    expect(response.status).toBe(400);
  });
});
