var common = require('../common');
var table = 'cow-battle-log';

module.exports = getLog;

function getLog(data, callback) {
    var params = {
        TableName: table,
    };
    common.db.scan(params, callback);
}

