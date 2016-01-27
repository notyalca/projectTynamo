/**
 * Created by uclayal on 1/27/16.
 */
'use strict';


module.exports = function textHandler() {
	this.createTextHandler = function (text, code, request, reply) {
		//console.log('creating text handler with ' + text + ' ' + code);
		//var handler = function (request, reply) {
		//function handler(request, reply){
		//	console.log('executing?!?!?!?');
		reply(text).code(code);
		//	return 0;
		//}
		//var handler = Function("request","reply", "reply(" +text+").code(" + code+");")
		//console.log((handler));
		//return handler;
	};

};
