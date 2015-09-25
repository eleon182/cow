var common = require('../common');

module.exports = getUser;

var table = 'cow-user-profile';

function getUser(params) {
    var key = {
        username: {
            ComparisonOperator: 'EQ',
            AttributeValueList: [{
                S: params.username
            }]
        }
    };
    return common.db.query(key, table);
}
