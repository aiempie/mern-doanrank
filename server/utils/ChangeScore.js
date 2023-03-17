const User = require("../model/User");

const updateRankScore = async (_id, newScore) => {
  try {
    if (newScore < 0) {
      newScore = 0;
    }
    const updatedRankScoreUser = await User.findByIdAndUpdate(
      _id,
      { guessRankScore: newScore },
      { new: true }
    );
    if (updatedRankScoreUser) {
      return updatedRankScoreUser;
    } else {
      throw new Error("Không tìm thấy user với _id " + _id);
    }
  } catch (error) {
    console.log(error);
  }
};

const updateChampScore = async (_id, newScore) => {
  try {
    if (newScore < 0) {
      newScore = 0;
    }
    const updatedChampScoreUser = await User.findByIdAndUpdate(
      _id,
      { guessChampScore: newScore },
      { new: true }
    );
    if (updatedChampScoreUser) {
      return updatedChampScoreUser;
    } else {
      throw new Error("Không tìm thấy user với _id " + _id);
    }
  } catch (error) {
    console.log(error);
  }
};

const updateTimesGuess = async (_id, newTimes) => {
  try {
    const updatedTimesUser = await User.findByIdAndUpdate(
      _id,
      { timesNumber: newTimes },
      { new: true }
    );
    if (updatedTimesUser) {
      return updatedTimesUser;
    } else {
      throw new Error("Không tìm thấy user với _id " + _id);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { updateRankScore, updateTimesGuess, updateChampScore };
