var commandList = require('../json/commandList');

module.exports = listCommands;

function listCommands(arg, callback) {
    callback(null, buildSlackResponse(commandList));
}

function buildSlackResponse(input) {
    var response = 'Command List';
    response += '\n```';
    for (var key in input) {
        response += '\n(' + key + ') ' + input[key].description;
    }
    response += '\n```';
    return response;
}
