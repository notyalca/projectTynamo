/**
 * Created by uclayal on 1/27/16.
 */
'use strict';
var RouteFinder = require('./lib/routes.js'),
	routeFinder = new RouteFinder();
const Hapi = require('hapi');

const server = new Hapi.Server();

var config = require('./config.json');
server.connection({ port: config.port });
console.log(config.port);
console.log(config.routeFile);


server.route({
	method: 'GET',
	path: '/tynamoStatus',
	handler: function (request, reply) {
		reply('server up');
	}
});
routeFinder.registerRoutes(server);

server.start(() => {
	console.log('Server running at:', server.info.uri);
});