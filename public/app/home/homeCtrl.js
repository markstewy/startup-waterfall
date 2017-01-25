(function() {
    'use strict';
    angular
        .module('app.home')
        .controller('homeCtrl', homeCtrl);

    homeCtrl.$inject = ['dataSvc'];

    function homeCtrl(dataSvc) {

        var vm = this;
        // Contents
		vm.wfCalc = wfCalc;


		function wfCalc(w) {
					return dataSvc.wfCalc(w)
						.then(function(res) {
							console.log(res)
							wfChart(res)
						})
				}

        function wfChart(calcs) {
			// CHARTS JS
			// http://codepen.io/natenorberg/pen/WwqRar
	        var ctx = document.getElementById("myChart").getContext("2d");
	        var colors = {
	            darkBlue: {
	                fill: '#92bed2',
	                stroke: '#3282bf',
	            },
	            purple: {
	                fill: '#8fa8c8',
	                stroke: '#75539e',
	            },
	        };
	        var myChart = new Chart(ctx, {
	            type: 'line',
	            data: {
	                labels: calcs.data.iVal,
	                datasets: [{
	                    label: "Preferred",
	                    fill: true,
	                    backgroundColor: colors.purple.fill,
	                    pointBackgroundColor: colors.purple.stroke,
	                    borderColor: colors.purple.stroke,
	                    pointHighlightStroke: colors.purple.stroke,
	                    borderCapStyle: 'butt',
	                    data: calcs.data.pVal,

	                }, {
	                    label: "Common",
	                    fill: true,
	                    backgroundColor: colors.darkBlue.fill,
	                    pointBackgroundColor: colors.darkBlue.stroke,
	                    borderColor: colors.darkBlue.stroke,
	                    pointHighlightStroke: colors.darkBlue.stroke,
	                    borderCapStyle: 'butt',
	                    data: calcs.data.cVal,
	                }]
	            },
	            options: {
	                responsive: false,
	                scales: {
	                    yAxes: [{
	                        stacked: true,
	                    }]
	                },
	                animation: {
	                    duration: 750,
	                },
	            }
	        });
        }//end wfChart

    }; //end of controller
})();
