const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  gameName: {
    type: String,
    require: true,
    unique: true,
  },
  slug: {
    type: String,
    require: true,
  },
  gameImage: {
    type: String,
    require: true,
  },
  gameIcon: {
    type: String,
    require: true,
  },
  comingSoon: {
    type: Boolean,
    require: true,
  },
  isVideo: {
    type: Boolean,
    require: true,
    default: true,
  },
  isDoanTenTuong: {
    type: Boolean,
    require: true,
    default: false,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("games", gameSchema);
