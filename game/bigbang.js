var bigbang = {}
var units = require('./units')

var factors = {
	gold: 200,
	gas: 150,
}

function createSectorResource(universe) {
	universe.forEach(function(val) {
		if (factors.gas > rand()) {
			val.gas = rand()
		}
	})
	universe.forEach(function(val) {
		if (factors.gold > rand()) {
			val.gold = rand()
		}
	})
}

function insertPlayer(universe, player) {
	var sector = rand(universe.length - 1)
	universe[sector].player = {
		id: player.id,
		name: player.name,
		units: units.getStartingUnits()
	}
}
function createUniverse(size) {
	var universe = new Array();

	var temp1 = [];
	var temp2 = [];
	for (var i = 0; i < 26; i++) {
		temp1[i] = String.fromCharCode(i + 97)
		temp2[i] = String.fromCharCode(i + 97)
	}
	shuffle(temp1);
	shuffle(temp2);
	var switchTemp = false;
	for (var i = 0; i < size * size; i++) {
		if (temp1.length == 0 || temp2.length == 0) {
			break;
		}
		universe[i] = {
			key: temp1[temp1.length - 1] + '' + temp2[temp2.length - 1]
		}
		if (switchTemp) {
			temp1.pop();
			switchTemp = false;
		} else {
			temp2.pop();
			switchTemp = true;
		}
	}
	return universe;
}
function createComputerPlayer() {
	return {
		name: 'Computer',
		id: 'a'
	}
}
bigbang.createSingle = function(size, player) {
	var universe = createUniverse(10);

	createSectorResource(universe);
	insertPlayer(universe, player);
	insertPlayer(universe, createComputerPlayer());
	return universe;
}

module.exports = bigbang;

function shuffle(array) {
	var currentIndex = array.length,
	temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {

		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

function rand(factor) {
	if (!factor || factor < 1) {
		factor = 1000;
	}
	return Math.floor((Math.random() * factor));
}

