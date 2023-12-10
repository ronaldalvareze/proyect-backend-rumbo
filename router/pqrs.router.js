const express = require ("express")
const PqrsController = require("../controllers/pqrs.controller")
const md_auth = require ("../middlewares/authenticated")



const api = express.Router()

api.get("/pqrs", PqrsController.getPqrs)

api.post("/pqrs", PqrsController.createPqrs)



module.exports = api