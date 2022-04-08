'use strict';
require('dotenv').config();
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const server = require('./config/server');
const Pack = require('./package');
const init = async () => {

    const swaggerOptions = {
        documentationPath: '/docs',
        basePath: '/api',
        info:{
            title:'ZEROZILLA TASK API DOCUMENTATION',
            version:Pack.version,
        },
        grouping: 'tags',
        securityDefinitions: {
            jwt: {
              type: 'apiKey',
              name: 'Authorization',
              in: 'header'
            }
        },
        security: [{ jwt: [] }],
        schemes: ['http','https'],
        
    }


    // Adding plugins for swagger docs;
    await server.register([
        Inert,
        Vision,
        {
            plugin:HapiSwagger,
            options:swaggerOptions
        },
        {
            plugin: require('hapijs-status-monitor'),
            options: {
              title: 'Status Monitor',
              routeConfig: {
                auth: false
              }
            }
        }
    ])

    server.events.on('response', function (request) {
        console.log(request.info.remoteAddress + ': ' + request.method.toUpperCase() + ' ' + request.path + ' --> ' + request.response.statusCode);
    });
    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();