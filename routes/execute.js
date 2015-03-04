var express = require('express');
var router = express.Router();
var commands = require('../game/commands')
router.post('/', function(req, res) {
	res.send(commands.process(req.body))
});
router.post('/poll', function(req, res) {
    res.send(commands.poll(req.body))
});
module.exports = router;
