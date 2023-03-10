const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clipsRanksSchema = new Schema({
  clip_id: {
    type: Schema.Types.ObjectId,
    ref: "gamesclips",
  },
  rank_id: {
    type: Schema.Types.ObjectId,
    ref: "ranks",
  },
  quantity: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("clipsranks", clipsRanksSchema);
