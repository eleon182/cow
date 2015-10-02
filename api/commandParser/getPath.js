var userProfile = require('../userProfile');
var navigation = require('../navigation');

module.exports = getPath;

function getPath(data, callback) {
    var params = {
        start: data.profile.sector,
        end: data.arg[0]
    };

    var path = navigation.getPath(params);
    return callback(null, buildSlackResponse(path));
}

function buildSlackResponse(input) {
    var response = 'Compute navigation path';
    response += '\n```';
    response += '\n' + input;
    response += '\n```';
    return response;
}
