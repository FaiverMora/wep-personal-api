const express =require("express")
const multiparty = require ("connect-multiparty")
const UserController = require("../controllers/user.controllers")
const md_auth = require("../middlewares/authenticated")

const md_upload = multiparty({ uploadDir: "./uploads/avatar"})
const api = express.Router()

api.get("/user/me", [md_auth.asureAuth],UserController.getMe);
api.get("/Users", [md_auth.asureAuth], UserController.getUsers);
api.post("/create", [md_auth.asureAuth, md_upload], UserController.createUser);

module.exports = api
