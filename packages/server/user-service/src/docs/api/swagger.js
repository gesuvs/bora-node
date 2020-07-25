export const getUsers = {
  tags: ['Users'],
  description: 'Returns all users from the system',
  security: [
    {
      BearerAuth: [],
    },
  ],
  responses: {
    '200': {
      description: 'Success: List Users',
      produces: ['application/json'],
      schema: {
        type: 'array',
        items: {
          $ref: '#/definitions/User',
        },
      },
    },
    '202': {
      description: 'Not found users',
    },
    '401': {
      description: 'JWT invalid',
    },
  },
};

export const authUser = {
  tags: ['Users'],
  description: 'Authentication',
  requestBody: {
    name: 'User',
    description: 'Create new User',
    content: {
      'application/json': {
        schema: {
          $ref: '#/definitions/Auth',
        },
      },
    },
    required: true,
  },
  responses: {
    '200': {
      description: 'Success: Authenticated',
      schema: {
        type: 'string',
      },
    },
    '204': {
      description: 'Error: User not found',
    },
  },
};

export const postUser = {
  tags: ['Users'],
  description: 'Create user',
  requestBody: {
    name: 'User',
    description: 'Create new User',
    content: {
      'application/json': {
        schema: {
          $ref: '#/definitions/User',
        },
      },
    },
    required: true,
  },
  responses: {
    '201': {
      description: 'Success: Create Users',
    },
    '400': {
      description: 'Bad Request',
    },
    '405': {
      description: 'Error Validation Request',
    },
  },
};
