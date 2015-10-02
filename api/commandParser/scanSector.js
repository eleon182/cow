var userProfile = require('../userProfile');

module.exports = scanSector;

function scanSector(arg, callback) {
    userProfile.scanSector(arg, function(err, response) {
        if (err) {
            return callback({
                error: 'User not found',
                code: 'notFound'
            });
        } else {
            callback(null, buildSlackResponse(response));
        }
    });
}

function buildSlackResponse(input) {
    var response = 'Scan complete';
    response += '\n```';
    for (var key in input) {
        response += '\n' + key + ': ' + input[key];
    }
    response += '\n```';
    return response;
}
