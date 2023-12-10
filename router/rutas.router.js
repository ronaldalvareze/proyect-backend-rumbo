const express = require ("express")
const RutasController = require("../controllers/rutas.controller")
const md_auth = require ("../middlewares/authenticated")




const api = express.Router()

api.get("/rutas",[ md_auth.asureAuth], RutasController.getRutas)

api.post("/ruta",[ md_auth.asureAuth], RutasController.createRutasConductor)

api.patch("/ruta/:id",[ md_auth.asureAuth], RutasController.updateRutas)

api.delete("/ruta/:id",[ md_auth.asureAuth], RutasController.deletedRutas)

module.exports = api