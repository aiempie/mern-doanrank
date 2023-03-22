const express = require("express");
const router = express.Router();

const Resource = require("../../model/classic/Resource");
const Game = require("../../model/Game");
const verifyToken = require("../../middleware/checkToken");
const checkMod = require("../../middleware/checkMod");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

router.post("/addresource", verifyToken, checkMod, async (req, res) => {
  const { name, game_id } = req.body;
  //check validate
  if (!name || !game_id) {
    return res.status(400).json({
      success: false,
      message: "Missing info of the resource",
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
    const newResource = new Resource({ name, game_id });
    await newResource.save();
    res.json({
      success: true,
      message: "Game Resource create successfully",
      resource: newResource,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

router.get("/getresource/:id", async (req, res) => {
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
    const resources = await Resource.find({ game_id });
    res.json({
      success: true,
      listResources: resources,
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
