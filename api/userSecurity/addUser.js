var common = require('../common');
var bcrypt = require('bcrypt');

module.exports = addUser;

var table = 'cow-user-security';

function addUser(data, callback) {
    var item = {
        username: { S: data.username},
        password: { S: bcrypt.hashSync(data.password, 8) },
        createDate: { S: new Date().toISOString() }
    };
    var params = {
        TableName: table,
        Item: item
    };
    common.db.putItem(params,callback);
}
