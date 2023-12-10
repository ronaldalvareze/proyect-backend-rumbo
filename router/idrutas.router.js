const express = require ("express")
const idrutasController = require ("../controllers/idrutas.controller")
const md_auth = require ("../middlewares/authenticated")


const api = express.Router()

api.get("/ruta/:id", [md_auth.asureAuth], idrutasController.getRutaById)




module.exports = api

