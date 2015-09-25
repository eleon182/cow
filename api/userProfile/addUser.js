var common = require('../common');

module.exports = addUser;

var table = 'cow-user-profile';

function addUser(params) {
    var item = {
        username: { S: params.username},
        sector: { S: params.sector },
        createDate: { S: new Date().toISOString() }
    };
    return common.db.putItem(item, table);
}
