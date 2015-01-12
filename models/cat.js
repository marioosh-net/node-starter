var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CatSchema = new Schema({
  name: String,
  color: String,
});

/**
 * NOTE: methods must be added to the schema before compiling it with mongoose.model()
 */
CatSchema.methods = {
	speak: function(){
		console.log('My name is '+this.name);
	}
}

mongoose.model('Cat', CatSchema);