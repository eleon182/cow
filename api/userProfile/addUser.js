var common = require('../common');
var navigation = require('../json/navigation');

module.exports = addUser;

var table = 'cow-user-profile';

function addUser(data, callback) {
    var sector = data.sector || Math.floor(Math.random()*navigation.length-1)+1;
    var params = {
        TableName: table,
        Item: {
            username: {
                S: data.username
            },
            currency: {
                S: '1000'
            },
            shields: {
                S: '100'
            },
            fighters: {
                S: '200'
            },
            holds: {
                S: '100'
            },
            fuel: {
                S: '100'
            },
            maxFuel: {
                S: '100'
            },
            sector: {
                S: sector.toString()
            },
            createDate: {
                S: new Date().toISOString()
            }
        }
    };
    common.db.putItem(params, callback);
}
