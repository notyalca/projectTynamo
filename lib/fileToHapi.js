/**
 * Created by uclayal on 1/27/16.
 */
'use strict';
var TextHandler = require('./handlers/textHandler.js');

module.exports = function fileToHapi() {
	this.convertToHapi = function(jsonFile) {
		var hapiRoutes = [];
		console.log(JSON.stringify(jsonFile));
		jsonFile.routes.forEach(function (route) {
			var hapiRoute = {};
			hapiRoute.path = route.path;
			hapiRoute.method = route.method;

			if (route.handler.type.toLowerCase() === 'text'){
				console.log("TEXT HANDLER");
				var textHandler = new TextHandler();
				hapiRoute.handler = partial(textHandler.createTextHandler,route.handler.message, route.handler.code);
				console.log(JSON.stringify(hapiRoute));
			}
			hapiRoutes.push(hapiRoute);
		});
		console.log(JSON.stringify(hapiRoutes));
		return hapiRoutes;
	}
};

function partial(func /*, 0..n args */) {
	var args = Array.prototype.slice.call(arguments, 1);
	return function() {
		var allArguments = args.concat(Array.prototype.slice.call(arguments));
		return func.apply(this, allArguments);
	};
}