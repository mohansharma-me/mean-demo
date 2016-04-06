angular.module('UserService', []).factory('UserService', ['$http', function($http) {
	return {
		get : function() {
			return $http.get("/api/users");
		},
		create: function(UserData) {
			return $http.post("/api/users", UserData);
		},
		put: function(UserData) {
			return $http.put("/api/users", UserData);
		},
		delete: function(UserData) {
			return $http.post('api/users/'+UserData._id);
		},
		auth: function(UserData) {
			return $http.post('api/auth', UserData);
		}
	};
}]);