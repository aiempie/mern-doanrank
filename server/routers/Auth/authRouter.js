const express = require("express");
const router = express.Router();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const User = require("../../model/User");
const verifyToken = require("../../middleware/checkToken");

router.get("/", verifyToken, async (req, res) => {
  try {
    res.json({ success: true, user: req.user });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

router.post("/register", async (req, res) => {
  let { username, password, email } = req.body;
  username = username.toUpperCase();
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
    const newUser = new User({ username, password: hashPass, email });
    await newUser.save();

    //return token
    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.ACCESS_TOKEN_SECRET || "doanrank"
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
    });
  }
});

router.post("/login", async (req, res) => {
  let { username, password } = req.body;
  username = username.toUpperCase();

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
    if (!user) {
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
      process.env.ACCESS_TOKEN_SECRET || "doanrank"
    );
    res.json({
      success: true,
      message: "Login successfully",
      accessToken: accessToken,
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
