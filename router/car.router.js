const express = require ("express")
const CarController = require("../controllers/car.controller")
const md_auth = require ("../middlewares/authenticated")



const api = express.Router()

api.get("/cars",[ md_auth.asureAuth], CarController.getCars)

api.post("/car",[ md_auth.asureAuth], CarController.createCar)

api.patch("/car/:id",[ md_auth.asureAuth], CarController.updateCar)

api.delete("/car/:id",[ md_auth.asureAuth], CarController.deleteCar)

module.exports = api