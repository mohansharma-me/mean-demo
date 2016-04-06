angular.module('MainController',[]).controller('MainController', function($scope, UserService, AuthService, $timeout) {
	$scope.username="";
	$scope.password="";

	$scope.msg="";
	$scope.msg_color="";

	$scope.data=function() {
		if(AuthService.data()) {
			return AuthService.data();
		} else {
			return {};
		}
	};

	$scope.show_form=function() {
		if(AuthService.token()) {
			return false;
		} else {
			return true;
		}
	};

	$scope.loginNow=function() {
		UserService.auth({
			username:$scope.username, 
			password:$scope.password
		}).then(function(res) {
			$scope.msg=res.data.message;
			if(res.data.success) {
				$scope.msg_color="green";
				AuthService.token(res.data.token);
				AuthService.data(res.data.data);
				//$scope.data=AuthService.data();
			} else {
				$scope.msg_color="red";
			}
		});
	};

	$scope.logout=function() {
		UserService.auth({
			logout:true
		}).then(function(res) {
			console.log(res.data);
			$scope.msg=res.data.message;
			if(res.data.success) {
				$scope.msg_color="green";
				AuthService.clear()
			} else {
				$scope.msg_color="red";
			}
		});
	};

	UserService.auth({
		profile_request:"id"
	}).then(function(res) {
		if(res.data.success) {
			AuthService.data(res.data.data);
		}
	});
});