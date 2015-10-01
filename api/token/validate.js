var common = require('../common');

module.exports = validate;

var table = 'cow-token';

function validate(token, callback) {
    var params = {
        Key: {
            "token": {
                "S": token
            }
        },
        TableName: table
    };
    common.db.getItem(params, callback);
}
