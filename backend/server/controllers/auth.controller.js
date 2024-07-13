const User  = require("../models/user.model")

function register(req,res){
  console.log(req.body);

  res.status(200).send({msg:"Funcion perfecto !"})
}




module.exports = {
  register,
}