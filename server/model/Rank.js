const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RankSchema = new Schema({
  rankName: {
    type: String,
    require: true,
    unique: true,
  },
  rankImage: {
    type: String,
  },
  game_id: {
    type: Schema.Types.ObjectId,
    ref: "games",
  },
});

module.exports = mongoose.model("ranks", RankSchema);
