var battleLog = require('../battleLog');
var lo = require('lodash');
var common = require('../common');

module.exports = displayUser;

function displayUser(data, callback) {
    battleLog.getLog(data, function(err, results){
        callback(null, buildResponse(results));
    });
}

function buildResponse(input) {
    input = lo.sortBy(input, function(n){
        return new Date(n.createDate);
    });
    lo(input).reverse().value();
    input = input.slice(0, 10);
    var response = 'Battle Logs';
    response += '\n```';
    input.forEach(function(val){
        response += '\n'+ new Date(val.createDate).toISOString() + ' | ' + val.text;
    });
    response += '\n```';
    return response;
}
