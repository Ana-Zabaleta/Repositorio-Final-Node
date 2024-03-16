const express = require("express");
const floristeriaRouter = express.Router();
const { isAuth } = require("../middlewares/auth.middleware");
const {
  upload,
  uploadToCloudinary,
} = require("../middlewares/file.middleware");
const {
  createFloristeria,
  getAllFloristeria,
  getFloristeriaById,
  updateFloristeria,
  addFloristeriaCover,
  deleteFloristeria,
} = require("../controllers/floristeria.controller");

floristeriaRouter.post(
  "/",
  [upload.single("coverImage"), uploadToCloudinary],
  createFloristeria
);
floristeriaRouter.get("/", getAllFloristeria);
floristeriaRouter.get("/:id", getFloristeriaById);
floristeriaRouter.put("/:id", updateFloristeria);
floristeriaRouter.patch("/:id", updateFloristeria);
floristeriaRouter.patch(
  "/cover/:id",
  [upload.single("coverImage"), uploadToCloudinary],
  addFloristeriaCover
);
floristeriaRouter.post(
  "/",
  [isAuth, upload.single("coverImage")],
  createFloristeria
);
floristeriaRouter.delete("/:id", deleteFloristeria);

module.exports = floristeriaRouter;
