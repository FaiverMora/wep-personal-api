const express = require("express")
const MenuController = require("../controllers/menu.controller")
const md_auth = require("../middlewares/authenticated")
//EndPoints
const api = express.Router()

api.post("/menu", [md_auth.asureAuth], MenuController. createMenu)
api.get("/menu", MenuController.getMenus)

module.exports = api