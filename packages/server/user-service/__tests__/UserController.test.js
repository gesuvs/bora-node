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
      phone: '+5511983355797',
      mail: 'jesus@email.com',
      password: '#senha-Segura96',
    };
    const response = await request(app)
      .post('/users')
      .send(user);
    expect(response.status).toBe(201);
  }, 30000);

  it('received status 400, missing required field username ', async () => {
    const user = {
      name: 'Guilherme Jesus',
      username: '',
      phone: '+5511983355797',
      mail: 'jesus@email.com',
      password: '#senha-Segura96',
    };

    const response = await request(app)
      .post('/users')
      .send(user);
    expect(response.status).toBe(400);
  }, 30000);
});
