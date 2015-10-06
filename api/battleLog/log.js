var common = require('../common');
var uuid= require('node-uuid');
var table = 'cow-battle-log';

module.exports = addLog;

function addLog(data) {
    var token = uuid.v1();
    var params = {
        TableName: table,
        Item: {
            id: {
                'S': token
            },
            username: {
                'S': data.username
            },
            text: {
                'S': data.text
            },
            createDate: {
                'S': new Date().toISOString()
            },
        }
    };
    common.db.putItem(params, function(err, results){});
}

