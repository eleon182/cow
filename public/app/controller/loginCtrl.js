var app = angular.module('cowApp');

app.controller('loginCtrl', loginCtrl);
loginCtrl.$inject = ['$location', '$scope', '$http', '$timeout', '$q', 'communicationsFty'];

function loginCtrl($location, $scope, $http, $timeout, $q, communicationsFty) {
	var vm = this;
	vm.submit = function(data) {
		var q = $q.defer();
		communicationsFty.login(data).then(function(){
			q.resolve();
			$location.path('home')		
		}, function(){
			q.reject();
		})

		return q.promise

	}
}