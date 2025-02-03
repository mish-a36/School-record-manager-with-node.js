const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  grade: String,
  age: Number,
});

module.exports = mongoose.model('Student', studentSchema);
