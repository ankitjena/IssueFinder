const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var problemSchema = new Schema({
  category: { type: String, required: true},
  subject: { type: String, required: true},
  description: { type: String, required: true},
  filename: { type: String, required: true},
  comments : [],
  author: { type: String, default:'ankit'},
  timestamp: { type: Date, default: Date.now}
});

var problemModel = mongoose.model('problem', problemSchema);
module.exports = problemModel;
