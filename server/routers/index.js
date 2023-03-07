const express = require("express");
const authRouter = require("./Auth/authRouter");
const rankControlRouter = require("./Admin/rankControlRouter");
const gameControlRouter = require("./Admin/gameControlRouter");
const modControlRouter = require("./Admin/modControRouter");

const routes = (app) => {
  app.use(express.json());
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/ranks", rankControlRouter);
  app.use("/api/v1/games", gameControlRouter);
  app.use("/api/v1/mod", modControlRouter);
};

module.exports = routes;
