var commandList = require('../json/commandList');
var userProfile = require('../userProfile');
var lo = require('lodash');

var functionList = {
    displayUser: require('./displayUser'),
    scanSector: require('./scanSector'),
    listCommands: require('./listCommands'),
    getPath: require('./getPath'),
    moveSector: require('./moveSector')
};

module.exports = hub;

function hub(input, callback) {
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
            userProfile.getUser(params, function(err, data) {
                if (err) {
                    userProfile.addUser(params, function(err, data) {
                        functionList[command.func](params, callback);
                    });
                } else {
                    functionList[command.func](params, callback);
                }
            });
        }
    }
}
