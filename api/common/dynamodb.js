var AWS = require('aws-sdk');
var debug = require('debug')('main');
var lo = require('lodash');
AWS.config.update({
    region: 'us-west-2',
    // profile: 'steve'
});

var dataHelper = require('./helpers/dataHelper');

var db = new AWS.DynamoDB();

module.exports = {
    scan: scan,
    getItem: getItem,
    batchGetItem: batchGetItem,
    putItem: putItem,
    deleteItem: deleteItem,
    query: query,
    updateItem: updateItem,
    listTables: listTables
};

function listTables(params, callback) {
    db.listTables(params, function(err, data) {
        if (err) {
            return callback(err, null);
        } else {
            return callback(null, data);
        }
    });
}

function updateItem(params, callback) {
    // var params = {
    //     TableName: params.table,
    //     Key: params.key,
    //     UpdateExpression: params.expression,
    //     ExpressionAttributeValues: params.values
    // };

    db.updateItem(params, function(err, data) {
        if (err) {
            return callback(err, null);
        } else {
            return callback(null, data);
        }
    });
}

function query(params, callback) {
    // var params = {
    //     TableName: table,
    //     KeyConditions: key
    db.query(params, function(err, data) {
        if (err) {
            return callback(err, null);
        } else {
            dataHelper.removeKey(data.Items);
            return callback(null, data.Items);
        }
    });
}

function deleteItem(params, callback) {
    // var params = {
    //     TableName: table,
    //     Key: key
    // };

    db.deleteItem(params, function(err, data) {
        if (err) {
            return callback(err, null);
        } else {
            return callback(null, data);
        }
    });
}

function batchGetItem(params, callback) {
    //var params = {
        //RequestItems: {
            //'cow-ports': {
                //Keys: [{
                    //sector: {
                        //"S": '4350'
                    //}
                //}]
            //}
        //}
    //};

    db.batchGetItem(params, function(err, data) {
        for (var key in data.Responses) {
            data.Responses[key].forEach(function(val) {
                dataHelper.removeKey(val);
            });
        }
        var response = {};

        for (var key in data.Responses) {
            response = data.Responses[key];
        }

        return callback(null, response);
    });
}

function getItem(params, callback) {
    // var params = {
    //     TableName: table,
    //     Key: key
    // };

    db.getItem(params, function(err, data) {
        if (err || lo.isEmpty(data)) {
            if (!err) {
                err = 'Item not found';
            }
            return callback(err, null);
        } else {
            dataHelper.removeKey(data.Item);
            return callback(null, data.Item);
        }
    });
}

function scan(params, callback) {
    // var params = {
    //     TableName: table
    // };
    db.scan(params, function(err, data) {
        if (err) {
            callback(err, null);
        } else {
            dataHelper.removeKey(data.Items);
            callback(null, data.Items);
        }
    });
}

function putItem(params, callback) {
    // var params = {
    //     TableName: table,
    //     Item: item
    // }
    db.putItem(params, function(err, data) {
        if (err) {
            return callback(err, null);
        } else {
            return callback(null, data);
        }

    });
}
