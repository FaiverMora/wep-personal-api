const mongoose = require("mongoose");
const mogoosePaginate = require("mongoose-paginate");

const CourseSchema = mongoose.Schema({
  title: String,
  miniature: String,
  description: String,
  url: String,
  price: Number,
  score: Number,
});

CourseSchema.plugin(mogoosePaginate);

module.exports = mongoose.model("course", CourseSchema);
