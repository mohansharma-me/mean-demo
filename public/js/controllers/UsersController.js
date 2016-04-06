angular.module('UsersController', []).controller('UsersController', function($scope, UserService) {
	UserService.get().then(function(res) {
		$scope.users=res.data;
	});
});