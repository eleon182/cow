var common = require('../common');
var navigation = require('../json/navigation');
var ports = require('../json/ports');

var table = 'cow-user-profile';

module.exports = getUserStats;

function getUserStats(data, callback) {
    var params = {
        TableName: table
    };
    common.db.scan(params, function(err, userData) {
        var response = {};
        response.topPlayer = getTopPlayer(userData);
        response.gameInfo = getGameInfo(userData);
        response.portStats = getPortStats(ports);
        response.sectorStats = getSectorStats(navigation);
        callback(err, response);
    });
}

function getGameInfo(data){
    var response = {
        fighters: 0,
        shields: 0,
        currency: 0,
        players: 0
    };
    data.forEach(function(val){
        response.players++;
        response.fighters += parseInt(val.fighters);
        response.shields += parseInt(val.shields);
        response.currency += parseInt(val.currency);
    });
    return response;
}

function getSectorStats(nav){
    var response = {
        maxHops: 0,
        minHops: null,
        sectors: nav.length - 1,
    };

    nav.forEach(function(val){
        if(response.maxHops < val.length){
            response.maxHops = val.length;
        }
        if(!response.minHops || response.minHops > val.length){
            response.minHops = val.length;
        }
    });
    return response;
}

function getPortStats(ports){
    var response = {
        count: 0,
        sellFuel: 0,
        buyFuel: 0,
        sellIron: 0,
        buyIron: 0,
        sellTitanium: 0,
        buyTitanium: 0
    };
    ports.forEach(function(val){
        if(val){
            response.count++;
            if(val.iron && val.iron === 'b'){
                response.buyIron++;
            }
            else if(val.iron && val.iron === 's'){
                response.sellIron++;
            }
            else if(val.fuel && val.fuel === 's'){
                response.sellFuel++;
            }
            else if(val.fuel && val.fuel === 'b'){
                response.buyFuel++;
            }
            else if(val.titanium && val.titanium === 'b'){
                response.buyTitanium++;
            }
            else if(val.titanium && val.titanium === 's'){
                response.sellTitanium++;
            }
        }
    });
    return response;
}
function getTopPlayer(data) {
    var response = {
        currency: null,
        fighters: null,
        shields: null,
    };
    data.forEach(function(val) {
        if(!response.currency || parseInt(val.currency) > parseInt(response.currency.currency)){
            response.currency = val;
        }
        if(!response.fighters || parseInt(val.fighters) > parseInt(response.fighters.fighters)){
            response.fighters= val;
        }
        if(!response.shields || parseInt(val.shields) > parseInt(response.shields.shields)){
            response.shields= val;
        }
    });
    return response;
}
