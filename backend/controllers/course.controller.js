const Course = require("../models/course.model");
const image = require("../utils/image")
//Funciones

async function createCouerse(req, res){
  const course = new Course(req.body)

  const imagePath = image.getFilePath(req.files.miniature)
  course.miniature = imagePath;

  course.save((error, courseStored)=>{
    if(error){
      res.status(400).send({msg: "Error al crear el courseRouter"})
    }else {
      res.status(201).send(courseStored)
    }
  })
}

async function getCourse(req, res){

  const {page = 1, limit = 10} = req.query

  const options ={
   page: parseInt(page),
   limit: parseInt(limit),
  }

  Course.paginate({}, options ,(error, course) => {
    if(error){
      res.status(400).send({msg:"Error al obtener los cursos"})
    } else {
      res.status(200).send(course)
    }
  })
}

module.exports = {
  createCouerse,
  getCourse,
};

