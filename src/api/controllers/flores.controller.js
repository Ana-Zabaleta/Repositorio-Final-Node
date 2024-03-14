const Flor = require("../models/flores.model");
const { HTTPSTATUSCODE } = require("../../utils/httpStatusCode");

const createFlor = async (req, res, next) => {
  try {
    const { nombre, origen, cantidad, id } = req.body;
    const coverImage = req.file ? req.file.path : "";

    const flor = await Flor.create({
      nombre,
      origen,
      cantidad,
      id,
      coverImage,
    });
    res.status(201).json({
      status: 201,
      message: HTTPSTATUSCODE[201],
      data: flor,
    });
  } catch (error) {
    next(error);
  }
};

const getAllFlor = async (req, res, next) => {
  try {
    const flor = await Flor.find();
    res.status(200).json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      data: flor,
    });
  } catch (error) {
    next(error);
  }
};

const getFlorById = async (req, res, next) => {
  try {
    const flor = await Flor.findById(req.params.id);
    if (flor) {
      res.status(200).json({
        status: 200,
        message: HTTPSTATUSCODE[200],
        data: flor,
      });
    } else {
      res.status(404).json({
        status: 404,
        message: HTTPSTATUSCODE[404],
      });
    }
  } catch (error) {
    next(error);
  }
};

const updateFlor = async (req, res, next) => {
  try {
    const flor = await Flor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (flor) {
      res.status(200).json({
        status: 200,
        message: HTTPSTATUSCODE[200],
        data: flor,
      });
    } else {
      res.status(404).json({
        status: 404,
        message: "Flor not found",
      });
    }
  } catch (error) {
    next(error);
  }
};
const addFlorCover = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: 400,
        message: "No file in the request.",
      });
    }
    const flor = await Flor.findByIdAndUpdate(
      req.params.id,
      { coverImage: req.file.path },
      { new: true }
    );

    if (flor) {
      res.status(200).json({
        status: 200,
        message: HTTPSTATUSCODE[200],
        data: flor,
      });
    } else {
      res.status(404).json({
        status: 404,
        message: HTTPSTATUSCODE[404],
      });
    }
  } catch (error) {
    next(error);
  }
};
const deleteFlor = async (req, res, next) => {
  try {
    const flor = await Flor.findByIdAndDelete(req.params.id);
    if (flor) {
      res.status(204).json({
        status: 204,
        message: HTTPSTATUSCODE[204],
      });
    } else {
      res.status(404).json({
        status: 404,
        message: HTTPSTATUSCODE[404],
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createFlor,
  getAllFlor,
  getFlorById,
  updateFlor,
  addFlorCover,
  deleteFlor,
};
