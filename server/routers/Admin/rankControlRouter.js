const express = require("express");
const router = express.Router();

const Rank = require("../../model/Rank");
const verifyToken = require("../../middleware/checkToken");
const checkMod = require("../../middleware/checkMod");

router.get("/getrank/", async (req, res) => {
  let { game_id } = req.body;
  try {
    const ranks = await Rank.find({ game_id });
    res.json({
      success: true,
      listGames: ranks,
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
  const { rankName, rankImage, game_id } = req.body;
  //check validate
  if (!rankName || !rankImage || !game_id) {
    return res.status(400).json({
      success: false,
      message: "Missing info of the clip",
    });
  }
  try {
    const newRank = new Rank({ rankName, rankImage, game_id });
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
