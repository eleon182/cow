var express = require('express');
var debug = require('debug')('main');
var router = express.Router();

var table = 'steve-test';

router.post('/', function(req, res, next) {
    create(req.body, function(){
        res.end();
    })
});

function create(data, callback) {
    var input = JSON.stringify(data);
    var params = {
        TableName: table,
        Item: {
            data: {
                'S': input
            },
            createDate: {
                'S': new Date().toISOString()
            },
        }
    };
    common.db.putItem(params, function(err, data) {
        if (err) {
            return callback(err, data);
        } else {
            return callback(null, {
                token: token
            });
        }
    });
}

module.exports = router;
