const express = require("express");
const florRouter = express.Router();
const {
  createFlor,
  getAllFlor,
  getFlorById,
  updateFlor,
  deleteFlor,
} = require("../controllers/flores.controller");

// Ruta para crear un nuevo álbum
florRouter.post("/", createFlor);
florRouter.get("/", getAllFlor);
florRouter.get("/:id", getFlorById);
florRouter.put("/:id", updateFlor);
florRouter.patch("/:id", updateFlor);
florRouter.delete("/:id", deleteFlor);

module.exports = florRouter;
