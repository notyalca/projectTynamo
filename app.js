/**
 * Created by uclayal on 1/27/16.
 */
'use strict';
var RouteHandler = require('./lib/dynamicRouteHandler.js'),
	routeHandler = new RouteHandler('../routesExample/routes.json');
const Hapi = require('hapi');

const server = new Hapi.Server();

var config = require('./config.json');
server.connection({ port: config.port });
console.log(config.port);
console.log(config.routeFile);


server.route({
	method: 'GET',
	path: '/admin/status',
	handler: function (request, reply) {
		reply('server up');
	}
});
server.route({
	method: 'GET',
	path: '/admin/reload',
	handler: routeHandler.reloadFromFile
});
server.route({
	method: '*',
	path: '/{dynamicSegment*}',
	handler: routeHandler.handle
});
//routeFinder.registerRoutes(server);

server.start(() => {
	console.log('Server running at:', server.info.uri);
});