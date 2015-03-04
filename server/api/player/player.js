var player = {}
player.playerList = []
player.createPlayer = function(signup) {
	player.playerList[player.playerList.length] = {
		name: signup.name,
		password: signup.password,
		id: player.playerList.length,
		game: null
	}
	return player.playerList.length - 1;
}
player.getPlayer = function(id) {
	console.log(id)
	console.log(player.playerList)
	if (id >= 0 && id < player.playerList.length) {
		return player.playerList[id]
	} else {
		return null;
	}
}
player.setGame = function(playerId, gameId) {
	if (playerId >= 0 && playerId < player.playerList.length) {
		player.playerList[playerId].game = gameId;
	}
}
module.exports = player;