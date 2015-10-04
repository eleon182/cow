var ports = require('../port');

module.exports = portScan;

function portScan(arg, callback) {
    ports.portScan(arg, function(err, response) {
        callback(null, buildSlackResponse(response));
    });
}

function buildSlackResponse(input) {
    var response = 'Port scan complete';
    response += '\n```';
    for (var key in input) {
        response += '\n' + key + ': ';
        if (input[key]) {
            response += 'Port type-' + input[key].type + '-' + input[key].code + ' ' + input[key].display;
        }
    }
    response += '\n```';
    return response;
}
