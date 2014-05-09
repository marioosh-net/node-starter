var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CatSchema = new Schema({
  name: String,
  color: String
});

mongoose.model('Cat', CatSchema);