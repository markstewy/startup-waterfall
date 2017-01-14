(function() {
	'use strict';
	angular
		.module('app.auth')
		.controller('authCtrl', authCtrl);

	authCtrl.$inject = ['dataSvc', '$state'];

	function authCtrl (dataSvc, $state) {

		var vm = this;
		// Contents
		vm.login = login;
		vm.logout = logout;
		vm.newUser = {};
		vm.register = register;

        function login(user) {
            dataSvc.login(user).then(function(response) {
                console.log(response);
                if (!response.data) {
                    alert('User does not exist');
                    $scope.user.password = '';
                } else {
                    $state.go('profile');
                }
            }).catch(function(err) {
                alert('Unable to login');
            });
        };

        function register(user) {
            dataSvc.registerUser(user).then(function(response) {
                if (!response.data) {
                    alert('Unable to create user');
                } else {
                    alert('User Created');
                    vm.newUser = {};
                }
            }).catch(function(err) {
                alert('Unable to create user');
            });
        };

        function logout() {
            dataSvc.logout().then(function(response) {
                $state.go('home');
            });
        };
    }
})();
