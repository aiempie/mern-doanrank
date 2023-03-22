const express = require("express");
const router = express.Router();

const Champion = require("../../model/Champions");
const Game = require("../../model/Game");
const verifyToken = require("../../middleware/checkToken");
const checkMod = require("../../middleware/checkMod");

router.get("/getchampion/:id", async (req, res) => {
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
    const champion = await Champion.find({ game_id });
    res.json({
      success: true,
      listChampion: champion,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

router.post("/addchampion", verifyToken, checkMod, async (req, res) => {
  const {
    name,
    game_id,
    image,
    Gender,
    RangeType,
    resource_id,
    position_id,
    gamerole_id,
    region_id,
  } = req.body;
  //check validate
  if (
    !name ||
    !game_id ||
    !image ||
    !resource_id ||
    !position_id ||
    !gamerole_id ||
    !region_id
  ) {
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
    const newChamp = new Champion({
      name,
      game_id,
      image,
      Gender,
      RangeType,
      resource_id,
      position_id,
      gamerole_id,
      region_id,
    });
    await newChamp.save();
    res.json({
      success: true,
      message: "Champion create successfully",
      champion: newChamp,
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
