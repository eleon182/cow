var common = require('../common');

module.exports = updateSector;

var table = 'cow-user-profile';

function updateSector(params) {
    var key = {
        username: {
            'S': params.username
        },
    };
    var expression = "set sector= :val1";
    var values = {
        ':val1': {
            'S': params.sector
        }
    };

    return common.db.updateItem(key, expression, values, table);
}
