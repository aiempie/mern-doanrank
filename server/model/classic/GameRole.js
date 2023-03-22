const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GameRoleSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  game_id: {
    type: Schema.Types.ObjectId,
    ref: "games",
  },
});

module.exports = mongoose.model("gamerole", GameRoleSchema);
