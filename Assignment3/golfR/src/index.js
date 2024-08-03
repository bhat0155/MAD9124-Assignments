"use strict";

require("dotenv/config");

require("dotenv").config();

require("./utils/passport");

require("./utils/db");
const debug = require("debug")("app:index");
const express = require("express");
const morgan = require("morgan");
const sanitizeBody = require("./middleware/sanitizedBody");

const courseRouter = require("./routers/course");
const roundRouter = require("./routers/round");
const { errorHandler } = require("./utils/errors");
const authRouter = require("./routers/auth");

const app = express();
app.use(express.json());
app.use(morgan("tiny"));
app.use(sanitizeBody);

app.use("/api/courses", courseRouter);
app.use("/api/rounds", roundRouter);
app.use("/auth", authRouter);

app.get("/login-success", (req, res) => {
  res.send(`Your token is ${req.query.token}`);
});

app.get("/", (_req, res) => {
  res.send("Server running ⛳️⛳️⛳️");
});

app.get("*", (_req, res) => {
  res.status(404).json({
    error: {
      message: "404 | Not found",
    },
  });
});

app.use(errorHandler);

const PORT = process.env.PORT || 4000;
debug({PORT})

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
