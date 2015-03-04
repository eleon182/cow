var app = angular.module('cowApp');

app.controller('homeCtrl', homeCtrl);
homeCtrl.$inject = ['$scope', '$http', '$timeout', '$q', 'communicationsFty'];

function homeCtrl($scope, $http, $timeout, $q, communicationsFty) {
	var vm = this;
	var playerId = null;

	activate();

	function activate() {
		vm.keyPress = function(val) {
			if (val.keyCode === 13) {
				runCommand(vm.mainInput);
			}
		};

		setInterval(function() {
			communicationsFty.poll().then(function(val) {
				insertBlock(val);
			});
		}, 1500)
	}

	function runCommand(command) {
		var splitCommand = command.split('.');
		if (splitCommand[0]) {
			communicationsFty.executeCommand(splitCommand).then(function(val) {
				insertBlock(val);
			});
		}
		clearInput();
	}

	function clearInput() {
		$timeout(function() {
			vm.mainInput = '';
		});
	}

	function clearScreen() {
		$timeout(function() {
			vm.dialogData = 'clear';
		});
	}

	function insertBlock(block) {
		console.log(block)
		if (angular.isArray(block)) {
			block.forEach(function(val) {
				insertText(val);
			});
		} else {
			insertText(block);
		}
	}

	function insertText(text) {
		$timeout(function() {
			vm.dialogData = '';
		});
		$timeout(function() {
			vm.dialogData = text;
		});
	}

}
