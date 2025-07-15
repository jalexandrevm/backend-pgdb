import swaggerJsdoc from 'swagger-jsdoc';

export const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Backend Exemplo',
      version: '1.0.0',
      description: 'Documentação da API Backend Exemplo',
    },
    servers: [
      {
        url: 'http://localhost:3081/apiv1/app',
        description: 'Servidor local',
      },
    ],
  },
  apis: [
    'src/routes/*.ts',
    'src/database/controllers/*.ts',
  ],
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);
