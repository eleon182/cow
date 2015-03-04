(function() {

	'use strict';

	angular.module('cowApp').factory('communicationsFty', communicationsFty);
	communicationsFty.$inject = ['$http', '$q'];

	function communicationsFty($http, $q) {
		// Define the functions and properties to reveal.
		var playerId = 1;
		var service = {
			executeCommand: executeCommand,
			poll: poll,
			login: login
		};
		return service;

		function poll() {
			var q = $q.defer();
			var data = {
				playerId: playerId
			}
			$http({
				url: '/execute/poll',
				method: 'post',
				data: data
			}).
			success(function(data, status, headers, config) {
				q.resolve(data)
			}).
			error(function(data, status, headers, config) {
				q.reject();
			})
			return q.promise;
		}

		function executeCommand(command) {
			var data = {
				command: command,
				playerId: playerId
			}
			var q = $q.defer();
			$http({
				url: '/execute',
				method: 'post',
				data: data
			}).
			success(function(data, status, headers, config) {
				q.resolve(data)
			}).
			error(function(data, status, headers, config) {
				q.reject();
			})
			return q.promise;
		}

		function login(data) {
			var q = $q.defer();
			var url = ''
			if (data.newUser) {
				url += 'create';
			} else {
				url += 'login'
			}
			$http({
				url: '/users/' + url,
				method: 'post',
				data: data
			}).
			success(function(data, status, headers, config) {
				playerId = data.id
				q.resolve(data)
			}).
			error(function(data, status, headers, config) {
				q.reject();
			})
			return q.promise;
		}
	}

})();
