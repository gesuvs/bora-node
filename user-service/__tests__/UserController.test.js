import User from '../src/models/User';

describe('User', () => {
  it('should create user', async () => {
    const user = await User.create({
      name: 'Guilherme Jesus',
      username: 'Jesus',
      mail: 'jesus@email.com',
      password: 'senha-segura',
    });
    expect(user.mail).toBe('jesus@email.com');
  });
});
