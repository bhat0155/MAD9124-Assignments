const express = require("express");
const app = express();
const data = require("./models/data");
const golfRouter = require("./routers/router");

app.use(express.json());

const PORT = process.env.PORT || 4003;

app.get("/", (_req, res) => res.send("server running "));

app.use("/api/rounds", golfRouter);

app.listen(PORT, () => console.log("epmty server running"));
