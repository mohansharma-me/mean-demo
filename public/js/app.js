var app=angular.module('user-management', [ 'NavController', 'ipCookie', 'angular-loading-bar', 'ngAnimate', 'ngRoute', "AuthService", 'appRoutes', 'MainController' ,"UsersController", "UserService", "NewUserController", "EditUserController" , "DeleteUserController" ]);
app.factory('tokenInjector', ['AuthService', function(AuthService) {
	var tokenInjector = {
        request: function(config) {
            if (AuthService.token()) {
                config.headers['x-session-token'] = AuthService.token();
            }
            return config;
        },
        response: function(response) {
        	if(response.headers()["x-clear-token"]) {
        		AuthService.clear();
        	}
        	return response;
        }
    };
    return tokenInjector;
}]);
app.config(['$httpProvider', function($httpProvider) {  
    $httpProvider.interceptors.push('tokenInjector');
}]);
app.directive('ucwords', function() {
	return  {
		scope:"@",		
		link:function(scope,elem,attr) {
			scope.$watch(attr.ucwords, function(a) {
				var value=elem.val();
				if(value) {
					elem.val(ucwords(elem.val()));
				} else {
					elem.text(ucwords(elem.text()));
				}
            });  
		}
	};
});