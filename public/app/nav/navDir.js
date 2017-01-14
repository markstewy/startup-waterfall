angular.module('app.nav')
	.directive('navDir', function() {
  return {
    restrict: 'EA',
    templateUrl: './app/nav/nav.html',
    controller: 'navCtrl',
	controllerAs: 'navCtrl'
  };
});
