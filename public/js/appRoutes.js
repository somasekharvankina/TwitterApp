angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
            templateUrl: 'views/tweets.html',
            controller: 'TweetsController',
			controllerAs: 'tweetCtrl'
		})

		.when('/tweets', {
			templateUrl: 'views/tweets.html',
			controller: 'TweetsController',
            controllerAs: 'tweetCtrl'
		});

	$locationProvider.html5Mode(true);

}]);