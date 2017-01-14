angular.module('app.auth')
	.directive('signInUpDir', function() {
  return {
    restrict: 'EA',
    templateUrl: './app/auth/signInUp.html',
    controller: 'authCtrl',
	controllerAs: 'authCtrl'
  };
});
