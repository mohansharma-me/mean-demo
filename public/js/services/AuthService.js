angular.module('AuthService', []).factory('AuthService',['ipCookie', function(cookie) {

	var service={};
	
	service.token=function(newToken) {
		if(newToken) {
			cookie("authtoken", newToken);
		}
		return cookie("authtoken");
	};

	service.data=function(newData) {
		if(newData) {
			cookie("authdata", newData);
		}
		var data=cookie("authdata");
		if(data && data.name) {
			data.name=ucwords(data.name);
		}
		return data;
	};

	service.clear=function() {
		cookie.remove('authdata');
		cookie.remove('authtoken');
	};

	service.isUserAvailable=function() {
		if(this.token && this.data) {
			return true;
		} else {
			return false;
		}
	};

	return service;

}]);