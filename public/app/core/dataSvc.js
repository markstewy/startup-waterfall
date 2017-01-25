(function() {
    'use strict';
    angular
        .module('app.core')
        .service('dataSvc', dataSvc);

    function dataSvc($http, $q) {

        var svc = this;
        // Contents
		svc.addToDo = addToDo;
		svc.editUser = editUser;
		svc.getCurrentUser = getCurrentUser;
		svc.deleteToDo = deleteToDo;
		svc.getTitle = getTitle;
		svc.getToDo = getToDo;
		svc.getUser = getUser;
		svc.getUsers = getUsers;
		svc.login = login;
		svc.logout = logout;
		svc.registerUser = registerUser;
		svc.updateToDo = updateToDo;
		svc.wfCalc = wfCalc;

        /*
        ========== AUTH ==========
        */
        function login(user) {
            return $http({
                method: 'post',
                url: '/login',
                data: user
            }).then(function(response) {
                return response;
            });
        };

        function logout() {
            return $http({
                method: 'get',
                url: '/logout'
            }).then(function(response) {
                return response;
            });
        };

        function getCurrentUser() {
            return $http({
                method: 'GET',
                url: '/me'
            }).then(function(response) {
                return response;
            });
        };

        function registerUser(user) {
            return $http({
                method: 'POST',
                url: '/register',
                data: user
            }).then(function(response) {
                return response;
            });
        };

        function editUser(id, user) {
            return $http({
                method: 'PUT',
                url: "/user/" + id,
                data: user
            }).then(function(response) {
                return response;
            });
        };
        /*
        ========== TO DO LIST ==========
        */
        function addToDo(toDo) {
            return $http({
                method: 'POST',
                url: '/addToDo',
                data: toDo
            }).then(function(res) {
                //   console.log(res);
                return res;
            })
        };

        function updateToDo(id, change) {
            return $http({
                method: 'PUT',
                url: "/updateToDo/" + id,
                data: {
                    item: change
                }
            }).then(function(response) {
                return response;
            });
        };

        function getToDo() {
            return $http({
                method: 'GET',
                url: '/getToDo',
            }).then(function(res) {
                // console.log(res);
                return res;
            })
        };

        function deleteToDo(id) {
            return $http({
                method: 'DELETE',
                url: '/deleteToDo/' + id
            }).then(function(response) {
                return response;
            });
        };
        /*
        ========== USERS ==========
        */
        function getUsers() {
            return $http({
                method: 'GET',
                url: '/user'
            }).then(function(response) {
                return response;
            });
        };

        function getUser(id) {
            return $http({
                method: 'GET',
                url: '/user?_id=' + id
            }).then(function(response) {
                return response;
            });
        };

        // Not Needed
        //
        // this.deleteUser = function(id) {
        //   return $http({
        //     method: 'DELETE',
        //     url: '/user/' + id
        //   }).then(function(response) {
        //     return response;
        //   });
        // };


        /*
        ========== HOME (testing) ==========
        */

        function getTitle(n) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: 'http://swapi.co/api/people/' + n
            }).then(function(response) {
                deferred.resolve(response.data.name)
            })
            return deferred.promise;
        };

		/*
        ========== Waterfall Calcs (hidden from front-end) ==========
        */

        function wfCalc(w) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: '/waterfall',
				data: w
            }).then(function(response) {
                deferred.resolve(response)
            })
            return deferred.promise;
        };


    } //end of service
})();
