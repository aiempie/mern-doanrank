const express = require("express");
const router = express.Router();

const GameRole = require("../../model/classic/GameRole");
const Game = require("../../model/Game");
const verifyToken = require("../../middleware/checkToken");
const checkMod = require("../../middleware/checkMod");

router.post("/addgamerole", verifyToken, checkMod, async (req, res) => {
  const { name, game_id } = req.body;
  //check validate
  if (!name || !game_id) {
    return res.status(400).json({
      success: false,
      message: "Missing info of the position",
    });
  }
  try {
    const isHasGameID = await Game.findOne({ _id: game_id });
    if (!isHasGameID) {
      return res.status(404).json({
        success: false,
        message: "Dont have this game",
      });
    }
    const newPosition = new GameRole({ name, game_id });
    await newPosition.save();
    res.json({
      success: true,
      message: "Game Position create successfully",
      gameRole: newPosition,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

router.get("/getgamerole/:id", async (req, res) => {
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
    const gameRoles = await GameRole.find({ game_id });
    res.json({
      success: true,
      listGameRole: gameRoles,
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
