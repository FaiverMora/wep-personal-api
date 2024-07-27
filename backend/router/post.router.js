const express = require("express");
const multiparty = require("connect-multiparty");
const PostController = require("../controllers/post.controller");
const md_auth = require("../middlewares/authenticated");

const md_upload = multiparty({ uploadDir: "./uploads/blog" });
const api = express.Router();

//Rutas
api.post("/post", [md_auth.asureAuth, md_upload],PostController.createPost)
api.get("/post",PostController.getPosts)
api.patch("/post/:id", [md_auth.asureAuth, md_upload], PostController.updatePost);
api.delete("/post/:id", [md_auth.asureAuth], PostController.deletePost);

module.exports = api;