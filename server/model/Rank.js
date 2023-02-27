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
  rankGame: {
    type: Schema.Types.ObjectId,
    ref: "category",
  },
});

module.exports = mongoose.model("rank", RankSchema);
