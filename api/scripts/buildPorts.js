var fs = require('fs');
var lo = require('lodash');

var nav = require('../json/navigation');
var portTypes = require('../json/portTypes');

var max = nav.length - 1;
var prob = 40;

fs.writeFile('../json/ports.json', JSON.stringify(build()));
//console.log(build());

function build() {
    var response = [];

    var rand;

    for (var x = 1; x <= max; x++) {
        rand = Math.random() * 100;
        if (rand <= prob) {
            response[x] = buildPort();
        }
    }
    return response;
}

function buildPort() {
    var response = null;
    var rand;

    rand = Math.floor(Math.random() * 6);

    portTypes.forEach(function(val){
        if(rand === val.type){
            response = val;
        }
    });
    return response;
}
