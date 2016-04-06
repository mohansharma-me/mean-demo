angular.module('EditUserController',[]).controller('EditUserController', function($scope, UserService) {
	$scope.show_form="none";
	$scope.selectedUser=null;
	$scope.input_disabled=false;
	$scope.msg="";
	$scope.msg_color="";

	$scope.user={
		username:"",
		password:"",
		name:"",
		email:"",
		mobile:""
	};	

	$scope.selectUser=function() {
		$scope.user=$scope.selectedUser;
		if($scope.selectedUser) {
			$scope.show_form="block";
		}
		$scope.msg="";
		$scope.msg_color="";
	};

	$scope.saveUser=function() {
		$scope.input_disabled=true;
		UserService.put($scope.user).then(function(res) {
			$scope.msg=res.data.message;
			if(res.data.success) {
				$scope.msg_color="green";
			} else {
				$scope.msg_color="red";
			}
			$scope.input_disabled=false;
		});
	};

	UserService.get().then(function(res) {
		$scope.users=res.data;
		$scope.selectedUser=$scope.users[0];
		$scope.selectUser();
	});
});