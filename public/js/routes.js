angular.module('appRoutes',[]).config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider, AuthService) {
	$routeProvider.when('/', {
		templateUrl:"views/home.html",
		controller:"MainController"
	}).when("/users", {
		templateUrl:"views/users.html",
		controller:"UsersController"
	}).when("/new-user", {
		templateUrl:"views/new-user.html",
		controller:"NewUserController"
	}).when('/edit-user', {
		templateUrl:"views/edit-user.html",
		controller:"EditUserController"
	}).when('/delete-users', {
		templateUrl:"views/delete-user.html",
		controller:"DeleteUserController"
	});

	$locationProvider.html5Mode(true);
}]).run( function($rootScope, $location, AuthService) {
	$rootScope.$on( "$locationChangeStart", function(event, next, current) {
		if ( !AuthService.token() ) {
			if($location.$$path!="/") {
				$location.path("/");
			}
		}         
	});
});