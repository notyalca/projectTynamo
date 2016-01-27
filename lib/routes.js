/**
 * Created by uclayal on 1/27/16.
 */
'use strict';
var FileToHapiConverter = require('./fileToHapi.js'),
	fileToHapiConverter = new FileToHapiConverter();

module.exports = function fileRoutes() {
	this.registerRoutes = function(server) {
		console.log('running routes function');
		var routesFromFile = require('../routesExample/routes.json');
		var hapiRoutes = fileToHapiConverter.convertToHapi(routesFromFile);
		hapiRoutes.forEach(function (route) {
			server.route(route);
			console.log('Registered route ' + route.path);
		});
	};
};