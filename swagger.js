import swaggerJSDoc from 'swagger-jsdoc';

const opciones = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Clínica - Turnos',
      version: '1.0.0',
      description: 'API REST para gestión de turnos médicos',
    },
    servers: [
      { url: 'http://localhost:3000' }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./rutas/*.js'], // lee comentarios de las rutas
};

export const swaggerSpec = swaggerJSDoc(opciones);
