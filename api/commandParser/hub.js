var commandList = require('../json/commandList');
var userProfile = require('../userProfile');
var lo = require('lodash');

var functionList = {
    displayUser: require('./displayUser'),
    getGameInfo: require('./getGameInfo'),
    transwarp: require('./transwarp'),
    scanSector: require('./scanSector'),
    portScan: require('./portScan'),
    listCommands: require('./listCommands'),
    getPath: require('./getPath'),
    moveSector: require('./moveSector')
};

module.exports = hub;

function hub(input, callback) {
    if (!input.text) {
        return callback({
            error: 'Command not found',
            code: 'emptyCommand'
        }, null);
    }
    var text = input.text.split(' ');
    var username = input.user_name;
    var command, arg, params;

    if (text.length === 0) {
        return callback({
            error: 'Command not found',
            code: 'emptyCommand'
        }, null);
    } else {
        command = commandList[text[0]];
        arg = lo.rest(text);

        params = {
            arg: arg,
            username: username
        };

        if (!command || !functionList[command.func]) {
            return callback({
                error: 'Invalid command',
                code: 'invalidCommand'
            }, null);
        } else if (arg.length !== command.arg) {
            return callback({
                error: 'Invalid arguments. Usage: ' + command.usage,
                code: 'invalidArguments'
            }, null);
        } else {
            var parse = true;
            if (command.parseInt) {
                params.arg.forEach(function(val) {
                    if (lo.isNaN(parseInt(val))) {
                        parse = false;
                    }
                });
            }
            if (parse) {
                userProfile.getUser(params, function(err, response) {
                    params.profile = response;
                    return functionList[command.func](params, callback);
                });
            } else {
                return callback({
                    error: 'Invalid argument type (numeric). Usage: ' + command.usage,
                    code: 'invalidArguments'
                }, null);
            }
        }
    }
}
