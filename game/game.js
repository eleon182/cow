var bigbang = require('./bigbang')
var player = require('./player')
var display = require('./display')
var units = require('./units')
var game = {};
var gameList = [];

function findGame(playerId) {
	var gameId = -1;
	console.log(playerId)
	console.log(gameList)
	gameList.forEach(function(val) {
		val.players.forEach(function(inner) {
			if (playerId == inner) {
				gameId = val.id
			}
		})
	})
	return gameId;
}
game.createUser = function(signup) {
	return player.createPlayer(signup);
}
game.getPlayer = function(id) {
	return player.getPlayer(id);
}
game.statusDisplay = function(input) {
	var gameId = findGame(input.playerId);
	console.log(gameId)
	if (gameId == -1) {
				return;
	} else {
		return display.getStatusDisplay(gameList[gameId]);
	}
}

game.getStatus = function(input) {
	return display.getStatus(findGame(input.playerId))
}
game.createSingle = function(input) {
	var playerId = input.playerId;
	console.log(player.getPlayer(playerId))
	gameList.push({
		game: bigbang.createSingle(10, player.getPlayer(playerId)),
		id: gameList.length,
		players: [playerId]
	})
	player.setGame(playerId, gameList.length - 1)

	return {
		output: 'Game #: ' + (gameList.length - 1)
	}
	var response = [];
	response.push({
		output: 'Game #: ' + (gameList.length - 1)
	})
	return response;
}

game.displayUnitList = function() {
	return units.displayUnitList();
}
game.getPollOutput = function(playerId){
	return display.getPollOutput(playerId);
}
module.exports = game;
