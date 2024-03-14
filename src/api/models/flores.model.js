const mongoose = require("mongoose");

// Definición del esquema del álbum
const florSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  origen: {
    type: String,
    required: true,
  },
  cantidad: {
    type: Number,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
});

const Flor = mongoose.model("Flor", florSchema);

module.exports = Flor;
