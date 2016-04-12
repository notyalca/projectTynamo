module.exports = {
    convertToTree : convertToTree
};

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