const jwt = require("../utils/jwt")

function asureAuth(req, res, next){
  if(!req.headers.authorization){
    return res.status(403).send({msg:"La peticion no tiene la cabecera de autenticacion"})
    // res.status(500).send({msg:"Bloqueo por Middlewares"})
  }

  const token = req.headers.authorization.replace("Bearer", "")
    // console.log(token)

    try{
      const payload = jwt.decoded(token)
      // console.log(paylod);
      const { exp } = payload
      const currenData = new Date().getTime()

      console.log(exp)
      console.log(currenData)
      
      if(exp <= currenData ){
        return res.status(400).send({msg: "El token ha expirado"})
      }
      req.user = payload
      // next()

    }catch(error){
      return res.status(400).send({msg: "token Invalido"})
    }
  // next()
}

module.exports = {
  asureAuth
}