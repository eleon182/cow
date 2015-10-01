var express = require('express');
var uuid = require('node-uuid');
var common = require('./common');
var debug = require('debug')('main');
var router = express.Router();

var table = 'cow-command-log';

router.post('/', function(req, res, next) {
    create(req.body, function(){
        res.send('Cow - Command received: ' + req.body.text);
    })
});

function create(data, callback) {
    var token = uuid.v1();
    var params = {
        TableName: table,
        Item: {
            id: {
                'S': token
            },
            user_name: {
                'S': data.user_name
            },
            text: {
                'S': data.text
            },
            createDate: {
                'S': new Date().toISOString()
            },
        }
    };
    common.db.putItem(params, callback);
}

module.exports = router;
