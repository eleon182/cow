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
    response += '\nTranswarp fuel cost: ' + (input.length - 1) * 3;
    response += '\n```';
    return response;
}
