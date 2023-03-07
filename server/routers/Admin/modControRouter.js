const express = require("express");
const router = express.Router();

const verifyToken = require("../../middleware/checkToken");
const checkAdmin = require("../../middleware/checkAdmin");
const User = require("../../model/User");

router.get("/", verifyToken, async (req, res) => {
  try {
    const mods = await User.find({ role: "MOD" }).select("-password");
    res.json({
      success: true,
      listMods: mods,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

router.post("/:id", verifyToken, checkAdmin, async (req, res) => {
  try {
    const upMod = await User.findByIdAndUpdate(
      { _id: req.params.id },
      { role: "MOD" },
      { new: true }
    )
      .select("-password")
      .then((updatedDocument) => {
        return updatedDocument;
      })
      .catch((error) => {
        console.log(error);
      });
    if (!upMod) {
      return res.status(401).json({
        success: false,
        message: "The user is not found",
      });
    }
    res.json({
      success: true,
      message: "Mod update successfully",
      modInfo: upMod,
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
    const delMod = await User.findByIdAndUpdate(
      { _id: req.params.id },
      { role: "USER" },
      { new: true }
    )
      .select("-password")
      .then((updatedDocument) => {
        return updatedDocument;
      })
      .catch((error) => {
        console.log(error);
      });
    if (!delMod) {
      return res.status(401).json({
        success: false,
        message: "The user is not found",
      });
    }
    res.json({
      success: true,
      message: "Mod update successfully",
      modInfo: delMod,
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
