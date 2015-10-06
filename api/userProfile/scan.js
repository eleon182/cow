var common = require('../common');

module.exports = scan;

var table = 'cow-user-profile';

function scan(data, callback) {
    var params = {
        TableName: table
    };
    common.db.scan(params, callback);

}

