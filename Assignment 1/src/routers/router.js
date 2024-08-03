const { Router } = require("express");
const golfRouter = Router();
const data = require("../models/data");
const golfController = require("../controller/controller");

// C - Create

golfRouter.post("/", golfController.create);

// R - Read all

golfRouter.get("/", golfController.getAll);

// R - Read one

golfRouter.get("/:id", golfController.getOne);

// U - Update (replace)

golfRouter.put("/:id", golfController.replace);

// U - Update (partial)

golfRouter.patch("/:id", golfController.partial);

// // D - Delete

golfRouter.delete("/:id", golfController.deleted);

module.exports = golfRouter;
