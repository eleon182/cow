var game = require('./game/game')
var commands = {}
var list = [
{output:'(d) Get Status'},
{output:'(c) Clear Screen'},
{output:'(l) List Units'},
]
var list2 = [{
		key: 'n',
		description: 'New game'
	},{
		key: 'd',
		description: 'Get status'
	}, {
		key: 'c',
		description: 'Clear screen'
	}, {
		key: 'l',
		description: 'List units'
	}, {
		key: '?',
		description: 'Help'
	},

]
commands.poll = function(input){
	return game.getPollOutput(input.playerId);
}

commands.process = function(input) {
	var response = '';
	switch(input.command[0]){
		case '?':
			response = list;
			break;
		case 'c':
			response = 'clear';
			break;
		case 'l':
			response = game.displayUnitList();
			break;
	}
	// if (input.command == 'l') {
	// 	return game.displayUnitList();
	// }
	// else if(input.command=='d'){
	// 	return game.statusDisplay(input)
	// }
	// else if(input.command=='n'){

	// 	return game.createSingle(input);
	// }
	return response;
}
module.exports = commands;
