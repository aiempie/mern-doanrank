const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const championSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  game_id: {
    type: Schema.Types.ObjectId,
    ref: "games",
  },
  Gender: {
    type: Boolean,
    default: true,
  },
  RangeType: {
    type: String,
    enum: ["Cận chiến", "Đánh xa", "Cận chiến và Đánh xa"],
    default: "Cận chiến",
  },
  resource_id: {
    type: Schema.Types.ObjectId,
    ref: "resource",
  },
  position_id: {
    type: Schema.Types.ObjectId,
    ref: "position",
  },
  gamerole_id: {
    type: Schema.Types.ObjectId,
    ref: "gamerole",
  },
  region_id: {
    type: Schema.Types.ObjectId,
    ref: "region",
  },
});

module.exports = mongoose.model("champions", championSchema);
