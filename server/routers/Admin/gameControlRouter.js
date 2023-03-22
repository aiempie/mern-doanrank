const express = require("express");
const router = express.Router();

const Game = require("../../model/Game");
const verifyToken = require("../../middleware/checkToken");
const checkAdmin = require("../../middleware/checkAdmin");
const checkMod = require("../../middleware/checkMod");

//get all game
router.get("/", async (req, res) => {
  try {
    const games = await Game.find({});
    res.json({
      success: true,
      listGames: games,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});
//get game by id
router.get("/:slug", async (req, res) => {
  try {
    const game = await Game.findOne({ slug: req.params.slug });
    res.json({
      success: true,
      game: game,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

router.post("/", verifyToken, checkMod, async (req, res) => {
  const {
    gameName,
    slug,
    gameImage,
    gameIcon,
    comingSoon,
    isVideo,
    isDoanTenTuong,
  } = req.body;

  //check game name
  if (!gameName) {
    return res.status(400).json({
      success: false,
      message: "Missing name of the game",
    });
  }
  try {
    const hasGame = await Game.findOne({ gameName });
    if (hasGame) {
      return res.status(400).json({
        success: false,
        message: "This game is available",
      });
    }
    const newGame = new Game({
      gameName,
      slug,
      gameImage,
      gameIcon: gameIcon || "https://i.imgur.com/KtNA4Ar.png",
      comingSoon: comingSoon || false,
      isVideo,
      isDoanTenTuong,
    });
    await newGame.save();
    res.json({
      success: true,
      message: "Game create successfully",
      gameInfo: newGame,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

router.put("/:id", verifyToken, checkMod, async (req, res) => {
  const {
    gameName,
    slug,
    gameImage,
    gameIcon,
    comingSoon,
    isVideo,
    isDoanTenTuong,
  } = req.body;
  //check game name
  if (!gameName) {
    return res.status(400).json({
      success: false,
      message: "Missing name of the game",
    });
  }
  try {
    let updateGame = {
      gameName,
      slug,
      gameImage,
      gameIcon: gameIcon || "https://i.imgur.com/KtNA4Ar.png",
      comingSoon: comingSoon || false,
      isVideo,
      isDoanTenTuong,
    };

    updateGame = await Game.findOneAndUpdate(
      { _id: req.params.id },
      updateGame,
      { new: true }
    );
    if (!updateGame) {
      return res.status(401).json({
        success: false,
        message: "The game is not found",
      });
    }
    res.json({
      success: true,
      message: "Game update successfully",
      gameInfo: updateGame,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

router.delete("/:id", verifyToken, checkAdmin, async (req, res) => {
  try {
    const delGame = await Game.findOneAndDelete({ _id: req.params.id });
    if (!delGame) {
      return res.status(401).json({
        success: false,
        message: "The game is not found",
      });
    }
    res.json({
      success: true,
      message: "Game delete successfully",
      gameInfo: delGame,
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
