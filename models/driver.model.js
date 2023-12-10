const mongoose = require ("mongoose")

const DriverSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true 
    },
    cedula: {
        type: Number,
        unique:true,
        required:true
    },
    correo: {
        type: String,
        unique:true,
        required:true
    },

    avatar: String,

    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Car"
    }   
})


module.exports = mongoose.model("Driver",DriverSchema)