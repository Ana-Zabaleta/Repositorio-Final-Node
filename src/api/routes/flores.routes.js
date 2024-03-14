const express = require("express");
const florRouter = express.Router();
const {
  createFlor,
  getAllFlor,
  getFlorById,
  updateFlor,
  addFlorCover,
  deleteFlor,
} = require("../controllers/flores.controller");
const {
  upload,
  uploadToCloudinary,
} = require("../middlewares/file.middleware");
const { isAuth } = require("../middlewares/auth.middleware");

// Ruta para crear un nuevo álbum
florRouter.post(
  "/",
  [upload.single("coverImage"), uploadToCloudinary],
  createFlor
);
florRouter.get("/", getAllFlor);
florRouter.get("/:id", getFlorById);
florRouter.put("/:id", updateFlor);
florRouter.patch("/:id", updateFlor);
florRouter.patch(
  "/cover/:id",
  [upload.single("coverImage"), uploadToCloudinary],
  addFlorCover
);
florRouter.delete("/:id", deleteFlor);

module.exports = florRouter;
