"use strict";
// swagger.js
var swaggerJsdoc = require('swagger-jsdoc');
var swaggerUi = require('swagger-ui-express');
var swaggerDefinition = {
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
var options = {
    swaggerDefinition: swaggerDefinition,
    apis: ['./src/Routes/*.ts'],
};
var specs = swaggerJsdoc(options);
module.exports = {
    swaggerUi: swaggerUi,
    specs: specs
};
