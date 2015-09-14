var units = {}
var unitList = [{
	name: 'Marine',
	description: 'Basic unit',
	health: 100,
	cost: 50,
	attack: 10,
	defense: 5,
	tech: 1
}, {
	name: 'Artillery',
	description: 'Basic support unit',
	health: 70,
	cost: 60,
	attack: 15,
	defense: 0,
	tech: 1
}, {
	name: 'Worker',
	description: 'Basic worker',
	health: 30,
	cost: 30,
	attack: 2,
	defense: 0,
	tech: 1
}]
units.displayUnitList = function() {
	var output = [];
	unitList.forEach(function(val) {
		output.push({
			output: '-----------------------'
		})

		output.push({
			output: 'Cost: ' + val.cost
		})
		output.push({
			output: 'Attack: ' + val.attack
		})
		output.push({
			output: 'Defense: ' + val.defense
		})
		output.push({
			output: 'Health: ' + val.health
		})

		output.push({
			output: 'description: ' + val.description
		})

		output.push({
			output: 'Name: ' + val.name
		})

	})
	return output;
}
units.getStartingUnits = function() {
	var response = [];
	response.push(unitList[0])
	response.push(unitList[2])
	return response;
}
module.exports = units;