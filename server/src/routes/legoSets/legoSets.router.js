const express = require("express");
const legoSetsController = require("./legoSets.controller");
const legoSetsRouter = express.Router();

const { store, index, show, deleteLegoSet, update } = legoSetsController;

legoSetsRouter.post("/lego-sets", store);
legoSetsRouter.get("/lego-sets", index);
legoSetsRouter.get("/lego-sets/:id", show);
legoSetsRouter.delete("/lego-sets/:id", deleteLegoSet);
legoSetsRouter.patch("/lego-sets/:id", update);

module.exports = legoSetsRouter;
