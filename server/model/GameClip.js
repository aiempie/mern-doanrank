const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameClipSchema = new Schema({
  linkClip: {
    type: String,
    require: true,
    unique: true,
  },
  rank_id: {
    type: Schema.Types.ObjectId,
    ref: "ranks",
  },
  game_id: {
    type: Schema.Types.ObjectId,
    ref: "games",
  },
  credited: {
    type: String,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("gamesclips", gameClipSchema);
