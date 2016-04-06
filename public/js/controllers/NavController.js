angular.module("NavController",[]).controller('NavController', function($scope, AuthService) {
	$scope.showNav=function() {
		//console.log(AuthService.token());
		if(AuthService.token()) {
			return true;
		} else {
			return false;
		}
	};
});