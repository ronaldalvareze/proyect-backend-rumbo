const mongoose = require ("mongoose")

const UserSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true 
    },
    cedula: {
        type: Number,
        unique:true,
        required: true
    },
    correo: {
        type: String,
        unique:true,
        required:true
    },

    usuario: {
        type: String,
        unique:true,
        required:true
    },
    password: {
        type: String,
        required: true

    },

    role: String,
    active: Boolean,
    avatar: String
})


module.exports = mongoose.model("User",UserSchema)