const User = require("../models/user.model")

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
    console.log ("Active =>, active")
    res.status(200).send({msg:"ok"})
}

module.exports={
  getMe,
  getUsers,
}