const { Router } = require("express");

const roundController = require("../controllers/round");
const validateRound = require("../middleware/validateRound");
const validateId = require("../middleware/validateId");
const isAuthenticated= require("../middleware/isAuthenticated")

const roundRouter = Router();

roundRouter.use(isAuthenticated)


roundRouter.get("/", roundController.getAll);
roundRouter.post("/", roundController.create);

roundRouter.get("/:id", validateId, roundController.getOne);
roundRouter.put("/:id", validateId, roundController.updateOne);
roundRouter.patch("/:id", validateId, roundController.updateOne);
roundRouter.delete("/:id", validateId, roundController.deleteOne);

module.exports = roundRouter;
