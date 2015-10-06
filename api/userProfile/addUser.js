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
                N: '1000'
            },
            shields: {
                N: '100'
            },
            fighters: {
                N: '200'
            },
            holds: {
                N: '100'
            },
            fuel: {
                N: '100'
            },
            maxFuel: {
                N: '100'
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
