var nav = require('../json/navigation');
var Graph = require('node-dijkstra');

var route = new Graph();

module.exports = getPath;

//set up
var x = 0;
while (nav[x]) {
    route.addNode(x.toString(), buildPaths(nav[x]));
    x++;
}

function getPath(params) {
    return route.path(params.start.toString(), params.end.toString());
}

function buildPaths(data) {
    var response = {};

    data.forEach(function(val) {
        response[val] = 1;
    });
    return response;
}
