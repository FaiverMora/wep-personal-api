const express = require("express");
const { API_VERSION } = require("./constants");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// //importar rutas
const authRoutes = require("./router/auth.router");
const userRoutes = require("./router/user.router");
const menuRoutes = require("./router/menu.router");
const courseRouter = require("./router/course.router");
const postRoutes = require("./router/post.router");

// //configurar body parse
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// //configurar carpetas static
app.use(express.static("uploads"));

// //configurar Header HTTP - CORS
app.use(cors());

// //configurar Rutas
app.use(`/api/${API_VERSION}`, authRoutes);
app.use(`/api/${API_VERSION}`, userRoutes);
app.use(`/api/${API_VERSION}`, menuRoutes);
app.use(`/api/${API_VERSION}`, courseRouter);
app.use(`/api/${API_VERSION}`, postRoutes);

module.exports = app;
