var waterfall = require('../models/waterfall');

module.exports = {

    waterfallCalc: function(req, res, next) {
        // console.log(req.body)

		// ===================================
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
            if (w.part === 'false') {
                w.partCap = null;
                w.partCapMultiple = null;
            }
            if (w.div == 'false') {
                w.divCompound = null;
                w.divRate = null;
                w.exitYears = null;
            }
            var pre = w.pPrice * w.cShares;
            var post = w.pPrice * (w.cShares + w.pShares);
            var resultsObj = {
                pVal: [],
                cVal: [],
                iVal: [],
                pValChart: [],
                cValChart: [],
				pre: "",
				post: ""
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
                    // console.log(lpVal, "if div")
                }
                var pVal = Math.max(lpVal, proRataVal);
                pVal = Math.min(pVal, iExitVal);

                resultsObj.pVal.push(Math.max(pVal, 0));
                resultsObj.cVal.push(Math.max(iExitVal - pVal, 0));
                resultsObj.pValChart.push(Math.max(pVal - (iExitVal - pVal), 0));
                resultsObj.cValChart.push(Math.max(iExitVal - pVal, 0));
                resultsObj.iVal.push(iExitVal);
                iExitVal = iExitVal + interval;
            }
			resultsObj.pre = pre;
			resultsObj.post = post;
            // console.log(resultsObj)
			return resultsObj;
        }
		// waterfallCalc();
        // ====================================
        return res.send(waterfallCalc(req.body))
    }
};
