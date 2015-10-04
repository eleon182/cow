var async = require('async');
var progress = require('progress');

var common = require('../common');
var ports = require('../json/ports');

var builtPort = buildArray(ports);

var table = 'cow-ports';
var stockAverage = 2000;

var bar = new progress('Populating :current/:total [:bar] :percent :etas', {
    total: builtPort.length
});

async.eachSeries(builtPort, populatePort, function() {
    console.log('Completed');
});

function buildArray(data) {
    var response = [];
    for (var key in data) {
        response.push({
            key: key,
            data: data[key]
        });
    }
    return response;
}
var rand;

function populatePort(data, callback) {
    bar.tick();
    if (!data.data) {
        setImmediate(callback);
    } else {

        rand = Math.floor(Math.random() * stockAverage * 2);
        var item = {
            sector: {
                'S': data.key
            },
            currentStock: {
                'S': rand.toString()
            },
        };
        var params = {
            TableName: table,
            Item: item
        };
        common.db.putItem(params, function(err, data) {
            if(err){
                console.log(err);
            }
            setImmediate(callback);
        });
    }
}
