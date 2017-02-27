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
							vm.pre = res.data.pre;
							vm.post = res.data.post;
							wfChart(res)
						})
				}

        function wfChart(calcs) {
			// CHARTS JS
			// http://codepen.io/natenorberg/pen/WwqRar
			console.log(calcs);
	        var ctx = document.getElementById("myChart").getContext("2d");
			console.log(document.getElementById("myChart").width);
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
					width:500,
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
	                responsive: true,
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
			console.log(document.getElementById("myChart").width);
        }//end wfChart

    }; //end of controller
})();
