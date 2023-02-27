const express = require("express");
const router = express.Router();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const User = require("../model/User");

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  // check validate
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Missing username and/or password",
    });
  }
  try {
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "Username is available",
      });
    }
    const hashPass = await argon2.hash(password);
    const newUser = new User({ username, password: hashPass });
    await newUser.save();

    //return token
    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.ACCESS_TOKEN_SECRET
    );

    res.json({
      success: true,
      message: "Username create successfully",
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      accessToken: accessToken,
    });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Check validate
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Missing username and/or password",
    });
  }

  try {
    //check for exsting user
    const user = await User.findOne({ username });
    if (!username) {
      return res.status(400).json({
        success: false,
        message: "Incorrect username or password",
      });
    }
    //check password
    const passValidate = await argon2.verify(user.password, password);
    if (!passValidate) {
      return res.status(400).json({
        success: false,
        message: "Incorrect username or password",
      });
    }

    //return token
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET
    );

    res.json({
      success: true,
      message: "Login successfully",
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      accessToken: accessToken,
    });
  }
});

module.exports = router;
