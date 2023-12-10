const mongoose = require ("mongoose")


const PqrsSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true 
    },
    cedula: {
        type: String,
        required:true
    },
    correo: {
        type: String,
        required:true
    },

    numeroTelefonico: {
        type: String,
        required: true,
    },

    placaVehicular: {
        type: String,
        
        
    },
    mensaje: {
        type: String,
        required: true

    },

     // referencia al modelo de Driver
    driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car',
    }
    })



module.exports = mongoose.model("Pqrs", PqrsSchema)