const express = require("express");
const missingPiecesController = require("./missingPieces.controller");
const missingPiecesRouter = express.Router();

const { store, index, deletePiece, update } = missingPiecesController;

missingPiecesRouter.post("/missing-pieces", store);
missingPiecesRouter.get("/missing-pieces", index);
missingPiecesRouter.get("/missing-pieces/:id", index);
missingPiecesRouter.patch("/missing-pieces/:piece_id", update);
missingPiecesRouter.delete("/missing-pieces/:piece_id", deletePiece);

module.exports = missingPiecesRouter;
