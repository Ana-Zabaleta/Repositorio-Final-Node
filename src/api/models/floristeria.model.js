const mongoose = require("mongoose");

const floristeriaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  empleados: {
    type: Number,
    required: true,
  },
  direccion: {
    type: String,
  },
  coverImage: {
    type: String,
    required: false,
  },
});

const Floristeria = mongoose.model("Floristeria", floristeriaSchema);

module.exports = Floristeria;
