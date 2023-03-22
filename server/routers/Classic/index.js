const express = require("express");
const router = express.Router();
const PositionRouter = require("./PositionRouter");
const GameRoleRouter = require("./GameRoleRouter");
const RegionRouter = require("./RegionRouter");
const ResourceRouter = require("./ResourceRouter");

router.use("/position", PositionRouter);
router.use("/gamerole", GameRoleRouter);
router.use("/region", RegionRouter);
router.use("/resource", ResourceRouter);

module.exports = router;
