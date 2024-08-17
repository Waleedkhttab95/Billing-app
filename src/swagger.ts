// swagger.js
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'billing system API',
    version: '1.0.0',
    description: 'API documentation for billing system management'
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server'
    }
  ]
};

const options = {
  swaggerDefinition,
  apis: ['./src/Routes/*.ts'], 
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs
};
