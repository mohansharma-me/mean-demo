angular.module('NewUserController',[]).controller('NewUserController', function($scope, UserService) {
	$scope.form_message="";
	$scope.form_message_color="";
	$scope.input_disabled=false;
	$scope.user={
		username:"",
		password:"",
		name:"",
		email:"",
		mobile:""	
	};

	$scope.submitForm=function() {
		$scope.input_disabled=true;
		UserService.create($scope.user).then(function(res) {
			var result=res.data;
			$scope.form_message=result.message;
			if(result.success) {
				$scope.form_message_color="green";
				newUserForm.reset();
			} else {
				$scope.form_message_color="red";
			}
			$scope.input_disabled=false;
		});
	}
});