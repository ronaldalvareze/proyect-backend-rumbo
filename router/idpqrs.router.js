const express = require ("express")
const idPqrsController = require ("../controllers/idpqrs.controller")
const md_auth = require ("../middlewares/authenticated")


const api = express.Router()

api.get("/pqrs/:id", [md_auth.asureAuth], idPqrsController.getPqrsById)




module.exports = api

