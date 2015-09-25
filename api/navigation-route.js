var express = require('express');
var debug = require('debug')('main');
var router = express.Router();

var navigation = require('./navigation');

router.get('/getAdjacent', function(req, res, next) {
    var response = navigation.getAdjacent(req.query.sector);
    if (response) {
        res.send(response);
    } else {
        res.status(500).send({
            code: 'notFound',
            error: 'Sector not found'
        });
    }
});

router.get('/getPath', function(req, res, next) {
    if (req.query.start && req.query.end) {
        res.send(navigation.getPath(req.query));
    } else {
        res.status(500).send({
            error: 'Required parameters: start, end',
            code: 'missingParameters'
        });
    }
});

module.exports = router;
