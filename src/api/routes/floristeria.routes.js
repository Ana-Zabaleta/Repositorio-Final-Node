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
  deleteFloristeria,
} = require("../controllers/floristeria.controller");

floristeriaRouter.post("/", createFloristeria);
floristeriaRouter.get("/", getAllFloristeria);
floristeriaRouter.get("/:id", getFloristeriaById);
floristeriaRouter.put("/:id", updateFloristeria);
floristeriaRouter.delete("/:id", deleteFloristeria);
floristeriaRouter.post(
  "/",
  [isAuth, upload.single("coverImage")],
  createFloristeria
);

module.exports = floristeriaRouter;
