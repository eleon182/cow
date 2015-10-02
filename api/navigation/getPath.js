var nav = require('../json/navigation');
var Graph = require('node-dijkstra');

var route = new Graph();

module.exports = getPath;

//set up
var x = 0;
while (nav[x]) {
    route.addVertex(x.toString(), buildPaths(nav[x]));
    x++;
}

function getPath(params) {
    if (params.start && params.end) {
        var path = route.shortestPath(params.start.toString(), params.end.toString());
        if (path) {
            return path;
        } else {
            return [params.start];
        }
    } else {
        return [];
    }
}

function buildPaths(data) {
    var response = {};

    data.forEach(function(val) {
        response[val] = 1;
    });
    return response;
}
