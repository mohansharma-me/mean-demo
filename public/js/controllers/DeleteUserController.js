angular.module('DeleteUserController', []).controller('DeleteUserController', function($scope, UserService) {
	$scope.selectedUser=null;
	$scope.msg="";
	$scope.msg_color="";

	$scope.delete=function() {
		if($scope.selectedUser) {
			if(confirm("Are you sure to delete this user ?")) {
				UserService.delete($scope.selectedUser).then(function(res) {
					$scope.msg=res.data.message;
					if(res.data.success) {
						$scope.msg_color="green";
						UserService.get().then(function(res) {
							$scope.users=res.data;
						});
					} else {
						$scope.msg_color="red";
					}
				});
			}		
		}
	};

	UserService.get().then(function(res) {
		$scope.users=res.data;
	});
});