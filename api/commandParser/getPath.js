var userProfile = require('../userProfile');
var navigation = require('../navigation');

module.exports = getPath;

function getPath(data, callback) {
    userProfile.getUser(data, function(err, response) {
        if (err) {
            return callback({
                error: 'User not found',
                code: 'notFound'
            });
        } else {
            var params = {
                start: response.sector,
                end: data.arg[0]
            };

            var path = navigation.getPath(params);
            return callback(null, buildSlackResponse(path));
        }
    });
}

function buildSlackResponse(input) {
    var response = 'Compute navigation path';
    response += '\n```';
    response += '\n' + input;
    response += '\n```';
    return response;
}
