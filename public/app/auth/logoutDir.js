angular.module('app.auth')
	.directive('logoutDir', function() {
  return {
    restrict: 'EA',
    templateUrl: './app/auth/logout.html',
    controller: 'authCtrl',
	controllerAs: 'authCtrl'
  };
});
