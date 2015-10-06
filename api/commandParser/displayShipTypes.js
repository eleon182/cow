var shipTypes = require('../json/shipTypes');
var common = require('../common');

module.exports = displayUser;

function displayUser(data, callback) {
    callback(null, buildResponse(shipTypes));
}

function buildResponse(shipTypes) {
    var response = 'Ship database';
    response += '\n```';
    response += '\n-----------------';
    for(var key in shipTypes){
        response += '\nName: ' + shipTypes[key].name;
        response += '\nClass: ' + shipTypes[key].class;
        response += '\nDescription: ' + shipTypes[key].description;
        response += '\nPrice: $' + shipTypes[key].price;
        response += '\nTranswarp cost: ' + shipTypes[key].transwarpCost;
        response += '\nMax fighters: ' + shipTypes[key].maxFighters;
        response += '\nMax shields: ' + shipTypes[key].maxShields;
        response += '\nMax fuel: ' + shipTypes[key].maxFuel;
        response += '\nStarting holds: ' + shipTypes[key].startHolds;
        response += '\nMax holds: ' + shipTypes[key].maxHolds;
        response += '\n-----------------';
    }
    response += '\n```';
    return response;
}
