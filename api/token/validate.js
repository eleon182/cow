
var common = require('../common');

module.exports = validate;

var table = 'cow-token';

function validate(token) {
    var key = {
        "token": {
            "S": token
        }
    };
    return common.db.getItem(key, table);
}
