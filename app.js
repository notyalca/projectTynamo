/**
 * Created by uclayal on 1/27/16.
 */
'use strict';
var RouteHandler = require('./lib/dynamicRouteHandler.js'),
	routeHandler = new RouteHandler('../routesExample/routes.json');
const Hapi = require('hapi');
const fs = require('fs');
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
	method: 'POST',
	path: '/admin/upload/{filename}',
	config: {
		payload: {
			output: 'stream',
			parse: true,
			allow: 'multipart/form-data'
		},
		handler: function (request, reply) {
			var data = request.payload;
			if (data.file) {
				//var name = data.file.hapi.filename;
				var name = request.params.filename;
				var path = __dirname + "/routesExample/" + name;
				var file = fs.createWriteStream(path);

				file.on('error', function (err) {
					console.error(err);
					reply("Sorry, an error occurred.")
				});

				data.file.pipe(file);

				data.file.on('end', function (err) {
					/*var ret = {
						filename: data.file.hapi.filename,
						headers: data.file.hapi.headers
					};
					reply(JSON.stringify(ret));*/
					reply("Successfully saved the file: " + name)
				})
			}else{
				reply("Could not save file. Did you send it?")
			}
		}
	}
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