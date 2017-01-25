var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var waterfallSchema = new mongoose.Schema({
	w: {
		pShares: {type: Number, required: false },
		pPrice: {type: Number, required: false },
		cShares: {type: Number, required: false },
		lpMultiple: {type: String, required: false },
		part: {type: String, required: false },
		partCap: {type: String, required: false },
		partCapMultiple: {type: String, required: false },
		div: {type: String, required: false },
		divCompound: {type: String, required: false },
		divRate: {type: Number, required: false },
		exitYears: {type: String, required: false },
		minExitVal: {type: String, required: false },
		maxExitVal: {type: String, required: false }
		}
})
module.exports = mongoose.model('waterfall', waterfallSchema);
// module.exports = mongoose.model('toDo'<==name of model(should be name of file and match ##.
//create/put/read/delete in ctrl), toDoSchema <===name of schema defined w/ "new" above);
