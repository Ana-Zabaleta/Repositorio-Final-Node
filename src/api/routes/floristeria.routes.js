const express = require("express");
const floristeriaRouter = express.Router();
const {
  createFloristeria,
  getAllFloristeria,
  getFloristeriaById,
  updateFloristeria,
  deleteFloristeria,
} = require("../controllers/floristeria.controller");

floristeriaRouter.post("/", createFloristeria);
floristeriaRouter.get("/", getAllFloristeria);
floristeriaRouter.get("/:id", getFloristeriaById);
floristeriaRouter.put("/:id", updateFloristeria);
floristeriaRouter.delete("/:id", deleteFloristeria);

module.exports = floristeriaRouter;
