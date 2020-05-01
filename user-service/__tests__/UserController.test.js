import request from 'supertest';
import { app } from '../src/server';

describe('User', () => {
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

    console.log(response.status);

    expect(response.status).toBe(201);
  });
});
