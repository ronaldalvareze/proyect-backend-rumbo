const express = require ('express')
const bodyParser = require('body-parser')
const { API_VERSION } = require ('./constants')
const cors = require ('cors')


const app = express()


// importar rutas
const authRoutes = require('./router/auth.router')

const UserRoutes = require('./router/user.router')

const driverRoutes = require("./router/driver.router")

const carRoutes = require("./router/car.router")


const pqrsRoutes = require("./router/pqrs.router")


const rutasRoutes = require("./router/rutas.router")


const idRutasRoutes = require("./router/idrutas.router")

const idPqrsRoutes = require("./router/idpqrs.router")

const newsletterRoutes = require("./router/newsletter.router")





// configurar body parce
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

//configurar carpeta estaticos
app.use(express.static("uploads"))

//configurar header - http -CORS
app.use(cors())


//configurar rutas endpoint
app.use(`/api/${API_VERSION}`, authRoutes)

app.use(`/api/${API_VERSION}`, UserRoutes)

app.use(`/api/${API_VERSION}`, driverRoutes)

app.use(`/api/${API_VERSION}`, carRoutes)

app.use(`/api/${API_VERSION}`, pqrsRoutes)

app.use(`/api/${API_VERSION}`, rutasRoutes)

app.use(`/api/${API_VERSION}`, idRutasRoutes)

app.use(`/api/${API_VERSION}`, idPqrsRoutes)

app.use(`/api/${API_VERSION}`, newsletterRoutes)


module.exports = app

