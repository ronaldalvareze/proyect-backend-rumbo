const express = require ("express")
const DriverController = require("../controllers/driver.controller")
const multiparty = require ("connect-multiparty")
const md_auth = require ("../middlewares/authenticated")


const md_upload = multiparty({uploadDir: "./uploads/avatar"})

const api = express.Router()

api.get("/drivers",[ md_auth.asureAuth], DriverController.getDrivers)

api.post("/driver",[ md_auth.asureAuth, md_upload], DriverController.createDriver)


api.patch("/driver/:id",[ md_auth.asureAuth, md_upload], DriverController.updateDriver)


api.delete("/driver/:id",[ md_auth.asureAuth, md_upload], DriverController.deleteDriver)

module.exports = api