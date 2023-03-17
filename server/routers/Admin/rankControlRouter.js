const express = require("express");
const router = express.Router();

const Rank = require("../../model/Rank");
const Game = require("../../model/Game");
const verifyToken = require("../../middleware/checkToken");
const checkMod = require("../../middleware/checkMod");

router.get("/getrank/:id", async (req, res) => {
  let game_id = req.params.id;
  try {
    if (!game_id) {
      return res.status(401).json({
        success: false,
        message: "Missing game_id",
      });
    }
    const isHasGameID = await Game.findOne({ _id: game_id });
    if (!isHasGameID) {
      return res.status(403).json({
        success: false,
        message: "Dont have this game",
      });
    }
    const ranks = await Rank.find({ game_id }).sort("order");
    res.json({
      success: true,
      listRanks: ranks,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

router.post("/addrank", verifyToken, checkMod, async (req, res) => {
  const { rankName, rankImage, game_id, order } = req.body;
  //check validate
  if (!rankName || !rankImage || !game_id || !order) {
    return res.status(400).json({
      success: false,
      message: "Missing info of the clip",
    });
  }
  try {
    const newRank = new Rank({ rankName, rankImage, game_id, order });
    await newRank.save();
    res.json({
      success: true,
      message: "Game create successfully",
      gameInfo: newRank,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

module.exports = router;
