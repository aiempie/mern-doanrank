const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  categoryName: {
    type: String,
    require: true,
    unique: true,
  },
  categoryImage: {
    type: String,
    require: true,
  },
  categoryIcon: {
    type: String,
    require: true,
  },
  comingSoon:{
    type: Boolean,
    require: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("category", CategorySchema);
