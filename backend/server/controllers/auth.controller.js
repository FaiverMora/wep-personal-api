const bcrypt = require("bcryptjs");
const User  = require("../models/user.model")
const jwt = require("../utils/jwt")

function register(req,res){
  const { firstname, lastname, email, password } = req.body;
  console.log(req.body);

if(!email) res.status(400).send({msg:"El email es obligatorio"})
if(!password)res.status(400).send({msg:"Laconraseña esobligatoria"})

const user = new User({
  firstname,
  lastname,
  password,
  email: email.toLowerCase(),
  role: "User",
  active: false,
});

  const salt = bcrypt.genSaltSync(10)
  const hasnpassword = bcrypt.hashSync(password, salt);

  console.log(password)
  console.log(hasnpassword)

  user.password = hasnpassword
  // console.log (user)
  user.save((error, userStorage) => {
    if (error) {
      res.status(400).send({msg: "Error al crear el usuario" });
    } else {
      res.status(200).send(userStorage);
    }
  })
  // res.status(200).send({msg:"Funcion perfecto !"})
}

function login(req,res){
  const{email, password} = req.body
if(!email) res.status(400).send({mgs:"El email es obligatorio"})
if(!password) res.status(400).send({mgs:"La contraseña es obligatoria"})
    
  const emailLowerCase = email.toLowerCase()
  
  User.findOne({email:emailLowerCase},(error, userStore) => {
    if(error){
      res.status(500).send({msg:" Error del servidor"})
    }else {
      bcrypt.compare(password, userStore.password, (bcryptError,check)=>{
        if(bcryptError){
          res.status(500).send({msg:"Error del servidor"})
        }else if (!check) {
          res.status(400).send({ msg: "usuario o contraseña incorrecta" });
        } else if (!userStore.active) {
          res.status(400).send({ msg: "usuario no autorizado o no activo" });
        } else {
          res.status(200).send({
            access: jwt.createAccessToken(userStore),
            refresh: jwt.createRefreshToken(userStore)
          });
        }
      })
      // console.log("password", password)
      // console.log(userStore)
    }
  })
}
function refreshAccessToken(req,res){
  const {token} = req.body

  if(!token)res.status(400).send({msg:"Error token requerido"})

  const { user_id } = jwt.decoded(token)

    
  User.findOne({_id:user_id},(error,userStorage)=> {
    if(error){
      res.status(500).send({msg:"Eror del servidor"})
    }else{
      res.status(200).send({
      accessToken:jwt.createAccessToken(userStorage)
      })
    }
  })
}
module.exports = {
  register,
  login,
  refreshAccessToken
}