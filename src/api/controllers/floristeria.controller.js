const Floristeria = require("../models/floristeria.model");
const { HTTPSTATUSCODE } = require("../../utils/httpStatusCode");

const createFloristeria = async (req, res, next) => {
  try {
    const floristeria = await Floristeria.create(req.body);
    console.log(floristeria);

    res.status(201).json({
      status: 201,
      // message: HTTPSTATUSCODE[201],
      data: floristeria,
    });
  } catch (error) {
    next(error);
  }
};

const getAllFloristeria = async (req, res, next) => {
  try {
    const floristeria = await Floristeria.find();
    //console.log(floristeria);
    // res.status(200).json({
    //   status: 200,
    //   message: HTTPSTATUSCODE[200],
    //   data: floristeria,
    // });
    console.log(floristeria);
    res.json({ data: floristeria });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getFloristeriaById = async (req, res, next) => {
  try {
    const floristeria = await Floristeria.findById(req.params.id);
    if (floristeria) {
      res.status(200).json({
        status: 200,
        message: HTTPSTATUSCODE[200],
        data: floristeria,
      });
    } else {
      res.status(404).json({ status: 404, message: "Floristeria not found" });
    }
  } catch (error) {
    next(error);
  }
};

const updateFloristeria = async (req, res, next) => {
  try {
    const floristeria = await Floristeria.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (floristeria) {
      console.log(floristeria);
      res.status(200).json({
        status: 200,
        // message: HTTPSTATUSCODE[200],
        data: floristeria,
      });
    } else {
      res.status(404).json({ status: 404, message: "Floristeria not found" });
    }
  } catch (error) {
    next(error);
  }
};
const addFloristeriaCover = async (req, res, next) => {
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
const deleteFloristeria = async (req, res, next) => {
  try {
    const floristeria = await Floristeria.findByIdAndDelete(req.params.id);
    if (floristeria) {
      res.status(204).json({ status: 204, message: "floristeria deleted" });
    } else {
      res.status(404).json({ status: 404, message: "floristeria not found" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createFloristeria,
  getAllFloristeria,
  getFloristeriaById,
  updateFloristeria,
  addFloristeriaCover,
  deleteFloristeria,
};
