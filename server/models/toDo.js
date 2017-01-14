var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var toDoSchema = new mongoose.Schema({
    item: { type: String, required: true },
})
module.exports = mongoose.model('toDo', toDoSchema);
// module.exports = mongoose.model('toDo'<==name of model(should be name of file and match ##.create/put/read/delete in ctrl), toDoSchema <===name of schema defined w/ "new" above);
