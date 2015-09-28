var common = require('../common');
var bcrypt = require('bcrypt');

module.exports = addUser;

var table = 'cow-user-security';

function addUser(params) {
    var item = {
        username: { S: params.username},
        password: { S: bcrypt.hashSync(params.password, 8) },
        createDate: { S: new Date().toISOString() }
    };
    return common.db.putItem(item, table);
}
