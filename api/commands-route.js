var express = require('express');
var uuid = require('node-uuid');
var debug = require('debug')('main');
var router = express.Router();

var commandParser = require('./commandParser');
var common = require('./common');
var slack = require('./slackApi');
var table = 'cow-command-log';

router.post('/', function(req, res, next) {
    commandParser.hub(req.body, function(err, response){
        if(err && err.error){
            res.send('('+req.body.text+') ' + err.error);
        }
        else {
            res.send('('+req.body.text+') ' + response);
        }
    });
    addLog(req.body, function(){});
});

function addLog(data, callback) {
    var token = uuid.v1();
    var params = {
        TableName: table,
        Item: {
            id: {
                'S': token
            },
            username: {
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
