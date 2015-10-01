var express = require('express');
var uuid = require('node-uuid');
var common = require('./common');
var debug = require('debug')('main');
var router = express.Router();

var table = 'steve-test';

router.post('/', function(req, res, next) {
    create(req.body, function(){
        res.end();
    })
});

function create(data, callback) {
    var token = uuid.v1();
    var input = JSON.stringify(data);
    var params = {
        TableName: table,
        Item: {
            id: {
                'S': token
            },
            data: {
                'S': input
            },
            createDate: {
                'S': new Date().toISOString()
            },
        }
    };
    common.db.putItem(params, callback);
}

module.exports = router;
