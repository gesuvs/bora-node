import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { verify } from 'jsonwebtoken';
import { privateKey, publicKey } from 'App/config/signature';
import path from 'path';

export default class Auth {
  public async handle(
    { request, response }: HttpContextContract,
    next: () => Promise<void>
  ): Promise<void> {
    const token = request.headers()?.authorization?.split(' ')[1] || 'null';
    verify(token, await publicKey(), { algorithms: ['RS256'] }, async err => {
      if (err) {
        return response.unauthorized(err.message);
      } else {
        await next();
      }
    });
  }
}
