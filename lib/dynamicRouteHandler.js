var TextHandler = require('./handlers/textHandler.js'),
    textHandler = new TextHandler();
var fs = require("fs");
var path = require ("path");
var routeIngestion = require('./utils/routeIngestion.js');

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
        routeTree = routeIngestion.convertToTree(routesFromFile);
        //console.log(JSON.stringify(routeTree));
    }
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