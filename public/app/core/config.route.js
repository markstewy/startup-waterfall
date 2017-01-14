(function() {
    'use strict';

    var core = angular.module('app.core');
    core.config(function($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: './app/home/home.html',
                controller: 'homeCtrl',
                controllerAs: 'homeCtrl',
				// todo: add resovle to keep home page locked unless logged out
				// resolve: {
                //     user: function(dataSvc, $state) {
                //         return dataSvc.getCurrentUser().then(function(response) {
                //             console.log(response);
                //             if (response.data)
                //                 $state.go('profile');
                //             return response.data;
                //         }).catch(function(err) {
                //             $state.go('login');
                //         });
                //     }
                // }
            })
            .state('profile', {
                url: '/profile',
                templateUrl: './app/profile/profile.html',
                controller: 'profileCtrl',
                controllerAs: 'profileCtrl',
                resolve: {
                    user: function(dataSvc, $state) {
                        return dataSvc.getCurrentUser().then(function(response) {
                            console.log(response);
                            if (!response.data)
                                $state.go('login');
                            return response.data;
                        }).catch(function(err) {
                            $state.go('login');
                        });
                    }
                }
            });

        $urlRouterProvider.otherwise('/home');
    });




})();
