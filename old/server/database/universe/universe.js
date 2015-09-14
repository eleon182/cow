var universe= {};

var q = require('q');
var bigbang = require('./bigbang');
var db = require('../dynamodb');
var constants = {
    depth:4,
    start:1,
    end:10000,
    universe: 1
};

universe.init = function(){
  var univ = bigbang.create(constants.start, constants.end, constants.depth);
  insertUniverse(univ);
};
universe.querySectorPromise = function(sector){
    var Q = q.defer();
    var params = {
        TableName : 'navigation',
        KeyConditions : {
            "sector" : {
                "AttributeValueList" : [ { "N" :sector.toString() } ],
                "ComparisonOperator" : "EQ"
            }        
        }
    };
    db.query(params, function(err, data) {
        if (err) {
            Q.reject(err);
        } else {
            Q.resolve(data.Items);
        }
    });
    return Q.promise
};
universe.batchGetItem = function (sectors){

    var Q = q.defer();

    var temp = [];
    sectors.forEach(function(val){
        temp.push({
            sector: {
                N:val.toString()
            }
        });
    });
    var params = {
        RequestItems:{
            navigation : {Keys:temp}
        }
    };
    db.batchGetItem(params, function(err, data) {
        if (err) {
            Q.reject(err);
        } else {
            Q.resolve(data.Items);
        }
    });

    return Q.promise;

}
universe.querySector = function(sector, callback){
    var params = {
        TableName : 'navigation',
        KeyConditions : {
            "sector" : {
                "AttributeValueList" : [ { "N" :sector.toString() } ],
                "ComparisonOperator" : "EQ"
            }        
        }
    };
    db.query(params, function(err, data) {
        if (err) {
            //console.log (err);
            callback(err);
        } else {
            //console.log (data.Items);
            callback(data.Items);
        }
    });
};
function checkTwoWay(){
    scan(function (data){
        var startkey = { link:1102  , sector:7385 };
        scan(function (newData){
            data = data.concat(newData);
            console.log(data.length);

            var bad = 0;
            data.forEach(function(val){
                if(!findSector(data,val.sector.N, val.link.N)){
                    bad ++;
                }

            });
            console.log('bad: ' + bad);
        },startkey);
    });
}
function findSector(univ, link,sector){
    var resp = false;
    univ.forEach(function(val){
        if(val.link.N==link&&val.sector.N==sector){
            resp = true;
        }
    });
    return resp; 
}
function scan(callback, startkey){
    var params = {TableName: 'navigation'};
    if(startkey){
        params.ExclusiveStartKey = {
            link: { 'N' : startkey.link.toString()},
            sector: {'N': startkey.sector.toString()}
        };
    }
    db.scan(params, function(err, data){
        if (err) {
            console.log(err); // an error occurred
        } else {
            callback(data.Items);
        }
    });
}
function insertUniverse(univ){
    univ.forEach(function(val){
        val.links.forEach(function(b){
            //insert.push({"PutRequest":{Item:{sector:{'N':val.sector.toString()},link:{'N':b.toString()}}}});
            insertSector( val.sector, b);
        });
    });
    
}
function universeStats(){
    var max = 0;
    var resp;
    for(var i =1; i <= constants.end;i++){
        resp = querySector(i);
        if(resp.length > max){
            max = resp.length;
        }
    }
    console.log(max);
}
function batchInsert(items){
    db.batchWriteItem({"RequestItems":{'navigation':items}}, function(err,data){
        if (err) {
            console.log(err); // an error occurred
        } else {
            console.log(data); // successful response
        }
    });

}
function insertSector(a,b){
    var item = {
        sector:{'N':a.toString()},
        link:{'N':b.toString()}
    };
    db.putItem({TableName: 'navigation', Item: item}, function(err, data){
        if (err) {
            console.log(err,data); // an error occurred
        } else {
            console.log(item); // successful response
        }

    });
}
module.exports = universe;
