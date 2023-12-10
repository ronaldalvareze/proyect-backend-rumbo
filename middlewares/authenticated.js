const jwt = require ("jsonwebtoken")


function asureAuth (req, res, next) {
    if (!req.headers.authorization) {
      res.status(403).send({msg: "La peticion no tiene cabecera"})
    }
    
    const token = req.headers.authorization.replace("Bearer " , "").trim()

    if (!token) {
      return res.status(400).send({ msg: "Token no proporcionado" });
    }
    

    try {
      const payload = jwt.decode(token,  'your_secret_key_here')
      
      const { exp } = payload
      const currentData = new Date().getTime()


      if (exp <= currentData) {
        return res.status(400).send({msg:"El token a expirado"})
      }

      req.user = payload

      next()
      
    } catch (error) {
      return res.status(400).send({msg:"El token no es valido"})
    }


}


module.exports= {
    asureAuth,
}