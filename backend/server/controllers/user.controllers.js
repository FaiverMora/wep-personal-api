const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const image = require("../utils/image")

async function getMe(req,res){

  const { user_id } = req.user
  const response = await User.findById(user_id)
  
  if(!response){
    res.status(400).send({msg:"No se ha encontrado el usuario"})
  }else{
    res.status(200).send(response)
  }
}
async function getUsers(req,res){
  
  const { active } = req.query

  let response = null

  if (active === undefined){
    response = await User.find()
  }else {
    response = await User.find({ active })
  }
        res.status(200).send(response);

}

async function createUser(req, res){

  const {password} = req.body
  const user = new User({ ...req.body, active: false})

  const salt = bcrypt.genSaltSync(10)
  const hashPassword = bcrypt.hashSync(password, salt)

  user.password = hashPassword

  if(req.files.avatar){
    const imagePath = image.getFilePath(req.files.avatar)
    user.avatar = imagePath

  
  }
try {
  // Guardar el usuario en la base de datos
  const savedUser = await user.save();
  return res
    .status(201)
    .send({ msg: "Usuario creado exitosamente", data: savedUser });
} catch (error) {
  console.error(error);
  return res.status(500).send({ msg: "Error al crear el usuario" });
}
}
async function updateUser(req, res) {
    const { id } = req.params
    const userData = req.body

    if (userData.password) {
        const salt = bcrypt.genSaltSync(10)
        const hashPassword = bcrypt.hashSync(userData.password, salt)
        userData.password = hashPassword
    } else {
        delete userData.password
    }
     if(req.files.avatar){
     const imagePath = image.getFilePath(req.files.avatar)
     userData.avatar = imagePath
    }
    
    User.findByIdAndUpdate({ _id: id }, userData, (error) => {
      if (error) {
        res.status(400).send({ msg: "Error al actualizar el usuario" });
      } else {
        res.status(200).send({ msg: "Datos de usuario actualizados" });
      }
    });
  }

module.exports={
  getMe,
  getUsers,
  createUser,
  updateUser,
}