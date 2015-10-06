var common = require('../common');
var navigation = require('../json/navigation');
var shipTypes = require('../json/shipTypes');

module.exports = addUser;

var table = 'cow-user-profile';

function addUser(data, callback) {
    var ship = shipTypes.CVC;
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
            shipCode: {
                S: ship.code.toString()
            },
            shields: {
                N: ship.startShields.toString()
            },
            fighters: {
                N: ship.startFighters.toString()
            },
            holds: {
                N: ship.startHolds.toString()
            },
            fuel: {
                N: ship.maxFuel.toString()
            },
            maxFuel: {
                N: ship.maxFuel.toString()
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

