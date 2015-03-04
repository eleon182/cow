var express = require('express');
var router = express.Router();
var player = require('../game/player')


router.post('/login', function(req, res) {
	res.send('ok')
});
router.post('/create', function(req, res) {
	res.send('ok')

});

/* GET users listing. */
router.get('/', function(req, res) {
	var signup = {
		name: 'steve',
		password: 'leon'
	}
	var playerId = player.createPlayer(signup)
	res.send({
		output: 'Login successful. PlayerId: ' + playerId,
		id: playerId
	})
});

module.exports = router;
