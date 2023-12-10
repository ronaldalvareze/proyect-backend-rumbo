const mongoose = require("mongoose");

const RutasSchema = mongoose.Schema({
  placaDespacho: {
    type: String,
    //required: true
  },

  fecha: {
    type: String,
    required: true,
  },
  hora: {
    type: String,
    required: true,
  },
  ruta: {
    type: String,
    required: true,
  },
  origen: {
    type: String,
    required: true,
  },
  destino: {
    type: String,
    required: true,
  },

  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Driver",
  },
});

module.exports = mongoose.model("Rutas", RutasSchema);
