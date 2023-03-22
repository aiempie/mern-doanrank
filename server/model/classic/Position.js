const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PositionSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  game_id: {
    type: Schema.Types.ObjectId,
    ref: "games",
  },
});

module.exports = mongoose.model("position", PositionSchema);
