const mongoose = require ("mongoose")

const CarSchema = mongoose.Schema({
    placa: {
        type: String,
        required: true,
        unique:true
    },

    tipoVehiculo: {
        type: String,
        required: true
        // Puedes agregar más validaciones o enum para limitar los tipos de vehículos
    },
    empresa: {
        type: String,
        required: true
        // Puedes añadir más validaciones si es necesario
    }
})


module.exports = mongoose.model("Car",CarSchema)