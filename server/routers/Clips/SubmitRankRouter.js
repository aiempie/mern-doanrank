const express = require("express");
const router = express.Router();

const GameClip = require("../../model/GameClip");
const Rank = require("../../model/Rank");
const verifyToken = require("../../middleware/checkToken");
const {
  updateRankScore,
  updateTimesGuess,
} = require("../../utils/ChangeScore");

router.post("/", verifyToken, async (req, res) => {
  const { _id, chooseOrder } = req.body;
  try {
    if (req.user.timesNumber === 0) {
      return res.status(403).json({
        success: false,
        message: "Đã hết số lượt sử dụng",
      });
    }
    const Clip = await GameClip.findOne({ _id });
    if (!Clip) {
      return res.status(403).json({
        success: false,
        message: "Không tìm thấy clip",
      });
    }
    const rankClip = await Rank.findOne({
      _id: Clip.rank_id,
    });
    if (rankClip.order == chooseOrder) {
      updateRankScore(req.user._id, req.user.guessRankScore + 3);
      updateTimesGuess(req.user._id, req.user.timesNumber - 1);
      return res.json({
        success: true,
        PlusScore: 3,
        message: "Bạn đã đoán chính xác, Bạn được cộng 3 điểm",
        rankClip,
      });
    } else if (
      rankClip.order - chooseOrder == 1 ||
      rankClip.order - chooseOrder == -1
    ) {
      updateRankScore(req.user._id, req.user.guessRankScore + 1);
      updateTimesGuess(req.user._id, req.user.timesNumber - 1);
      return res.json({
        success: true,
        PlusScore: 1,
        message:
          "Bạn đã đoán đúng trong khoảng 1 rank chênh lệch, Bạn được cộng 1 điểm",
        rankClip,
      });
    } else {
      updateRankScore(req.user._id, req.user.guessRankScore - 2);
      updateTimesGuess(req.user._id, req.user.timesNumber - 1);
      return res.json({
        success: true,
        PlusScore: -2,
        message: "Bạn đã đoán sai, Bạn bị trừ 2 điểm",
        rankClip,
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

module.exports = router;
