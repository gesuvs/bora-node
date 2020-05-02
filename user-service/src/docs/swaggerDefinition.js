import { getUsers, postUser, authUser } from './api/swagger';
export const swaggerDefinition = {
  openapi: '3.0.1',
  info: {
    title: 'API User - Swagger Doc',
    version: '1.0.0',
    description: 'Endpoints to test the user routes',
  },
  tags: [
    {
      name: 'Users',
    },
  ],
  paths: {
    '/users': {
      get: getUsers,
      post: postUser,
    },
    '/auth': {
      post: authUser,
    },
  },
  definitions: {
    User: {
      type: 'object',
      required: ['mail', 'username', 'password'],
      properties: {
        name: {
          type: 'string',
          pattern: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
        },
        mail: {
          type: 'string',
          format: 'email',
        },
        phone: {
          type: 'string',
        },
        username: {
          type: 'string',
        },
        password: {
          type: 'string',
          format: 'password',
          pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        },
      },
    },
    Auth: {
      type: 'object',
      required: ['username', 'password'],
      properties: {
        username: {
          type: 'string',
        },
        password: {
          type: 'string',
          format: 'password',
          pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        },
      },
    },
  },
  components: {
    schemas: {
      User: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            pattern: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
          },
          mail: {
            type: 'string',
            format: 'email',
          },
          phone: {
            type: 'string',
          },
          username: {
            type: 'string',
          },
          password: {
            type: 'string',
            format: 'password',
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
          },
        },
      },
    },
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        in: 'header',
      },
    },
  },
};
