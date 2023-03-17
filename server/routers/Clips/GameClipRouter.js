const express = require("express");
const router = express.Router();

const GameClip = require("../../model/GameClip");
const Game = require("../../model/Game");
const verifyToken = require("../../middleware/checkToken");
const checkMod = require("../../middleware/checkMod");

router.post("/getclip/", verifyToken, async (req, res) => {
  const { game_id, takenIds } = req.body;
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
    const count = await GameClip.countDocuments({
      _id: { $nin: takenIds || [] },
      game_id: game_id,
    });
    const clip = await GameClip.findOne({
      _id: { $nin: takenIds || [] },
      game_id: game_id,
    })
      .select("-rank_id")
      .skip(Math.floor(Math.random() * count))
      .exec();
    if (clip) {
      res.json({
        success: true,
        clip: clip,
      });
    } else {
      res.json({
        success: true,
        isNullClip: true,
        message: "Bạn đã xem hết clip hiện tại",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

router.post("/addclip", verifyToken, checkMod, async (req, res) => {
  const { linkClip, rank_id, game_id, creditBy } = req.body;
  //check validate
  if (!linkClip || !rank_id || !game_id) {
    return res.status(400).json({
      success: false,
      message: "Missing info of the clip",
    });
  }
  try {
    const newGameClip = new GameClip({ linkClip, rank_id, game_id, creditBy });
    await newGameClip.save();
    res.json({
      success: true,
      message: "Game create successfully",
      gameInfo: newGameClip,
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
