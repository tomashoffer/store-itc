/// AJV Schema
 export const schemaUsers = {
    type: 'object',
    properties: {
      name: { type: 'string' },
      email: { type: 'string', format: 'email' },
      password: { type: 'string', minLength: 3 },
    },
    required: ['name', 'email', 'password'],
    additionalProperties: false,
  };

  export const schemaLogIn = {
    type: 'object',
    properties: {
      email: { type: 'string', format: 'email' },
      password: { type: 'string', minLength: 3 },
    },
    required: ['email', 'password'],
    additionalProperties: false,
  };

  export const schemaAdminLogIn = {
    type: 'object',
    properties: {
      email: { type: 'string', format: 'email' },
      password: { type: 'string', minLength: 3 },
    },
    required: ['email', 'password'],
    additionalProperties: false,
  };

