(function() {
    'use strict';
    angular
        .module('app.profile')
        .controller('profileCtrl', profileCtrl);

    profileCtrl.$inject = ['dataSvc'];

    function profileCtrl(dataSvc) {

        var vm = this;
        // Contents
        vm.addToDo = addToDo;
		vm.deleteToDo = deleteToDo;
		vm.getTitle = getTitle;
		vm.getToDo = getToDo;
		vm.title = "testing works!"
        vm.updateToDo = updateToDo;

		function getTitle(n) {
			return dataSvc.getTitle(n).then(function(data) {
				vm.title = data;
				return vm.title;
			});
		}
		// vm.getTitle(3); //ng-click event trigger in html

        function addToDo(toDo) {
                dataSvc.addToDo(toDo)
                    .then(function(res) {
                        vm.toDo = ""
                        vm.getToDo();
                    })
            }
        function updateToDo(id, change) {
                dataSvc.updateToDo(id, change)
                    .then(function(res) {
                        vm.itemUp = "";
                        vm.getToDo();
                    })
            }
        function getToDo() {
            dataSvc.getToDo()
                .then(function(res) {
                    //  console.log(res.data)
                    vm.list = res.data;
                })
        }
        vm.getToDo();

        function deleteToDo(id) {
            // console.log(id)
            dataSvc.deleteToDo(id)
                .then(function(res) {
                    //  console.log(res)
                    vm.getToDo();
                })
        }

    } //end of controller
})();
