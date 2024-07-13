const express = require("express")
const{API_VERSION } =require("./constants")
const cors = require("cors")
const bodyParser = require("body-parser")

const app = express()

//importar rutas
const authRoutes = require("./router/auth.router")
//configurar body parse
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

//configurar carpetas static
app.use(express.static("uploads"))

//configurar Header HTTP - CORS
app.use(cors())
//configurar Rutas
app.use(`/api/${API_VERSION}`,authRoutes)

module.exports = app