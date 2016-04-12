var TextHandler = require('./handlers/textHandler.js'),
    textHandler = new TextHandler();
var fs = require("fs");
var path = require ("path");

module.exports = DynamicRouteHandler;

var routeTree, routesFile;

function DynamicRouteHandler(initialFile){
    routesFile = initialFile;
    reload();
}

function reload(){
    if (!routesFile){
        routeTree = {};
    }else{
        console.log("Getting routes from " + routesFile);
        var jsonFile = fs.readFileSync(path.join(__dirname, routesFile));
        var routesFromFile = JSON.parse(jsonFile);
        routeTree = convertToTree(routesFromFile);
        //console.log(JSON.stringify(routeTree));
    }
}

function convertToTree(routes){
    var tree = {};
    for (var i = 0; i < routes.routes.length; i++){
        //console.log("converting route " + JSON.stringify(routes.routes[i]));
        var pathPieces = routes.routes[i].path.split("/");
        var node = tree;
        for (var j = 1; j < pathPieces.length; j++){ //routes start with /, so the first is blank
            //console.log("checking " + pathPieces[j]);
            if (!node[pathPieces[j]]){
                node[pathPieces[j]] = {};
            }
            node = node[pathPieces[j]];
        }
        node.handler = {};
        node.handler[routes.routes[i].method.toUpperCase()] = routes.routes[i].handler;
    }
    return tree;
}

DynamicRouteHandler.prototype.handle = function(request, reply){
    const pathPieces = request.params.dynamicSegment.split("/");
    var node = routeTree;
    var err;
    //BUG: will fail to match if someone puts a trailing slash on their URL
    for (var i = 0; i < pathPieces.length; i++){
        if (node[pathPieces[i]]){
            node = node[pathPieces[i]];
        }else{
            err = true;
        }
    }
    if (!err && node.handler && node.handler[request.method.toUpperCase()]){
        console.log("found handler " + JSON.stringify(node.handler[request.method.toUpperCase()]));
        var handler = node.handler[request.method.toUpperCase()];
        if (handler.type === "text"){
            textHandler.createTextHandler(handler.message, handler.code, request, reply);
        }
    }else{
        reply("not found");
    }
};

DynamicRouteHandler.prototype.reloadFromFile = function(request, reply) {
    reload();
    reply("Reloaded route definitions from file!")
};