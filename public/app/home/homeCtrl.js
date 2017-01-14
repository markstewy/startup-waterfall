(function() {
    'use strict';
    angular
        .module('app.home')
        .controller('homeCtrl', homeCtrl);

    homeCtrl.$inject = ['dataSvc'];

    function homeCtrl(dataSvc) {

        var vm = this;
        // Contents
        vm.waterfallCalc = waterfallCalc;

        function waterfallCalc(w) {
            // ======= RAPID TESTING =======
            // var w = {
            //         pShares: 10,
            //         pPrice: 1,
            //         cShares: 90,
            //         lpMultiple: '1.5',
            //         part: 'true',
            //         partCap: 'true',
            //         partCapMultiple: '2',
            //         div: 'true',
            //         divCompound: '1',
            //         divRate: 0.05,
            //         exitYears: '5',
            //         minExitVal: '0',
            //         maxExitVal: '110'
            //     }
            // ==============
            vm.pre = w.pPrice * w.cShares;
            vm.post = w.pPrice * (w.cShares + w.pShares);
            vm.resultsObj = {
                pVal: [],
                cVal: [],
                iVal: [],
				pValChart: [],
				cValChart: []
            };
            var minExitVal = parseFloat(w.minExitVal);
            var maxExitVal = parseFloat(w.maxExitVal);
            var points = 20;
            var interval = (maxExitVal - minExitVal) / points;
            var iExitVal = minExitVal;
            var percentPref = (w.pShares / (w.cShares + w.pShares));
            var investedCapVal = (w.pPrice * w.pShares);

            for (var i = 0; i <= points; i++) {
                var baseVal = Math.min((investedCapVal * w.lpMultiple), iExitVal);
                var partVal = Math.min(((iExitVal - baseVal) * percentPref) + baseVal, iExitVal);
                var partCapVal = Math.min(partVal, (investedCapVal * w.partCapMultiple));
                var divVal = Math.min((investedCapVal * Math.pow((1 + (w.divRate / w.divCompound)), (w.divCompound * w.exitYears))) - investedCapVal);
                var lpVal = baseVal; //prob here

                var proRataVal = (iExitVal * percentPref);
                if (w.part === 'true') {
                    if (w.partCap === 'true') {
                        lpVal = partCapVal;
                    } else if (w.partCap !== 'true') {
                        lpVal = partVal;
                    }
                }
                if (w.div === 'true') {
                    // plus div
                    lpVal = lpVal + divVal;
                    console.log(lpVal, "if div")
                }
                var pVal = Math.max(lpVal, proRataVal);
                pVal = Math.min(pVal, iExitVal);

                vm.resultsObj.pVal.push(Math.max(pVal, 0));
                vm.resultsObj.cVal.push(Math.max(iExitVal - pVal, 0));
				vm.resultsObj.pValChart.push(Math.max(pVal - (iExitVal - pVal), 0));
				vm.resultsObj.cValChart.push(Math.max(iExitVal - pVal, 0));
                vm.resultsObj.iVal.push(iExitVal);
                iExitVal = iExitVal + interval;
            }
            console.log(vm.resultsObj)

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
	                labels: vm.resultsObj.iVal,
	                datasets: [{
	                    label: "Preferred",
	                    fill: true,
	                    backgroundColor: colors.purple.fill,
	                    pointBackgroundColor: colors.purple.stroke,
	                    borderColor: colors.purple.stroke,
	                    pointHighlightStroke: colors.purple.stroke,
	                    borderCapStyle: 'butt',
	                    data: vm.resultsObj.pVal,

	                }, {
	                    label: "Common",
	                    fill: true,
	                    backgroundColor: colors.darkBlue.fill,
	                    pointBackgroundColor: colors.darkBlue.stroke,
	                    borderColor: colors.darkBlue.stroke,
	                    pointHighlightStroke: colors.darkBlue.stroke,
	                    borderCapStyle: 'butt',
	                    data: vm.resultsObj.cVal,
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

        }


    }; //end of controller
})();
