const express = require("express")
const multiparty = require("connect-multiparty")
const CourseController = require ("../controllers/course.controller")
const md_auth = require("../middlewares/authenticated")
const md_upload = multiparty({ uploadDior: "/uploads/course"})


const api = express.Router()

//APis ...
api.post("/course",[md_auth.asureAuth, md_upload], CourseController.createCouerse)
api.get("/course", CourseController.getCourse)

module.exports = api