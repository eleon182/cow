var commandList = require('../json/commandList')
var lo = require('lodash')

var functionList = {
    displayUser: require('./displayUser'),
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
        } else {
            functionList[command.func](params, callback);
        }
    }
}
