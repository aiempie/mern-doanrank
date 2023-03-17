const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RankSchema = new Schema({
  rankName: {
    type: String,
    require: true,
  },
  rankImage: {
    type: String,
  },
  game_id: {
    type: Schema.Types.ObjectId,
    ref: "games",
  },
  order: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("ranks", RankSchema);
