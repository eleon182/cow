  var app = angular.module('cowApp', [
              // Angular modules 
        'ngAnimate',            // animations
        'ngRoute',              // routing
        'ngSanitize',
        
    ]);
  app.run(['$q', '$rootScope',
        function ($q, $rootScope) {

        }]);

   	// Collect the routes
	app.constant('myroutes', getRoutes());
	// Configure the routes and route resolvers
	app.config(['$routeProvider', 'myroutes', routeConfigurator]);
	function routeConfigurator($routeProvider, routes) {

		routes.forEach(function (r) {
			$routeProvider.when(r.url, r.config);
		});
		$routeProvider.otherwise({ redirectTo: '/' });
	}

	function getRoutes() {
		return [
            {
            	url: '/',
            	config: {
            		title: 'Login',
            		templateUrl: 'appviews/login.html'
            	}
            },			
            {
              url: '/home',
              config: {
                title: 'Home',
                templateUrl: 'appviews/home.html'
              }
            },      
		];
	}